/*
 * AHKH sovereign storage adapter.
 *
 * Single source of truth for all client-side persistence. The primary
 * backend is browser localStorage, preserving existing behavior exactly.
 * A future web file-system mirror plugs in behind this same interface,
 * so reader code never touches a backend directly.
 *
 * SSR-safe: outside the browser every operation degrades to an in-memory
 * map or a neutral default, never throwing during static builds.
 */

export interface AhkhStorageBackend {
  name: string;
  get(key: string): string | null;
  set(key: string, value: string): void;
  remove(key: string): void;
  key(index: number): string | null;
  readonly size: number;
}

class MemoryBackend implements AhkhStorageBackend {
  readonly name = 'memory';
  private store = new Map<string, string>();

  get(key: string): string | null {
    return this.store.has(key) ? (this.store.get(key) as string) : null;
  }

  set(key: string, value: string): void {
    this.store.set(key, value);
  }

  remove(key: string): void {
    this.store.delete(key);
  }

  key(index: number): string | null {
    const keys = Array.from(this.store.keys());
    return index >= 0 && index < keys.length ? keys[index] : null;
  }

  get size(): number {
    return this.store.size;
  }
}

class LocalStorageBackend implements AhkhStorageBackend {
  readonly name = 'localStorage';

  get(key: string): string | null {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  set(key: string, value: string): void {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      return;
    }
  }

  remove(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      return;
    }
  }

  key(index: number): string | null {
    try {
      return window.localStorage.key(index);
    } catch (e) {
      return null;
    }
  }

  get size(): number {
    try {
      return window.localStorage.length;
    } catch (e) {
      return 0;
    }
  }
}

const memoryFallback = new MemoryBackend();
let localBackend: LocalStorageBackend | null = null;
let overrideBackend: AhkhStorageBackend | null = null;

export type StorageWriteOp = 'set' | 'remove';
export type StorageWriteHook = (op: StorageWriteOp, key: string) => void;
const writeHooks: StorageWriteHook[] = [];

export function addStorageWriteHook(fn: StorageWriteHook): void {
  writeHooks.push(fn);
}

export function removeStorageWriteHook(fn: StorageWriteHook): void {
  const idx = writeHooks.indexOf(fn);
  if (idx !== -1) writeHooks.splice(idx, 1);
}

function notifyHooks(op: StorageWriteOp, key: string): void {
  for (const hook of writeHooks) {
    try {
      hook(op, key);
    } catch (e) {
      return;
    }
  }
}

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function activeBackend(): AhkhStorageBackend {
  if (overrideBackend) return overrideBackend;
  if (isBrowser()) {
    if (!localBackend) localBackend = new LocalStorageBackend();
    return localBackend;
  }
  return memoryFallback;
}

/*
 * Register a future backend (file-system mirror). The override
 * receives every write first; reads fall through to it exclusively once set.
 * Phase 0 ships no override: behavior stays identical to raw localStorage.
 */
export function registerStorageBackend(backend: AhkhStorageBackend | null): void {
  overrideBackend = backend;
}

export function activeBackendName(): string {
  return activeBackend().name;
}

export function storageGet(key: string): string | null {
  return activeBackend().get(key);
}

export function storageSet(key: string, value: string): void {
  activeBackend().set(key, value);
  notifyHooks('set', key);
}

export function storageRemove(key: string): void {
  activeBackend().remove(key);
  notifyHooks('remove', key);
}

export function storageHas(key: string): boolean {
  return activeBackend().get(key) !== null;
}

/* Enumerate keys starting with a prefix (replaces manual length/key loops). */
export function storageScan(prefix: string): string[] {
  const backend = activeBackend();
  const found: string[] = [];
  for (let i = 0; i < backend.size; i++) {
    const k = backend.key(i);
    if (k && k.startsWith(prefix)) found.push(k);
  }
  return found;
}

export function storageGetJson<T>(key: string, fallback: T): T {
  const raw = storageGet(key);
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch (e) {
    return fallback;
  }
}

export function storageSetJson(key: string, value: unknown): void {
  try {
    storageSet(key, JSON.stringify(value));
  } catch (e) {
    return;
  }
}

/* Canonical key builders shared by every surface (web, file). */
export function highlightKey(courseId: string, lessonId: string): string {
  return `ahkh_hl_${courseId}_${lessonId}`;
}

export const HIGHLIGHT_COLOR_KEY = 'ahkh_hl_color';
export const HIGHLIGHT_KEY_PREFIX = 'ahkh_hl_';
