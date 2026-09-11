/**
 * AHKH Study Hub - Virtual DOM & Browser Runtime Simulation
 * Provides an isolated, SSR/E2E-safe browser environment for exercising reader contracts,
 * client-side navigation lifecycles, and localStorage state transitions without headless browser bloat.
 */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

export class MockStorage {
  constructor() {
    this.store = new Map();
  }
  getItem(key) {
    return this.store.has(key) ? this.store.get(key) : null;
  }
  setItem(key, value) {
    this.store.set(String(key), String(value));
  }
  removeItem(key) {
    this.store.delete(String(key));
  }
  clear() {
    this.store.clear();
  }
  key(index) {
    const keys = Array.from(this.store.keys());
    return keys[index] || null;
  }
  get length() {
    return this.store.size;
  }
}

export class MockElement {
  constructor(tagName = 'div') {
    this.tagName = tagName.toUpperCase();
    this.children = [];
    this.parentNode = null;
    this.attributes = new Map();
    this.dataset = {};
    this.listeners = new Map();
    const styleMap = new Map();
    this.style = {
      setProperty: (prop, val) => styleMap.set(prop, String(val)),
      getPropertyValue: (prop) => styleMap.get(prop) || '',
      removeProperty: (prop) => styleMap.delete(prop),
    };
    this._textContent = '';
    this._innerHTML = '';
    this.id = '';
    this.className = '';
    this._classListSet = new Set();
    this.offsetHeight = 100;
    this.offsetWidth = 800;
    this.scrollHeight = 1000;
  }

  get classList() {
    const self = this;
    return {
      add(...classes) {
        classes.forEach((c) => {
          if (c) self._classListSet.add(c);
        });
        self.className = Array.from(self._classListSet).join(' ');
      },
      remove(...classes) {
        classes.forEach((c) => {
          if (c) self._classListSet.delete(c);
        });
        self.className = Array.from(self._classListSet).join(' ');
      },
      toggle(c, force) {
        let has = self._classListSet.has(c);
        if (force !== undefined) {
          if (force) self._classListSet.add(c);
          else self._classListSet.delete(c);
        } else {
          if (has) self._classListSet.delete(c);
          else self._classListSet.add(c);
        }
        self.className = Array.from(self._classListSet).join(' ');
        return self._classListSet.has(c);
      },
      contains(c) {
        return self._classListSet.has(c);
      },
    };
  }

  getAttribute(name) {
    return this.attributes.has(name) ? this.attributes.get(name) : null;
  }

  setAttribute(name, value) {
    const val = String(value);
    this.attributes.set(name, val);
    if (name === 'id') this.id = val;
    if (name === 'class') {
      this.className = val;
      this._classListSet = new Set(val.split(/\s+/).filter(Boolean));
    }
    if (name.startsWith('data-')) {
      const prop = name.slice(5).replace(/-([a-z])/g, (_, g) => g.toUpperCase());
      this.dataset[prop] = val;
    }
  }

  removeAttribute(name) {
    this.attributes.delete(name);
    if (name === 'id') this.id = '';
    if (name === 'class') {
      this.className = '';
      this._classListSet.clear();
    }
    if (name.startsWith('data-')) {
      const prop = name.slice(5).replace(/-([a-z])/g, (_, g) => g.toUpperCase());
      delete this.dataset[prop];
    }
  }

  hasAttribute(name) {
    return this.attributes.has(name);
  }

  appendChild(child) {
    child.parentNode = this;
    this.children.push(child);
    return child;
  }

  removeChild(child) {
    const idx = this.children.indexOf(child);
    if (idx !== -1) {
      child.parentNode = null;
      this.children.splice(idx, 1);
    }
    return child;
  }

  insertBefore(newNode, refNode) {
    newNode.parentNode = this;
    const idx = this.children.indexOf(refNode);
    if (idx === -1) {
      this.children.push(newNode);
    } else {
      this.children.splice(idx, 0, newNode);
    }
    return newNode;
  }

  get textContent() {
    if (this.children.length === 0) return this._textContent;
    return this.children.map((c) => c.textContent).join('');
  }

  set textContent(val) {
    this.children = [];
    this._textContent = String(val);
  }

  get innerHTML() {
    return this._innerHTML;
  }

  set innerHTML(html) {
    this._innerHTML = html;
    // Simple child text population for testing
    this.children = [];
    this._textContent = html.replace(/<[^>]*>/g, '');
  }

  getBoundingClientRect() {
    return {
      top: 100,
      bottom: 200,
      left: 50,
      right: 850,
      width: this.offsetWidth,
      height: this.offsetHeight,
      x: 50,
      y: 100,
    };
  }

  addEventListener(type, listener, options) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    const signal = options && options.signal;
    const record = { listener, options };
    this.listeners.get(type).push(record);

    if (signal) {
      signal.addEventListener('abort', () => {
        this.removeEventListener(type, listener);
      });
    }
  }

  removeEventListener(type, listener) {
    if (!this.listeners.has(type)) return;
    const arr = this.listeners.get(type);
    const filtered = arr.filter((r) => r.listener !== listener);
    this.listeners.set(type, filtered);
  }

  dispatchEvent(event) {
    event.target = this;
    event.currentTarget = this;
    const arr = this.listeners.get(event.type) || [];
    for (const r of [...arr]) {
      try {
        r.listener.call(this, event);
      } catch (err) {
        console.error('Listener error:', err);
      }
    }
    return !event.defaultPrevented;
  }

  querySelector(selector) {
    return this.querySelectorAll(selector)[0] || null;
  }

  querySelectorAll(selector) {
    const results = [];
    const check = (node) => {
      if (node.matches && node.matches(selector)) {
        results.push(node);
      }
      for (const c of node.children) {
        check(c);
      }
    };
    check(this);
    return results;
  }

  matches(selector) {
    if (selector.startsWith('#')) {
      return this.id === selector.slice(1);
    }
    if (selector.startsWith('.')) {
      return this.classList.contains(selector.slice(1));
    }
    if (selector.startsWith('[') && selector.endsWith(']')) {
      const inner = selector.slice(1, -1);
      const [attr, val] = inner.split('=');
      if (!val) return this.hasAttribute(attr);
      const cleanVal = val.replace(/["']/g, '');
      return this.getAttribute(attr) === cleanVal;
    }
    return this.tagName.toLowerCase() === selector.toLowerCase();
  }
}

export class MockDocument {
  constructor() {
    this.documentElement = new MockElement('html');
    this.body = new MockElement('body');
    this.documentElement.appendChild(this.body);
    this.listeners = new Map();
    this.elementMap = new Map();
  }

  createElement(tagName) {
    return new MockElement(tagName);
  }

  createTextNode(text) {
    const el = new MockElement('#text');
    el.textContent = text;
    return el;
  }

  getElementById(id) {
    return this.querySelector(`#${id}`);
  }

  querySelector(selector) {
    return this.documentElement.querySelector(selector);
  }

  querySelectorAll(selector) {
    return this.documentElement.querySelectorAll(selector);
  }

  addEventListener(type, listener, options) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    const signal = options && options.signal;
    this.listeners.get(type).push({ listener, options });
    if (signal) {
      signal.addEventListener('abort', () => {
        this.removeEventListener(type, listener);
      });
    }
  }

  removeEventListener(type, listener) {
    if (!this.listeners.has(type)) return;
    const arr = this.listeners.get(type);
    this.listeners.set(type, arr.filter((r) => r.listener !== listener));
  }

  dispatchEvent(event) {
    event.target = this;
    const arr = this.listeners.get(event.type) || [];
    for (const r of [...arr]) {
      r.listener.call(this, event);
    }
    return !event.defaultPrevented;
  }
}

export function createVirtualBrowser(initialUrl = 'https://ahkh3.github.io/ahkh-study-hub/') {
  const localStorage = new MockStorage();
  const document = new MockDocument();

  const windowListeners = new Map();

  const windowObj = {
    localStorage,
    document,
    scrollY: 0,
    scrollX: 0,
    innerHeight: 800,
    innerWidth: 1200,
    location: new URL(initialUrl),
    history: {
      state: null,
      pushState(state, title, url) {
        this.state = state;
        if (url) windowObj.location = new URL(url, windowObj.location.href);
      },
      replaceState(state, title, url) {
        this.state = state;
        if (url) windowObj.location = new URL(url, windowObj.location.href);
      },
    },
    scrollTo(x, y) {
      if (typeof x === 'object') {
        windowObj.scrollX = x.left !== undefined ? x.left : windowObj.scrollX;
        windowObj.scrollY = x.top !== undefined ? x.top : windowObj.scrollY;
      } else {
        windowObj.scrollX = x;
        windowObj.scrollY = y;
      }
      windowObj.dispatchEvent({ type: 'scroll' });
    },
    addEventListener(type, listener, options) {
      if (!windowListeners.has(type)) windowListeners.set(type, []);
      const signal = options && options.signal;
      windowListeners.get(type).push({ listener, options });
      if (signal) {
        signal.addEventListener('abort', () => {
          this.removeEventListener(type, listener);
        });
      }
    },
    removeEventListener(type, listener) {
      if (!windowListeners.has(type)) return;
      const arr = windowListeners.get(type);
      windowListeners.set(type, arr.filter((r) => r.listener !== listener));
    },
    dispatchEvent(event) {
      event.target = windowObj;
      const arr = windowListeners.get(event.type) || [];
      for (const r of [...arr]) {
        r.listener.call(windowObj, event);
      }
      return !event.defaultPrevented;
    },
    requestAnimationFrame(cb) {
      return setTimeout(() => cb(performance.now()), 16);
    },
    cancelAnimationFrame(id) {
      clearTimeout(id);
    },
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    AbortController,
    CustomEvent: class CustomEvent {
      constructor(type, init = {}) {
        this.type = type;
        this.detail = init.detail || null;
        this.bubbles = !!init.bubbles;
        this.cancelable = !!init.cancelable;
        this.defaultPrevented = false;
      }
      preventDefault() {
        this.defaultPrevented = true;
      }
    },
    Event: class Event {
      constructor(type, init = {}) {
        this.type = type;
        this.bubbles = !!init.bubbles;
        this.cancelable = !!init.cancelable;
        this.defaultPrevented = false;
      }
      preventDefault() {
        this.defaultPrevented = true;
      }
    },
    getSelection() {
      return windowObj.__mockSelection || {
        toString: () => '',
        rangeCount: 0,
        getRangeAt: () => null,
        removeAllRanges: () => {},
      };
    },
  };

  // Provide AhkhStorage global adapter
  const AhkhStorage = {
    get(key) {
      return localStorage.getItem(key);
    },
    set(key, value) {
      localStorage.setItem(key, value);
    },
    remove(key) {
      localStorage.removeItem(key);
    },
    key(index) {
      return localStorage.key(index);
    },
    get size() {
      return localStorage.length;
    },
  };
  windowObj.AhkhStorage = AhkhStorage;

  return { window: windowObj, document, localStorage, AhkhStorage };
}

export function loadReaderScript(windowContext) {
  const readerPath = path.join(process.cwd(), 'public', 'scripts', 'reader.js');
  const code = fs.readFileSync(readerPath, 'utf8');
  const sandbox = {
    window: windowContext,
    document: windowContext.document,
    AhkhStorage: windowContext.AhkhStorage,
    localStorage: windowContext.localStorage,
    AbortController,
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    requestAnimationFrame: (cb) => windowContext.requestAnimationFrame(cb),
    cancelAnimationFrame: (id) => windowContext.cancelAnimationFrame(id),
    console,
    Math,
    Date,
    JSON,
    Array,
    Object,
    String,
    Number,
    Boolean,
    RegExp,
    parseFloat,
    parseInt,
  };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox.window.__ahkhBootReader;
}
