/* AHKH Study Hub - shared reader library (ADR-027).
   Loaded once per session; booted per lesson page with per-page vars via #study-desk data-* attributes. */
window.__ahkhBootReader = function (vars) {
  const { courseId, courseTitle, lessonId, lessonSlug, lessonTitle, courseAccent, courseHighlight } = vars;
  // ClientRouter-safe boot: the per-page inline snippet calls this at parse time,
  // and a session-persistent astro:page-load listener below re-calls it after
  // every ClientRouter navigation (Astro does not re-execute identical inline
  // scripts, so navigation boot cannot rely on the snippet). Each call fully
  // re-initializes: the previous run's controller is aborted first, and every
  // document/window binding below carries the run signal so stale runs can
  // never touch the new document. A same-document re-fire (inline snippet
  // followed by the page-load event on cold load) is a harmless no-op via the
  // desk boot stamp.
  var bootDeskEl = document.getElementById('study-desk');
  if (bootDeskEl && bootDeskEl.dataset.ahkhBooted) return;
  if (bootDeskEl) bootDeskEl.dataset.ahkhBooted = 'true';
  try { window.__ahkhYtPlayer?.destroy?.(); } catch (e) {}
  window.__ahkhYtPlayer = null;
  if (window.__ahkhYtTimer) { clearInterval(window.__ahkhYtTimer); }
  window.__ahkhYtTimer = null;
  if (window.__ahkhVideoObserver) {
    try { window.__ahkhVideoObserver.disconnect(); } catch (e) {}
  }
  window.__ahkhVideoObserver = null;
  if (window.__ahkhReaderAbort) { try { window.__ahkhReaderAbort.abort(); } catch (e) {} }
  window.__ahkhOutlineSpyBound = false;
  window.__ahkhHashChangeBound = false;
  const __ahkhSignal = (window.__ahkhReaderAbort = new AbortController()).signal;

  /* Teardown cleanup hook for active reader run */
  __ahkhSignal.addEventListener('abort', () => {
    if (scrollSaveTimer) {
      clearTimeout(scrollSaveTimer);
      scrollSaveTimer = null;
    }
    if (reminderToastTimeout) {
      clearTimeout(reminderToastTimeout);
      reminderToastTimeout = null;
    }
    if (gutterLayoutRaf !== null) {
      cancelAnimationFrame(gutterLayoutRaf);
      gutterLayoutRaf = null;
    }
    if (selectionDebounceTimer !== null) {
      clearTimeout(selectionDebounceTimer);
      selectionDebounceTimer = null;
    }
    isRestoringScroll = false;
  }, { once: true });

  /* A. SMART AUTO-HIDING HEADER & TOP PROGRESS BAR */
  let lastScrollY = window.scrollY;
  let isRestoringScroll = false;
  const smartHeader = document.getElementById('smart-header');
  const progressFill = document.getElementById('top-progress-fill');
  const displayMenu = document.getElementById('display-settings-menu');
  const displayBtn = document.getElementById('toggle-display-settings');
  /* Helper for scroll depth tracking & persistence */
  let scrollSaveTimer = null;
  function saveScrollDepth(currentY, maxScroll) {
    if (isRestoringScroll || maxScroll <= 0) return;
    clearTimeout(scrollSaveTimer);
    scrollSaveTimer = setTimeout(() => {
      try {
        const pct = Math.min(100, Math.max(0, Math.round((currentY / maxScroll) * 100)));
        const data = {
          percent: pct,
          scrollY: Math.round(currentY),
          updatedAt: new Date().toISOString()
        };
        AhkhStorage.set(`ahkh_scroll_${courseId}_${lessonSlug}`, JSON.stringify(data));
      } catch (e) {}
    }, 150);
  }

  function updateScrollDepthLabel(pct) {
    const label = document.getElementById('lesson-scroll-depth-label');
    if (label) label.textContent = `${Math.round(pct)}% depth`;
  }

  window.addEventListener('scroll', () => {
    if (isRestoringScroll) return;

    const currentScrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    
    /* Update progress percentage */
    if (maxScroll > 0 && progressFill) {
      const pct = Math.min(100, Math.max(0, (currentScrollY / maxScroll) * 100));
      progressFill.style.width = pct + '%';
      updateScrollDepthLabel(pct);
      saveScrollDepth(currentScrollY, maxScroll);
    }

    /* Auto-hide header on scroll down, reveal on scroll up */
    if (smartHeader) {
      const delta = currentScrollY - lastScrollY;
      if (currentScrollY <= 60) {
        smartHeader.style.transform = 'translateY(0)';
        document.body.removeAttribute('data-header-hidden');
      } else if (delta > 4) {
        /* Scrolling DOWN -> hide header & close popovers */
        smartHeader.style.transform = 'translateY(-100%)';
        document.body.setAttribute('data-header-hidden', 'true');
        closeDisplayMenu();
        hidePopover();
      } else if (delta < -2) {
        /* Scrolling UP -> reveal header immediately */
        smartHeader.style.transform = 'translateY(0)';
        document.body.removeAttribute('data-header-hidden');
      }
    }

    lastScrollY = currentScrollY;
  }, { passive: true, signal: __ahkhSignal });

  // A2. LESSON LIFECYCLE, READING START, SCROLL TRACKING & RESTORATION
  function getStoredLessonState() {
    try {
      if (AhkhStorage.get(`ahkh_read_${courseId}_${lessonSlug}`) !== null) return 'completed';
      if (AhkhStorage.get(`ahkh_reading_${courseId}_${lessonSlug}`) !== null) return 'reading';
      if (AhkhStorage.get(`ahkh_opened_${courseId}_${lessonSlug}`) !== null) return 'explored';
    } catch (e) {}
    return 'explored';
  }

  function formatReadingTimestamp(isoStr) {
    try {
      const d = new Date(isoStr);
      if (isNaN(d.getTime())) return '';
      return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return '';
    }
  }

  function updateLessonStatusUI() {
    const state = getStoredLessonState();
    const badge = document.getElementById('lesson-status-badge');
    const dot = document.getElementById('lesson-status-dot');
    const text = document.getElementById('lesson-status-text');
    const startBtn = document.getElementById('start-reading-btn');
    const timeDisplay = document.getElementById('reading-timestamp-display');
    const timeText = document.getElementById('reading-timestamp-text');

    if (!badge || !dot || !text) return;

    const ALL_TEXT_COLORS = ['text-blue-700', 'dark:text-blue-400', 'text-purple-700', 'dark:text-purple-400', 'text-amber-700', 'dark:text-amber-400', 'text-emerald-700', 'dark:text-emerald-400'];
    const ALL_DOT_COLORS = ['bg-blue-600', 'dark:bg-blue-400', 'bg-purple-600', 'dark:bg-purple-400', 'bg-amber-600', 'dark:bg-amber-400', 'bg-emerald-600', 'dark:bg-emerald-400'];
    ALL_TEXT_COLORS.forEach(c => badge.classList.remove(c));
    ALL_DOT_COLORS.forEach(c => dot.classList.remove(c));

    if (state === 'completed') {
      badge.classList.add('text-emerald-700', 'dark:text-emerald-400');
      dot.classList.add('bg-emerald-600', 'dark:bg-emerald-400');
      text.textContent = 'Completed';
      startBtn?.classList.add('hidden');
      timeDisplay?.classList.remove('hidden');
      const startIso = AhkhStorage.get(`ahkh_reading_${courseId}_${lessonSlug}`);
      if (startIso && timeText) {
        timeText.textContent = `Started ${formatReadingTimestamp(startIso)}`;
      } else if (timeText) {
        const readIso = AhkhStorage.get(`ahkh_read_${courseId}_${lessonSlug}`);
        timeText.textContent = readIso ? `Completed ${formatReadingTimestamp(readIso)}` : 'Completed';
      }
    } else if (state === 'reading') {
      badge.classList.add('text-amber-700', 'dark:text-amber-400');
      dot.classList.add('bg-amber-600', 'dark:bg-amber-400');
      text.textContent = 'Reading';
      startBtn?.classList.add('hidden');
      timeDisplay?.classList.remove('hidden');
      const startIso = AhkhStorage.get(`ahkh_reading_${courseId}_${lessonSlug}`);
      if (timeText) {
        timeText.textContent = startIso ? `Started ${formatReadingTimestamp(startIso)}` : 'Reading';
      }
    } else { // explored
      badge.classList.add('text-purple-700', 'dark:text-purple-400');
      dot.classList.add('bg-purple-600', 'dark:bg-purple-400');
      text.textContent = 'Exploring';
      startBtn?.classList.remove('hidden');
      timeDisplay?.classList.add('hidden');
    }
  }

  function startReading() {
    try {
      AhkhStorage.set(`ahkh_reading_${courseId}_${lessonSlug}`, new Date().toISOString());
    } catch (e) {}
    updateLessonStatusUI();
    hideExploredReminderToast();
  }

  let reminderToastTimeout = null;
  function showExploredReminderToast() {
    const toast = document.getElementById('explored-reminder-toast');
    if (!toast) return;
    toast.classList.remove('hidden');
    clearTimeout(reminderToastTimeout);
    reminderToastTimeout = setTimeout(() => {
      toast.classList.add('hidden');
    }, 6000);
  }

  function hideExploredReminderToast() {
    clearTimeout(reminderToastTimeout);
    const toast = document.getElementById('explored-reminder-toast');
    toast?.classList.add('hidden');
  }

  function restoreSavedScrollPosition() {
    try {
      const savedStr = AhkhStorage.get(`ahkh_scroll_${courseId}_${lessonSlug}`);
      if (!savedStr) return;
      const saved = JSON.parse(savedStr);
      if (!saved || typeof saved.scrollY !== 'number' || saved.scrollY <= 40) return;
      if (window.location.hash && window.location.hash.startsWith('#')) return;

      const targetY = saved.scrollY;
      const rootEl = document.documentElement;
      const hadSmoothClass = rootEl.classList.contains('scroll-smooth');
      const originalScrollBehavior = rootEl.style.scrollBehavior;

      /* Phase 0: Acquire lock & suppress smooth-scroll globally on root */
      isRestoringScroll = true;
      rootEl.classList.remove('scroll-smooth');
      rootEl.style.scrollBehavior = 'auto';

      function applyScrollCoordinate(y) {
        window.scrollTo({ top: y, behavior: 'instant' });
        lastScrollY = y;
        const maxScroll = rootEl.scrollHeight - window.innerHeight;
        if (progressFill) {
          const pct = (maxScroll >= y && maxScroll > 0)
            ? Math.min(100, Math.max(0, (y / maxScroll) * 100))
            : (typeof saved.percent === 'number' ? saved.percent : 0);
          progressFill.style.width = pct + '%';
          updateScrollDepthLabel(pct);
        }
      }

      function releaseRestorationLock() {
        if (!isRestoringScroll) return;
        const finalMax = rootEl.scrollHeight - window.innerHeight;
        const finalY = window.scrollY;
        if (progressFill) {
          const pct = (finalMax >= finalY && finalMax > 0)
            ? Math.min(100, Math.max(0, (finalY / finalMax) * 100))
            : (typeof saved.percent === 'number' ? saved.percent : 0);
          progressFill.style.width = pct + '%';
          updateScrollDepthLabel(pct);
        }
        rootEl.style.scrollBehavior = originalScrollBehavior || '';
        if (hadSmoothClass) {
          rootEl.classList.add('scroll-smooth');
        }
        isRestoringScroll = false;
        lastScrollY = window.scrollY;
      }

      /* User Preemption: If user explicitly interacts, respect user agency immediately */
      let preemptionAborted = false;
      const onUserInteraction = () => {
        preemptionAborted = true;
        releaseRestorationLock();
      };

      window.addEventListener('wheel', onUserInteraction, { once: true, passive: true, signal: __ahkhSignal });
      window.addEventListener('touchstart', onUserInteraction, { once: true, passive: true, signal: __ahkhSignal });
      window.addEventListener('keydown', onUserInteraction, { once: true, passive: true, signal: __ahkhSignal });

      /* Phase 1: Immediate provisional jump */
      requestAnimationFrame(() => {
        if (__ahkhSignal.aborted || preemptionAborted) return;
        applyScrollCoordinate(targetY);

        /* Phase 2: Asynchronous Asset Stabilization */
        function waitForGeometryStabilization() {
          const promises = [];
          if (document.fonts && document.fonts.ready) {
            promises.push(
              Promise.race([
                document.fonts.ready,
                new Promise((res) => setTimeout(res, 250))
              ])
            );
          }
          const readingCol = document.getElementById('center-reading-column');
          if (readingCol) {
            const pendingImgs = Array.from(readingCol.querySelectorAll('img')).filter((img) => !img.complete);
            if (pendingImgs.length > 0) {
              const imgPromises = pendingImgs.map((img) => {
                if (typeof img.decode === 'function') return img.decode().catch(() => {});
                return new Promise((res) => {
                  img.addEventListener('load', res, { once: true });
                  img.addEventListener('error', res, { once: true });
                });
              });
              promises.push(
                Promise.race([
                  Promise.allSettled(imgPromises),
                  new Promise((res) => setTimeout(res, 300))
                ])
              );
            }
          }
          if (promises.length === 0) {
            return Promise.resolve();
          }
          return Promise.allSettled(promises);
        }

        waitForGeometryStabilization().then(() => {
          if (__ahkhSignal.aborted || preemptionAborted) return;

          /* Phase 3: Secondary Adjustment Pass */
          applyScrollCoordinate(targetY);

          /* Phase 4: Multi-frame layout settlement verification loop */
          let stableFrames = 0;
          const startTime = Date.now();

          function verifyLayoutSettled() {
            if (__ahkhSignal.aborted || preemptionAborted) return;
            const currentMax = rootEl.scrollHeight - window.innerHeight;
            const effectiveTarget = Math.min(targetY, Math.max(0, currentMax));

            if (Math.abs(window.scrollY - effectiveTarget) > 4 && currentMax >= targetY) {
              applyScrollCoordinate(targetY);
              stableFrames = 0;
            } else {
              stableFrames++;
            }

            if (stableFrames >= 2 || Date.now() - startTime > 400) {
              releaseRestorationLock();
            } else {
              requestAnimationFrame(verifyLayoutSettled);
            }
          }

          requestAnimationFrame(verifyLayoutSettled);
        });
      });
    } catch (e) {
      isRestoringScroll = false;
    }
  }

  // B. SIDEBAR TOGGLES & ANIMATED DRAWERS
  const leftSidebar = document.getElementById('left-sidebar');
  const rightSidebar = document.getElementById('right-sidebar');
  const toggleLeftBtn = document.getElementById('toggle-left-sidebar');
  const toggleRightBtn = document.getElementById('toggle-right-sidebar');
  const toggleZenBtn = document.getElementById('toggle-zen-mode');
  const sidebarBackdrop = document.getElementById('sidebar-backdrop');

  function showBackdrop() {
    if (!sidebarBackdrop) return;
    sidebarBackdrop.classList.remove('opacity-0', 'pointer-events-none');
    sidebarBackdrop.classList.add('opacity-100', 'pointer-events-auto');
  }

  function hideBackdrop() {
    if (!sidebarBackdrop) return;
    sidebarBackdrop.classList.remove('opacity-100', 'pointer-events-auto');
    sidebarBackdrop.classList.add('opacity-0', 'pointer-events-none');
  }

  function closeMobileDrawers() {
    leftSidebar?.removeAttribute('data-mobile-open');
    rightSidebar?.removeAttribute('data-mobile-open');
    hideBackdrop();
    updateSidebarButtons();
  }

  function updateSidebarButtons() {
    const isLeftMobile = window.innerWidth < 768;
    const isRightMobile = window.innerWidth < 1024;
    
    const leftOpen = isLeftMobile 
      ? leftSidebar?.getAttribute('data-mobile-open') === 'true'
      : leftSidebar && leftSidebar.getAttribute('data-collapsed') !== 'true';
      
    const rightOpen = isRightMobile
      ? rightSidebar?.getAttribute('data-mobile-open') === 'true'
      : rightSidebar && rightSidebar.getAttribute('data-collapsed') !== 'true';

    if (toggleLeftBtn) {
      if (leftOpen) {
        toggleLeftBtn.classList.add('bg-paper-200/90', 'dark:bg-dark-border/80', 'text-ink', 'dark:text-dark-ink');
        toggleLeftBtn.classList.remove('text-ink-muted', 'dark:text-dark-muted');
      } else {
        toggleLeftBtn.classList.remove('bg-paper-200/90', 'dark:bg-dark-border/80', 'text-ink', 'dark:text-dark-ink');
        toggleLeftBtn.classList.add('text-ink-muted', 'dark:text-dark-muted');
      }
    }

    if (toggleRightBtn) {
      if (rightOpen) {
        toggleRightBtn.classList.add('bg-paper-200/90', 'dark:bg-dark-border/80', 'text-ink', 'dark:text-dark-ink');
        toggleRightBtn.classList.remove('text-ink-muted', 'dark:text-dark-muted');
      } else {
        toggleRightBtn.classList.remove('bg-paper-200/90', 'dark:bg-dark-border/80', 'text-ink', 'dark:text-dark-ink');
        toggleRightBtn.classList.add('text-ink-muted', 'dark:text-dark-muted');
      }
    }

    if (toggleZenBtn) {
      const isZen = leftSidebar?.getAttribute('data-collapsed') === 'true' && rightSidebar?.getAttribute('data-collapsed') === 'true';
      if (isZen) {
        toggleZenBtn.classList.add('bg-paper-200/90', 'dark:bg-dark-border/80', 'text-ink', 'dark:text-dark-ink');
        toggleZenBtn.classList.remove('text-ink-muted', 'dark:text-dark-muted');
      } else {
        toggleZenBtn.classList.remove('bg-paper-200/90', 'dark:bg-dark-border/80', 'text-ink', 'dark:text-dark-ink');
        toggleZenBtn.classList.add('text-ink-muted', 'dark:text-dark-muted');
      }
    }
  }

  function toggleLeftSidebar() {
    if (!leftSidebar) return;
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      const isOpen = leftSidebar.getAttribute('data-mobile-open') === 'true';
      if (isOpen) {
        closeMobileDrawers();
      } else {
        closeMobileDrawers();
        leftSidebar.setAttribute('data-mobile-open', 'true');
        showBackdrop();
        updateSidebarButtons();
      }
    } else {
      const isCollapsed = leftSidebar.getAttribute('data-collapsed') === 'true';
      if (isCollapsed) {
        leftSidebar.removeAttribute('data-collapsed');
        AhkhStorage.set('ahkh_left_sidebar_collapsed', 'false');
      } else {
        leftSidebar.setAttribute('data-collapsed', 'true');
        AhkhStorage.set('ahkh_left_sidebar_collapsed', 'true');
      }
      updateSidebarButtons();
    }
  }

  function toggleRightSidebar() {
    if (!rightSidebar) return;
    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      const isOpen = rightSidebar.getAttribute('data-mobile-open') === 'true';
      if (isOpen) {
        closeMobileDrawers();
      } else {
        closeMobileDrawers();
        rightSidebar.setAttribute('data-mobile-open', 'true');
        showBackdrop();
        updateSidebarButtons();
      }
    } else {
      const isCollapsed = rightSidebar.getAttribute('data-collapsed') === 'true';
      if (isCollapsed) {
        rightSidebar.removeAttribute('data-collapsed');
        document.body.removeAttribute('data-right-collapsed');
        AhkhStorage.set('ahkh_right_sidebar_collapsed', 'false');
      } else {
        rightSidebar.setAttribute('data-collapsed', 'true');
        document.body.setAttribute('data-right-collapsed', 'true');
        AhkhStorage.set('ahkh_right_sidebar_collapsed', 'true');
      }
      updateSidebarButtons();
    }
  }

  function toggleZenMode() {
    if (window.innerWidth < 768) {
      closeMobileDrawers();
      return;
    }
    const leftCollapsed = leftSidebar?.getAttribute('data-collapsed') === 'true';
    const rightCollapsed = rightSidebar?.getAttribute('data-collapsed') === 'true';
    const isZen = leftCollapsed && rightCollapsed;

    if (isZen) {
      leftSidebar?.removeAttribute('data-collapsed');
      AhkhStorage.set('ahkh_left_sidebar_collapsed', 'false');
      rightSidebar?.removeAttribute('data-collapsed');
      document.body.removeAttribute('data-right-collapsed');
      AhkhStorage.set('ahkh_right_sidebar_collapsed', 'false');
    } else {
      leftSidebar?.setAttribute('data-collapsed', 'true');
      AhkhStorage.set('ahkh_left_sidebar_collapsed', 'true');
      rightSidebar?.setAttribute('data-collapsed', 'true');
      document.body.setAttribute('data-right-collapsed', 'true');
      AhkhStorage.set('ahkh_right_sidebar_collapsed', 'true');
    }
    updateSidebarButtons();
  }

  toggleLeftBtn?.addEventListener('click', toggleLeftSidebar, { signal: __ahkhSignal });
  toggleRightBtn?.addEventListener('click', toggleRightSidebar, { signal: __ahkhSignal });
  toggleZenBtn?.addEventListener('click', toggleZenMode, { signal: __ahkhSignal });
  sidebarBackdrop?.addEventListener('click', closeMobileDrawers, { signal: __ahkhSignal });

  // C. DISPLAY SETTINGS CONTROLLER (Swiss Editorial Polish)
  // Active reading surface: formatted study view by default, verbatim transcript view when selected on video lessons
  function getReadingContent() {
    const transcriptView = document.getElementById('transcript-view');
    if (transcriptView && !transcriptView.classList.contains('hidden')) return transcriptView;
    return document.getElementById('formatted-view');
  }

  const fontSizes = {
    sm: { size: '1rem', lh: '1.75', label: 'Small (16px)' },
    base: { size: '1.125rem', lh: '1.8', label: 'Standard (18px)' },
    lg: { size: '1.3rem', lh: '1.85', label: 'Large (21px)' },
    xl: { size: '1.5rem', lh: '1.9', label: 'Expanded (24px)' }
  };

  function applyFontSize(sz, persist = true) {
    if (!fontSizes[sz]) sz = 'base';
    const conf = fontSizes[sz];
    document.documentElement.style.setProperty('--reader-font-size', conf.size);
    document.documentElement.style.setProperty('--reader-line-height', conf.lh);
    
    const label = document.getElementById('font-size-label');
    if (label) label.textContent = conf.label;

    document.querySelectorAll('.size-btn').forEach(btn => {
      const isCur = btn.getAttribute('data-size') === sz;
      if (isCur) {
        btn.className = 'size-btn py-1.5 px-2 rounded-xs text-center font-serif transition-colors duration-150 cursor-pointer bg-white dark:bg-dark-card text-ink dark:text-dark-ink font-medium border border-ink-border dark:border-dark-border shadow-2xs';
      } else {
        btn.className = 'size-btn py-1.5 px-2 rounded-xs text-center font-serif transition-colors duration-150 cursor-pointer text-ink-muted dark:text-dark-muted hover:text-ink dark:hover:text-dark-ink border border-transparent';
      }
    });

    if (persist) AhkhStorage.set('ahkh_reader_font_size', sz);
    requestAnimationFrame(() => repositionAllGutterNotes());
  }

  const FONT_MAP = {
    'merriweather': { val: "'Merriweather', Georgia, serif", name: 'Merriweather' },
    'source-serif': { val: "'Source Serif 4', Georgia, serif", name: 'Source Serif 4' },
    'literata': { val: "'Literata', Georgia, serif", name: 'Literata' },
    'lora': { val: "'Lora', Georgia, serif", name: 'Lora' },
    'newsreader': { val: "'Newsreader', Georgia, serif", name: 'Newsreader' },
    'geist': { val: "'Geist', -apple-system, BlinkMacSystemFont, sans-serif", name: 'Geist Sans' },
    'inter': { val: "'Geist', -apple-system, BlinkMacSystemFont, sans-serif", name: 'Geist Sans' },
    // Backwards compatibility
    'serif': { val: "'Merriweather', Georgia, serif", name: 'Merriweather' },
    'sans': { val: "'Geist', -apple-system, BlinkMacSystemFont, sans-serif", name: 'Geist Sans' },
  };

  function applyFontFamily(fam, persist = true) {
    let resolvedFam = fam;
    if (fam === 'serif') resolvedFam = 'merriweather';
    if (fam === 'sans') resolvedFam = 'geist';
    if (!FONT_MAP[resolvedFam]) resolvedFam = 'merriweather';

    const fontInfo = FONT_MAP[resolvedFam];
    document.documentElement.style.setProperty('--reader-font-family', fontInfo.val);

    const label = document.getElementById('font-family-label');
    if (label) label.textContent = fontInfo.name;

    document.querySelectorAll('.font-family-btn').forEach(btn => {
      const btnFontId = btn.getAttribute('data-font-id');
      const isActive = btnFontId === resolvedFam;
      
      if (isActive) {
        btn.className = 'font-family-btn w-full py-2 px-3 rounded-xs text-left transition-colors duration-150 cursor-pointer flex items-center justify-between bg-white dark:bg-dark-card text-ink dark:text-dark-ink font-medium border border-ink-border dark:border-dark-border shadow-2xs';
      } else {
        btn.className = 'font-family-btn w-full py-2 px-3 rounded-xs text-left transition-colors duration-150 cursor-pointer flex items-center justify-between text-ink/75 dark:text-dark-ink/75 hover:text-ink dark:hover:text-dark-ink border border-transparent hover:bg-paper-200/50 dark:hover:bg-dark-border/40';
      }
    });

    if (persist) AhkhStorage.set('ahkh_reader_font_family', resolvedFam);
    requestAnimationFrame(() => repositionAllGutterNotes());
  }

  function applyReadingMeasure(measure, persist = true) {
    const centerCol = document.getElementById('center-reading-column');
    const isWide = measure === 'wide';
    const label = document.getElementById('measure-label');
    const standardBtn = document.getElementById('measure-standard-btn');
    const wideBtn = document.getElementById('measure-wide-btn');

    if (centerCol) {
      if (isWide) {
        centerCol.classList.remove('max-w-reading');
        centerCol.classList.add('max-w-3xl');
      } else {
        centerCol.classList.remove('max-w-3xl');
        centerCol.classList.add('max-w-reading');
      }
    }

    if (label) label.textContent = isWide ? 'Expanded (82ch)' : 'Standard (68ch)';

    if (standardBtn && wideBtn) {
      if (isWide) {
        wideBtn.className = 'measure-btn py-1.5 px-2 rounded-xs text-center font-sans text-xs transition-colors duration-150 cursor-pointer bg-white dark:bg-dark-card text-ink dark:text-dark-ink font-medium border border-ink-border dark:border-dark-border shadow-2xs';
        standardBtn.className = 'measure-btn py-1.5 px-2 rounded-xs text-center font-sans text-xs transition-colors duration-150 cursor-pointer text-ink-muted dark:text-dark-muted hover:text-ink dark:hover:text-dark-ink border border-transparent';
      } else {
        standardBtn.className = 'measure-btn py-1.5 px-2 rounded-xs text-center font-sans text-xs transition-colors duration-150 cursor-pointer bg-white dark:bg-dark-card text-ink dark:text-dark-ink font-medium border border-ink-border dark:border-dark-border shadow-2xs';
        wideBtn.className = 'measure-btn py-1.5 px-2 rounded-xs text-center font-sans text-xs transition-colors duration-150 cursor-pointer text-ink-muted dark:text-dark-muted hover:text-ink dark:hover:text-dark-ink border border-transparent';
      }
    }

    if (persist) AhkhStorage.set('ahkh_reader_measure', measure);
    requestAnimationFrame(() => repositionAllGutterNotes());
  }

  function applyTheme(theme, persist = true) {
    if (persist && theme) {
      if (window.__setTheme) {
        window.__setTheme(theme);
      } else {
        try { AhkhStorage.set('ahkh_theme', theme); } catch (e) {}
        if (theme === 'dark') document.documentElement.classList.add('dark');
        else if (theme === 'light') document.documentElement.classList.remove('dark');
      }
    }

    const currentIsDark = document.documentElement.classList.contains('dark');
    const themeLabel = document.getElementById('theme-status-label');
    if (themeLabel) themeLabel.textContent = currentIsDark ? 'Carbon (Dark)' : 'Paper (Light)';

    const lightBtn = document.getElementById('theme-light-btn');
    const darkBtn = document.getElementById('theme-dark-btn');

    if (currentIsDark) {
      if (darkBtn) darkBtn.className = 'theme-switch-btn py-1.5 px-2.5 rounded-xs text-center font-sans text-xs transition-colors duration-150 cursor-pointer flex items-center justify-center gap-1.5 bg-white dark:bg-dark-card text-ink dark:text-dark-ink font-medium border border-ink-border dark:border-dark-border shadow-2xs';
      if (lightBtn) lightBtn.className = 'theme-switch-btn py-1.5 px-2.5 rounded-xs text-center font-sans text-xs transition-colors duration-150 cursor-pointer flex items-center justify-center gap-1.5 text-ink-muted dark:text-dark-muted hover:text-ink dark:hover:text-dark-ink border border-transparent';
    } else {
      if (lightBtn) lightBtn.className = 'theme-switch-btn py-1.5 px-2.5 rounded-xs text-center font-sans text-xs transition-colors duration-150 cursor-pointer flex items-center justify-center gap-1.5 bg-white dark:bg-dark-card text-ink dark:text-dark-ink font-medium border border-ink-border dark:border-dark-border shadow-2xs';
      if (darkBtn) darkBtn.className = 'theme-switch-btn py-1.5 px-2.5 rounded-xs text-center font-sans text-xs transition-colors duration-150 cursor-pointer flex items-center justify-center gap-1.5 text-ink-muted dark:text-dark-muted hover:text-ink dark:hover:text-dark-ink border border-transparent';
    }
  }



  function resetDisplaySettings() {
    applyFontSize('base', true);
    applyFontFamily('merriweather', true);
    applyReadingMeasure('standard', true);
  }

  // Popover toggle
  function closeDisplayMenu() {
    if (!displayMenu || displayMenu.classList.contains('hidden')) return;
    displayMenu.classList.add('hidden');
    displayBtn?.setAttribute('aria-expanded', 'false');
    displayBtn?.classList.remove('bg-paper-200/90', 'dark:bg-dark-border/80', 'text-ink', 'dark:text-dark-ink');
    displayBtn?.classList.add('text-ink-muted', 'dark:text-dark-muted');
  }

  function toggleDisplayMenu() {
    if (!displayMenu) return;
    const isHidden = displayMenu.classList.contains('hidden');
    if (isHidden) {
      displayMenu.classList.remove('hidden');
      displayBtn?.setAttribute('aria-expanded', 'true');
      displayBtn?.classList.add('bg-paper-200/90', 'dark:bg-dark-border/80', 'text-ink', 'dark:text-dark-ink');
      displayBtn?.classList.remove('text-ink-muted', 'dark:text-dark-muted');
    } else {
      closeDisplayMenu();
    }
  }

  displayBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDisplayMenu();
  }, { signal: __ahkhSignal });

  document.addEventListener('click', (e) => {
    if (displayMenu && !displayMenu.classList.contains('hidden') && !displayMenu.contains(e.target) && e.target !== displayBtn) {
      closeDisplayMenu();
    }
  }, { signal: __ahkhSignal });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDisplayMenu();
      closeMobileDrawers();
    }
    // Keyboard shortcuts: '[' for left sidebar, ']' for right sidebar, 'z' for zen mode, Alt+ArrowRight for next, Alt+ArrowLeft for previous
    if (!['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
      if (e.key === '[') {
        e.preventDefault();
        toggleLeftSidebar();
      } else if (e.key === ']') {
        e.preventDefault();
        toggleRightSidebar();
      } else if (e.key.toLowerCase() === 'z' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        toggleZenMode();
      } else if (e.altKey && e.key === 'ArrowRight') {
        const nextCard = document.getElementById('next-lesson-card-btn');
        if (nextCard) {
          e.preventDefault();
          nextCard.click();
        }
      } else if (e.altKey && e.key === 'ArrowLeft') {
        const prevCard = document.getElementById('prev-lesson-card-btn');
        if (prevCard) {
          e.preventDefault();
          prevCard.click();
        }
      }
    }
  }, { signal: __ahkhSignal });

  // Size buttons listeners
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sz = btn.getAttribute('data-size');
      if (sz) applyFontSize(sz, true);
    }, { signal: __ahkhSignal });
  });

  // Font buttons listeners
  document.querySelectorAll('.font-family-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const fontId = btn.getAttribute('data-font-id');
      if (fontId) applyFontFamily(fontId, true);
    }, { signal: __ahkhSignal });
  });

  // Measure buttons listeners
  document.getElementById('measure-standard-btn')?.addEventListener('click', () => applyReadingMeasure('standard', true), { signal: __ahkhSignal });
  document.getElementById('measure-wide-btn')?.addEventListener('click', () => applyReadingMeasure('wide', true), { signal: __ahkhSignal });

  // Theme buttons listeners
  document.getElementById('theme-light-btn')?.addEventListener('click', () => applyTheme('light', true), { signal: __ahkhSignal });
  document.getElementById('theme-dark-btn')?.addEventListener('click', () => applyTheme('dark', true), { signal: __ahkhSignal });

  // Theme change listener for reader UI sync
  window.addEventListener('ahkh-theme-change', () => {
    applyTheme(null, false);
  }, { signal: __ahkhSignal });

  // Reset button listener
  document.getElementById('reset-display-btn')?.addEventListener('click', resetDisplaySettings, { signal: __ahkhSignal });

  // D. HIGHLIGHTING & MARGINALIA ENGINE
  const storageKey = `ahkh_hl_${courseId}_${lessonId}`;
  let highlights = [];
  try {
    highlights = JSON.parse(AhkhStorage.get(storageKey) || '[]');
    if (!Array.isArray(highlights)) highlights = [];
  } catch (e) {
    highlights = [];
  }

  let currentSelectionRange = null;
  let activeExistingHighlight = null;
  let activeHighlightIdForNote = null;

  const popover = document.getElementById('selection-popover');
  const popoverHlBtn = document.getElementById('popover-hl-btn');
  const popoverNoteBtn = document.getElementById('popover-note-btn');
  const popoverCopyBtn = document.getElementById('popover-copy-btn');
  const noteDialog = document.getElementById('note-dialog');
  const noteInput = document.getElementById('note-input-text');
  const noteQuotePreview = document.getElementById('note-quote-preview');

  function saveHighlights() {
    AhkhStorage.set(storageKey, JSON.stringify(highlights));
    renderSidebarHighlights();
    updateHeaderCount();
    if (typeof window.updateGlobalBadge === 'function') {
      window.updateGlobalBadge();
    }
  }

  function updateHeaderCount() {
    const countEl = document.getElementById('header-highlights-count');
    const sidebarCount = document.getElementById('sidebar-count');
    if (countEl) countEl.textContent = highlights.length;
    if (sidebarCount) sidebarCount.textContent = `${highlights.length} saved`;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Popover State Helpers
  function setPopoverMode(mode, highlightItem = null) {
    const hlIcon = document.getElementById('popover-hl-icon');
    const hlLabel = document.getElementById('popover-hl-label');

    if (mode === 'remove') {
      if (popoverHlBtn) {
        popoverHlBtn.className = 'px-2.5 py-1 rounded-xs text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/50 hover:bg-rose-100 dark:hover:bg-rose-900/60 font-medium flex items-center gap-1.5 transition-colors cursor-pointer';
      }
      if (hlIcon) {
        hlIcon.innerHTML = `
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        `;
      }
      if (hlLabel) hlLabel.textContent = 'Remove';
      activeExistingHighlight = highlightItem;
    } else {
      if (popoverHlBtn) {
        popoverHlBtn.className = 'px-2.5 py-1 rounded-xs bg-paper-200/90 dark:bg-dark-border/80 hover:bg-paper-200 dark:hover:bg-dark-border text-ink dark:text-dark-ink border border-ink-border/80 dark:border-dark-border font-medium flex items-center gap-1.5 transition-colors cursor-pointer';
      }
      if (hlIcon) {
        hlIcon.innerHTML = `
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m9 11-6 6v3h3l6-6"/>
            <path d="m22 7-4.5-4.5a2.12 2.12 0 0 0-3 0l-2.5 2.5 7.5 7.5 2.5-2.5a2.12 2.12 0 0 0 0-3Z"/>
          </svg>
        `;
      }
      if (hlLabel) hlLabel.textContent = 'Highlight';
      activeExistingHighlight = null;
    }
  }

  // User-selected highlight colors (persisted last choice; stored per highlight)
  const HL_COLORS = ['graphite', 'amber', 'emerald', 'sky', 'rose', 'violet', 'midnight'];
  const HL_COLOR_KEY = 'ahkh_hl_color';
  function getHlColor() {
    try {
      const c = AhkhStorage.get(HL_COLOR_KEY);
      return HL_COLORS.includes(c) ? c : 'amber';
    } catch (e) { return 'amber'; }
  }
  function hlClass(color) { return `ahkh-hl-${HL_COLORS.includes(color) ? color : 'amber'}`; }
  function paintHlSwatches() {
    document.querySelectorAll('.hl-swatch').forEach((b) => {
      const on = b.getAttribute('data-hl-color') === getHlColor();
      b.setAttribute('aria-checked', on ? 'true' : 'false');
      b.classList.toggle('ring-2', on);
      b.classList.toggle('ring-offset-1', on);
      b.classList.toggle('ring-ink/50', on);
      b.classList.toggle('dark:ring-white/60', on);
    });
  }
  function initHlSwatches() {
    paintHlSwatches();
    document.querySelectorAll('.hl-swatch').forEach((b) => {
      if (b.dataset.bound) return;
      b.dataset.bound = 'true';
      b.addEventListener('click', (e) => {
        e.stopPropagation();
        const c = b.getAttribute('data-hl-color') || 'graphite';
        try { AhkhStorage.set(HL_COLOR_KEY, c); } catch (err) {}
        paintHlSwatches();
        if (activeExistingHighlight) {
          activeExistingHighlight.color = c;
          const span = document.getElementById(activeExistingHighlight.id);
          if (span) span.className = `ahkh-highlight ${hlClass(c)}`;
          saveHighlights();
        }
      }, { signal: __ahkhSignal });
    });
  }

  function positionPopover(rect) {
    if (!popover) return;
    // The popover is position:fixed: use viewport coordinates only, never scroll offsets.
    popover.classList.remove('hidden');
    const popW = popover.offsetWidth || 264;
    const popH = popover.offsetHeight || 44;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let left = rect.left + rect.width / 2 - popW / 2;
    left = Math.max(8, Math.min(vw - popW - 8, left));
    let top = rect.top - popH - 12;
    if (top < 70) top = rect.bottom + 12;
    top = Math.max(8, Math.min(vh - popH - 8, top));
    popover.style.left = `${left}px`;
    popover.style.top = `${top}px`;
  }

  function hidePopover() {
    popover?.classList.add('hidden');
    currentSelectionRange = null;
    activeExistingHighlight = null;
  }

  /* Handle Text Selection (Desktop + Mobile Unified) */
  let selectionDebounceTimer = null;

  /* 1. Desktop mouseup & keyboard selection */
  document.addEventListener('mouseup', handleTextSelection, { signal: __ahkhSignal });
  document.addEventListener('keyup', handleTextSelection, { signal: __ahkhSignal });

  /* 2. Mobile touch completion */
  document.addEventListener('touchend', () => {
    setTimeout(handleTextSelection, 60);
  }, { passive: true, signal: __ahkhSignal });

  /* 3. Selection change listener with debounce for active grabber adjustment */
  document.addEventListener('selectionchange', () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      if (currentSelectionRange && !activeExistingHighlight) {
        hidePopover();
      }
      clearTimeout(selectionDebounceTimer);
      return;
    }

    clearTimeout(selectionDebounceTimer);
    selectionDebounceTimer = setTimeout(() => {
      handleTextSelection();
    }, 200);
  }, { signal: __ahkhSignal });

  function handleTextSelection() {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      return;
    }

    const text = selection.toString().trim();
    if (text.length < 3) {
      hidePopover();
      return;
    }

    const range = selection.getRangeAt(0);
    if (!getReadingContent() || !getReadingContent().contains(range.commonAncestorContainer)) {
      hidePopover();
      return;
    }

    currentSelectionRange = range.cloneRange();
    setPopoverMode('highlight');
    positionPopover(range.getBoundingClientRect());
    popover?.classList.remove('hidden');
  }

  /* 4. Dismiss popover on outside tap/click (desktop & touch) */
  const dismissPopoverOutside = (e) => {
    if (popover && !popover.classList.contains('hidden')) {
      if (!popover.contains(e.target) && !e.target.closest('.ahkh-highlight')) {
        const selection = window.getSelection();
        if (selection && !selection.isCollapsed && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          if (range && range.commonAncestorContainer && range.commonAncestorContainer.contains(e.target)) {
            return;
          }
        }
        hidePopover();
      }
    }
  };

  document.addEventListener('mousedown', dismissPopoverOutside, { signal: __ahkhSignal });
  document.addEventListener('touchstart', dismissPopoverOutside, { passive: true, signal: __ahkhSignal });

  // Create highlight from current text selection
  function createHighlightFromSelection() {
    if (!currentSelectionRange) return null;
    const selectedText = currentSelectionRange.toString().trim();
    if (!selectedText) return null;

    const hlId = 'hl_' + Date.now();
    const span = document.createElement('span');
    span.className = 'ahkh-highlight ' + hlClass(getHlColor());
    span.id = hlId;
    span.style.setProperty('--course-accent', courseAccent);
    span.style.setProperty('--course-highlight', courseHighlight);

    try {
      currentSelectionRange.surroundContents(span);
    } catch (e) {
      const contents = currentSelectionRange.extractContents();
      span.appendChild(contents);
      currentSelectionRange.insertNode(span);
    }

    const newItem = {
      id: hlId,
      text: selectedText,
      note: '',
      color: getHlColor(),
      courseId,
      courseTitle,
      lessonSlug,
      lessonTitle,
      url: window.location.pathname,
      timestamp: new Date().toISOString(),
    };

    span.addEventListener('click', (ev) => {
      ev.stopPropagation();
      openHighlightOptions(newItem, span);
    }, { signal: __ahkhSignal });

    highlights.push(newItem);
    saveHighlights();
    hidePopover();
    window.getSelection()?.removeAllRanges();
    currentSelectionRange = null;

    if (getStoredLessonState() === 'explored') {
      showExploredReminderToast();
    }

    return newItem;
  }

  // Click on existing highlight in text
  function openHighlightOptions(item, spanEl) {
    const rect = spanEl.getBoundingClientRect();
    setPopoverMode('remove', item);
    positionPopover(rect);
    popover?.classList.remove('hidden');
  }

  // Popover buttons
  popoverHlBtn?.addEventListener('click', () => {
    if (activeExistingHighlight) {
      removeHighlight(activeExistingHighlight.id);
      hidePopover();
    } else if (currentSelectionRange) {
      createHighlightFromSelection();
    }
  }, { signal: __ahkhSignal });

  popoverNoteBtn?.addEventListener('click', () => {
    if (activeExistingHighlight) {
      const h = activeExistingHighlight;
      hidePopover();
      openNoteModal(h.id, h.text, h.note || '');
    } else if (currentSelectionRange) {
      const created = createHighlightFromSelection();
      if (created) {
        openNoteModal(created.id, created.text, '');
      }
    }
  }, { signal: __ahkhSignal });

  popoverCopyBtn?.addEventListener('click', () => {
    const textToCopy = activeExistingHighlight 
      ? activeExistingHighlight.text 
      : (currentSelectionRange ? currentSelectionRange.toString().trim() : '');
    if (!textToCopy) return;

    const citation = `"${textToCopy}"\n— ${lessonTitle} (${courseTitle})\n${window.location.href}`;
    navigator.clipboard.writeText(citation).then(() => {
      const copyIcon = document.getElementById('popover-copy-icon');
      const copyLabel = document.getElementById('popover-copy-label');
      if (copyIcon) {
        copyIcon.innerHTML = `
          <svg class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        `;
      }
      if (copyLabel) copyLabel.textContent = 'Copied!';
      setTimeout(() => {
        if (copyIcon) {
          copyIcon.innerHTML = `
            <svg class="w-3.5 h-3.5 text-ink-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
            </svg>
          `;
        }
        if (copyLabel) copyLabel.textContent = 'Copy';
        hidePopover();
      }, 900);
    });
  }, { signal: __ahkhSignal });

  // Remove highlight
  function removeHighlight(id) {
    highlights = highlights.filter(h => h.id !== id);
    const spanEl = document.getElementById(id);
    if (spanEl && spanEl.parentNode) {
      while (spanEl.firstChild) {
        spanEl.parentNode.insertBefore(spanEl.firstChild, spanEl);
      }
      spanEl.remove();
    }
    const gutterEl = document.getElementById(`gutter-note-${id}`);
    if (gutterEl) gutterEl.remove();
    repositionAllGutterNotes();
    saveHighlights();
  }

  // Note Modal Actions
  function openNoteModal(id, text, existingNote) {
    activeHighlightIdForNote = id;
    if (noteQuotePreview) noteQuotePreview.textContent = `"${text}"`;
    if (noteInput) {
      noteInput.value = existingNote || '';
    }
    noteDialog?.classList.remove('hidden');
    setTimeout(() => noteInput?.focus(), 50);
  }

  function closeNoteModal() {
    noteDialog?.classList.add('hidden');
    activeHighlightIdForNote = null;
  }

  document.getElementById('close-note-dialog-btn')?.addEventListener('click', closeNoteModal, { signal: __ahkhSignal });
  document.getElementById('cancel-note-btn')?.addEventListener('click', closeNoteModal, { signal: __ahkhSignal });

  document.getElementById('save-note-btn')?.addEventListener('click', saveNoteAction, { signal: __ahkhSignal });
  document.getElementById('note-dialog')?.addEventListener('mousedown', (e) => {
    if (e.target && e.target.id === 'note-dialog') closeNoteModal();
  }, { signal: __ahkhSignal });

  function saveNoteAction() {
    if (!activeHighlightIdForNote || !noteInput) return;
    const noteVal = noteInput.value.trim();
    const target = highlights.find(h => h.id === activeHighlightIdForNote);
    if (target) {
      target.note = noteVal;
      saveHighlights();
      renderGutterNote(target);
    }
    closeNoteModal();
  }

  // Keyboard shortcut for note modal
  window.addEventListener('keydown', (e) => {
    if (!noteDialog || noteDialog.classList.contains('hidden')) return;
    if (e.key === 'Escape') {
      closeNoteModal();
    } else if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      saveNoteAction();
    }
  }, { signal: __ahkhSignal });

  /* Gutter Marginalia Sidenote Rendering - Phase 1: Pure DOM Hydration (No layout reads/writes) */
  function ensureGutterNoteElement(item) {
    const readingEl = getReadingContent();
    if (!readingEl) return null;

    let gutterEl = document.getElementById(`gutter-note-${item.id}`);

    if (!item.note || !item.note.trim()) {
      if (gutterEl) gutterEl.remove();
      return null;
    }

    const span = document.getElementById(item.id);
    if (!span) return null;

    if (!gutterEl) {
      gutterEl = document.createElement('div');
      gutterEl.className = 'marginalia-gutter-note ' + hlClass(item.color);
      gutterEl.id = `gutter-note-${item.id}`;
      gutterEl.dataset.hlId = item.id;
      gutterEl.style.setProperty('--course-accent', courseAccent);
      readingEl.appendChild(gutterEl);
    } else {
      gutterEl.className = 'marginalia-gutter-note ' + hlClass(item.color);
    }

    gutterEl.innerHTML = `
      <div class="flex items-center justify-between gap-1 text-xs font-mono text-ink/80 dark:text-dark-ink/80 mb-1.5 pb-1 border-b border-ink-border/60 dark:border-dark-border/60">
        <span class="font-bold text-ink dark:text-dark-ink flex items-center gap-1.5 font-ui">
          <svg class="w-3.5 h-3.5 text-ink dark:text-dark-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
          </svg>
          Sidenote
        </span>
        <span class="text-ink-muted dark:text-dark-muted hover:text-ink dark:hover:text-dark-ink cursor-pointer p-0.5" title="Edit note">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
          </svg>
        </span>
      </div>
      <p class="text-sm font-sans text-ink dark:text-dark-ink leading-relaxed font-normal">${escapeHtml(item.note)}</p>
    `;

    gutterEl.onclick = (e) => {
      e.stopPropagation();
      openNoteModal(item.id, item.text, item.note);
      jumpToHighlight(item.id);
    };

    return gutterEl;
  }

  function renderGutterNote(item) {
    const el = ensureGutterNoteElement(item);
    if (el) scheduleCascadeGutterNotes();
    return el;
  }

  /* Coalesced RAF Scheduler */
  let gutterLayoutRaf = null;

  function scheduleCascadeGutterNotes() {
    if (gutterLayoutRaf !== null) return;
    gutterLayoutRaf = requestAnimationFrame(() => {
      gutterLayoutRaf = null;
      batchLayoutGutterNotes();
    });
  }

  /* 3-Stage Batch Layout & Cascade Pass */
  function batchLayoutGutterNotes() {
    const readingEl = getReadingContent();
    if (!readingEl) return;

    /* Stage 1: Batch Reads (single layout pass) */
    const readingBox = readingEl.getBoundingClientRect();
    const noteElements = Array.from(document.querySelectorAll('.marginalia-gutter-note'));

    const notesToPosition = [];
    const notesToHide = [];

    for (let i = 0; i < noteElements.length; i++) {
      const noteEl = noteElements[i];
      if (!noteEl.isConnected) continue;

      const hlId = noteEl.dataset.hlId || noteEl.id.replace('gutter-note-', '');
      const span = document.getElementById(hlId);

      if (!span || span.closest('.hidden') || span.offsetParent === null) {
        notesToHide.push(noteEl);
        continue;
      }

      const spanBox = span.getBoundingClientRect();
      const noteHeight = noteEl.offsetHeight || 0;
      const targetTop = Math.max(0, spanBox.top - readingBox.top);

      notesToPosition.push({
        el: noteEl,
        targetTop: targetTop,
        height: noteHeight,
        finalTop: 0,
      });
    }

    /* Stage 2: In-Memory Math (pure calculation, zero DOM interaction) */
    notesToPosition.sort((a, b) => a.targetTop - b.targetTop);

    let floor = 0;
    for (let i = 0; i < notesToPosition.length; i++) {
      const item = notesToPosition[i];
      item.finalTop = Math.max(item.targetTop, floor);
      floor = item.finalTop + item.height + 8;
    }

    /* Stage 3: Batch Writes (zero DOM reads) */
    for (let i = 0; i < notesToHide.length; i++) {
      notesToHide[i].style.display = 'none';
    }

    for (let i = 0; i < notesToPosition.length; i++) {
      const item = notesToPosition[i];
      item.el.style.display = '';
      item.el.style.top = `${item.finalTop}px`;
    }
  }

  function cascadeGutterNotes() {
    batchLayoutGutterNotes();
  }

  function repositionAllGutterNotes() {
    scheduleCascadeGutterNotes();
  }

  window.addEventListener('resize', scheduleCascadeGutterNotes, { passive: true, signal: __ahkhSignal });

  // DOM Text Range Search for Highlighting Restoration (Multi-occurrence & Overlap-Safe)
  function findRangeForTextInElement(element, searchText) {
    const fullText = element.textContent || '';
    if (!fullText || !searchText) return null;

    let searchFrom = 0;
    while (searchFrom < fullText.length) {
      let startChar = fullText.indexOf(searchText, searchFrom);
      let searchLen = searchText.length;

      if (startChar === -1) {
        if (searchFrom > 0) break;
        const normSearch = searchText.replace(/\s+/g, ' ').trim();
        if (!normSearch) return null;
        const words = normSearch.split(' ').map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
        const pattern = new RegExp(words.join('\\s+'));
        const match = pattern.exec(fullText);
        if (!match) return null;
        startChar = match.index;
        searchLen = match[0].length;
      }

      const endChar = startChar + searchLen;
      let currentChar = 0;
      let startNode = null;
      let startOffset = 0;
      let endNode = null;
      let endOffset = 0;

      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
      let textNode;

      while ((textNode = walker.nextNode())) {
        const len = (textNode.nodeValue || '').length;
        const nextChar = currentChar + len;

        if (!startNode && startChar >= currentChar && startChar < nextChar) {
          startNode = textNode;
          startOffset = startChar - currentChar;
        }
        if (!endNode && endChar > currentChar && endChar <= nextChar) {
          endNode = textNode;
          endOffset = endChar - currentChar;
          break;
        }
        currentChar = nextChar;
      }

      if (startNode && endNode) {
        const isAlreadyInsideHighlight = (startNode.parentElement && startNode.parentElement.closest('.ahkh-highlight')) ||
                                         (endNode.parentElement && endNode.parentElement.closest('.ahkh-highlight'));
        if (!isAlreadyInsideHighlight) {
          const range = document.createRange();
          range.setStart(startNode, startOffset);
          range.setEnd(endNode, endOffset);
          return range;
        }
      }

      searchFrom = startChar + 1;
    }
    return null;
  }

  // Restore Highlights in DOM on load (formatted view first, verbatim transcript second)
  function restoreHighlightsInDOM() {
    if (!getReadingContent()) return;

    const restoreViews = ['formatted-view', 'transcript-view']
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    highlights.forEach(item => {
      if (document.getElementById(item.id)) {
        if (item.note) ensureGutterNoteElement(item);
        return;
      }

      const blocks = restoreViews.flatMap((v) => Array.from(v.querySelectorAll('p, blockquote, li, h2, h3, h4, td, th, figcaption, .cue-text, [data-timestamp] p')));
      for (const block of blocks) {
        const range = findRangeForTextInElement(block, item.text);
        if (range) {
          const span = document.createElement('span');
          span.className = 'ahkh-highlight ' + hlClass(item.color);
          span.id = item.id;
          span.style.setProperty('--course-accent', courseAccent);
          span.style.setProperty('--course-highlight', courseHighlight);

          try {
            range.surroundContents(span);
          } catch (e) {
            const contents = range.extractContents();
            span.appendChild(contents);
            range.insertNode(span);
          }

          span.addEventListener('click', (ev) => {
            ev.stopPropagation();
            openHighlightOptions(item, span);
          }, { signal: __ahkhSignal });

          if (item.note && (span.closest('#formatted-view') || span.closest('#transcript-view'))) {
            ensureGutterNoteElement(item);
          }
          break;
        }
      }
    });

    scheduleCascadeGutterNotes();
  }

  // Render Highlights in Right Sidebar
  function renderSidebarHighlights() {
    const listEl = document.getElementById('sidebar-highlights-list');
    if (!listEl) return;

    if (highlights.length === 0) {
      listEl.innerHTML = `
        <div class="text-center py-8 px-3 border border-dashed border-ink-border/60 dark:border-dark-border/60 rounded-xs bg-paper-50/50 dark:bg-dark-card/30">
          <div class="w-7 h-7 mx-auto mb-2 rounded-full bg-paper-200/70 dark:bg-dark-border/50 text-ink-muted dark:text-dark-muted flex items-center justify-center">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
          </div>
          <p class="font-serif text-xs font-medium text-ink dark:text-dark-ink mb-1">No Highlights Yet</p>
          <p class="text-[11px] font-sans text-ink-muted dark:text-dark-muted leading-relaxed">
            Select any text passage to highlight and record marginal thoughts.
          </p>
        </div>
      `;
      return;
    }

    listEl.innerHTML = highlights.map(item => `
      <article 
        class="p-3.5 rounded-xs border border-ink-border dark:border-dark-border bg-paper-50 dark:bg-dark-card hover:bg-paper-100 dark:hover:bg-dark-border/40 transition-colors duration-150 cursor-pointer group shadow-2xs"
        onclick="jumpToHighlight('${item.id}')"
      >
        <div class="flex items-center justify-between mb-2 text-xs font-mono text-ink/80 dark:text-dark-ink/80">
          <span class="font-medium">${item.timestamp ? new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span>
          <div class="flex items-center gap-2.5">
            <span class="group-hover:text-ink dark:group-hover:text-dark-ink text-ink-muted dark:text-dark-muted flex items-center gap-1 font-ui text-xs">
              Jump
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M7 17 17 7M7 7h10v10"/>
              </svg>
            </span>
            <button 
              onclick="event.stopPropagation(); window.deleteSidebarHighlight('${item.id}')"
              class="text-ink-muted dark:text-dark-muted hover:text-rose-700 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 p-0.5 rounded-xs transition-colors cursor-pointer"
              title="Delete Highlight"
              aria-label="Delete Highlight"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
        <blockquote class="font-serif text-sm italic text-ink dark:text-dark-ink border-l-2 pl-2.5 mb-2.5 leading-relaxed line-clamp-3 ${hlClass(item.color)}">
          "${escapeHtml(item.text)}"
        </blockquote>
        ${item.note ? `
          <div class="text-xs font-sans text-ink dark:text-dark-ink bg-paper-100 dark:bg-dark-card p-2.5 rounded-xs border border-ink-border dark:border-dark-border leading-relaxed space-y-1">
            <div class="font-mono text-[10px] uppercase tracking-widest text-ink-muted dark:text-dark-muted font-medium">Marginalia</div>
            <p>${escapeHtml(item.note)}</p>
          </div>
        ` : `
          <button 
            onclick="event.stopPropagation(); window.openNoteModalExternal('${item.id}')"
            class="text-xs font-ui text-ink dark:text-dark-ink underline font-medium cursor-pointer hover:opacity-80"
          >
            + Add Sidenote
          </button>
        `}
      </article>
    `).join('');
  }

  window.openNoteModalExternal = function(id) {
    const item = highlights.find(h => h.id === id);
    if (item) {
      openNoteModal(item.id, item.text, item.note || '');
    }
  };

  window.deleteSidebarHighlight = function(id) {
    removeHighlight(id);
  };

  window.jumpToHighlight = function(id) {
    closeMobileDrawers();
    const el = document.getElementById(id);
    if (el) {
      const tv = document.getElementById('transcript-view');
      if (tv && tv.contains(el) && tv.classList.contains('hidden') && typeof setTranscriptView === 'function') {
        setTranscriptView('original', false);
      }
      const fv = document.getElementById('formatted-view');
      if (fv && fv.contains(el) && fv.classList.contains('hidden') && typeof setTranscriptView === 'function') {
        setTranscriptView('formatted', false);
      }
      scrollActiveCueIntoView(el, true);
      el.classList.remove('active');
      void el.offsetWidth; // Reflow to re-trigger CSS animation
      el.classList.add('active');
      setTimeout(() => el.classList.remove('active'), 1800);
    }
  };

  // Safe vertical clearance calculation preventing text from hiding under sticky video & header
  function getStickyVideoClearance() {
    const stickyWrapper = document.getElementById('video-sticky-wrapper');
    const isHeaderHidden = document.body.getAttribute('data-header-hidden') === 'true';
    const topProgressHeight = 3;
    const headerHeight = 56;
    const headerTopOffset = isHeaderHidden ? topProgressHeight : (topProgressHeight + headerHeight);

    if (!stickyWrapper) return headerTopOffset + 12;

    const isStuck = stickyWrapper.classList.contains('is-stuck');
    if (!isStuck) {
      return headerTopOffset + 16;
    }

    const rect = stickyWrapper.getBoundingClientRect();
    return Math.max(rect.bottom, headerTopOffset + 24);
  }

  function scrollActiveCueIntoView(el, forceReposition = false) {
    if (!el) return;
    if (!forceReposition && (!autoScrollCheckbox || !autoScrollCheckbox.checked)) return;

    const clearance = getStickyVideoClearance();
    const rect = el.getBoundingClientRect();
    const viewHeight = window.innerHeight;

    // Available open reading height below the bottom of the sticky video
    const clearReadingHeight = Math.max(200, viewHeight - clearance);
    // Ideal comfortable focal position: ~24% down the clear reading area below the video
    const idealTop = clearance + Math.max(24, clearReadingHeight * 0.24);

    const isObscuredByVideo = rect.top < (clearance + 18);
    const isOffBottom = rect.bottom > (viewHeight - 32);

    if (forceReposition || isObscuredByVideo || isOffBottom) {
      const delta = rect.top - idealTop;
      const targetScrollY = Math.max(0, window.scrollY + delta);
      window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth'
      });
    }
  }

  // E. YOUTUBE TRANSCRIPT SYNC & INTERACTIVE TIMESTAMPS
  const autoScrollCheckbox = document.getElementById('auto-scroll-sync');
  let ytPlayer = null;
  let ytSyncTimer = null;

  function initYouTubeSync() {
    const iframe = document.getElementById('youtube-player');
    if (!iframe) return;

    function setupPlayer() {
      if (!window.YT || !window.YT.Player) return;
      try {
        ytPlayer = new window.YT.Player('youtube-player', {
          events: {
            'onStateChange': onPlayerStateChange
          }
        });
        window.__ahkhYtPlayer = ytPlayer;
      } catch (err) {
        console.warn('Could not initialize YouTube Player:', err);
      }
    }

    function onPlayerStateChange(event) {
      // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
      if (event.data === 1) {
        startSyncInterval();
      } else {
        stopSyncInterval();
      }
    }

    function startSyncInterval() {
      stopSyncInterval();
      ytSyncTimer = setInterval(() => {
        if (!ytPlayer || typeof ytPlayer.getCurrentTime !== 'function') return;
        try {
          const currentTime = ytPlayer.getCurrentTime();
          syncTranscript(currentTime);
        } catch (e) {}
      }, 250);
      window.__ahkhYtTimer = ytSyncTimer;
    }

    function stopSyncInterval() {
      if (ytSyncTimer) {
        clearInterval(ytSyncTimer);
        ytSyncTimer = null;
      }
      window.__ahkhYtTimer = null;
    }

    function syncTranscript(currentTime) {
      // Scope sync to the VISIBLE view only: formatted and verbatim cues share
      // one engine, and hidden-view cues must never steal the active state.
      const view = getReadingContent();
      if (!view) return;
      const blocks = Array.from(view.querySelectorAll('[data-timestamp]'))
        .map((el) => ({ el, t: parseFloat(el.getAttribute('data-timestamp') || '0') }))
        .filter((x) => Number.isFinite(x.t))
        .sort((a, b) => a.t - b.t);
      if (!blocks.length) return;

      let activeEl = null;
      for (const { el, t } of blocks) {
        if (currentTime >= t) {
          activeEl = el;
        } else {
          break;
        }
      }

      blocks.forEach(({ el }) => {
        if (el === activeEl) {
          if (!el.classList.contains('yt-active-paragraph')) {
            el.classList.add('yt-active-paragraph');
            el.setAttribute('aria-current', 'true');
            el.setAttribute('data-active', 'true');
            scrollActiveCueIntoView(el);
          }
        } else {
          el.classList.remove('yt-active-paragraph');
          el.removeAttribute('aria-current');
          el.removeAttribute('data-active');
        }
      });
    }

    // Tag outline headings in formatted-view if no data-timestamp exists yet
    const formattedView = document.getElementById('formatted-view');
    if (formattedView && formattedView.hasAttribute('data-video-timestamps')) {
      const existingBlocks = formattedView.querySelectorAll('[data-timestamp]');
      if (existingBlocks.length === 0) {
        try {
          const vts = JSON.parse(formattedView.getAttribute('data-video-timestamps') || '[]');
          const headings = Array.from(formattedView.querySelectorAll('h2, h3'));
          if (vts.length > 0 && headings.length > 0) {
            vts.forEach((vt, idx) => {
              const h = headings[idx];
              if (h && !h.hasAttribute('data-timestamp')) {
                h.setAttribute('data-timestamp', vt.time.toString());
                h.classList.add('transition-colors', 'duration-150', 'rounded-xs');
              }
            });
          }
        } catch (e) {}
      }
    }

    // Attach click handlers to timestamp jump buttons
    document.querySelectorAll('.timestamp-btn, [data-seek-time], button[data-timestamp]').forEach(btn => {
      if (btn.dataset.bound) return;
      btn.dataset.bound = 'true';
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const seekVal = parseFloat(btn.getAttribute('data-seek-time') || btn.getAttribute('data-timestamp') || '0');
        if (ytPlayer && typeof ytPlayer.seekTo === 'function') {
          ytPlayer.seekTo(seekVal, true);
          if (typeof ytPlayer.playVideo === 'function') {
            ytPlayer.playVideo();
          }
        }
        const targetCue = btn.closest('[data-timestamp]') || btn;
        if (targetCue) {
          scrollActiveCueIntoView(targetCue, true);
        }
      }, { signal: __ahkhSignal });
    });

    if (window.YT && window.YT.Player) {
      setupPlayer();
    } else {
      window.onYouTubeIframeAPIReady = function() {
        setupPlayer();
      };

      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      }
    }
  }

  // F. STICKY YOUTUBE VIDEO CONTROLLER
  function initStickyVideo() {
    const wrapper = document.getElementById('video-sticky-wrapper');
    const sentinel = document.getElementById('video-scroll-sentinel');
    const pinBtn = document.getElementById('toggle-video-pin');
    const compactBtn = document.getElementById('toggle-video-compact');
    if (!wrapper || !sentinel) return;

    let isPinned = true;
    try {
      const savedPin = AhkhStorage.get('ahkh_video_pinned');
      if (savedPin !== null) isPinned = savedPin === 'true';
    } catch (e) {}

    let isCompact = false;
    try {
      const savedCompact = AhkhStorage.get('ahkh_video_compact');
      if (savedCompact !== null) isCompact = savedCompact === 'true';
    } catch (e) {}

    let isPastSentinel = false;

    function updateStuckState() {
      const shouldStick = isPinned && isPastSentinel;
      const wasStuck = wrapper.classList.contains('is-stuck');
      if (wasStuck !== shouldStick) {
        wrapper.classList.toggle('is-stuck', shouldStick);
        setTimeout(() => {
          const active = document.querySelector('.yt-active-paragraph');
          if (active) scrollActiveCueIntoView(active, false);
        }, 280);
      }
    }

    function applyPinState() {
      if (pinBtn) {
        pinBtn.setAttribute('aria-pressed', isPinned ? 'true' : 'false');
        pinBtn.classList.toggle('bg-paper-200/90', isPinned);
        pinBtn.classList.toggle('dark:bg-dark-border/80', isPinned);
        pinBtn.classList.toggle('text-rose-700', isPinned);
        pinBtn.classList.toggle('dark:text-rose-400', isPinned);
        const pinLabel = document.getElementById('video-pin-label');
        if (pinLabel) pinLabel.textContent = isPinned ? 'Pinned' : 'Pin Video';
      }
      updateStuckState();
    }

    function applyCompactState() {
      wrapper.classList.toggle('is-compact', isCompact);
      if (compactBtn) {
        compactBtn.setAttribute('aria-pressed', isCompact ? 'true' : 'false');
        compactBtn.classList.toggle('bg-paper-200/90', isCompact);
        compactBtn.classList.toggle('dark:bg-dark-border/80', isCompact);
        compactBtn.classList.toggle('text-rose-700', isCompact);
        compactBtn.classList.toggle('dark:text-rose-400', isCompact);
        const compactLabel = document.getElementById('video-compact-label');
        if (compactLabel) compactLabel.textContent = isCompact ? 'Expanded' : 'Compact';
      }
    }

    if (pinBtn && !pinBtn.dataset.bound) {
      pinBtn.dataset.bound = 'true';
      pinBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isPinned = !isPinned;
        try { AhkhStorage.set('ahkh_video_pinned', isPinned.toString()); } catch (err) {}
        applyPinState();
        setTimeout(() => {
          const active = document.querySelector('.yt-active-paragraph');
          if (active) scrollActiveCueIntoView(active, true);
        }, 320);
      }, { signal: __ahkhSignal });
    }

    if (compactBtn && !compactBtn.dataset.bound) {
      compactBtn.dataset.bound = 'true';
      compactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isCompact = !isCompact;
        try { AhkhStorage.set('ahkh_video_compact', isCompact.toString()); } catch (err) {}
        applyCompactState();
        setTimeout(() => {
          const active = document.querySelector('.yt-active-paragraph');
          if (active) scrollActiveCueIntoView(active, true);
        }, 320);
      }, { signal: __ahkhSignal });
    }

    applyPinState();
    applyCompactState();

    if ('IntersectionObserver' in window) {
      if (window.__ahkhVideoObserver) {
        try { window.__ahkhVideoObserver.disconnect(); } catch (e) {}
        window.__ahkhVideoObserver = null;
      }
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isPastSentinel = !entry.isIntersecting && entry.boundingClientRect.top <= 75;
          updateStuckState();
        });
      }, {
        rootMargin: '-59px 0px 0px 0px',
        threshold: [0, 1]
      });
      observer.observe(sentinel);
      window.__ahkhVideoObserver = observer;

      __ahkhSignal.addEventListener('abort', () => {
        try { observer.disconnect(); } catch (e) {}
        if (window.__ahkhVideoObserver === observer) {
          window.__ahkhVideoObserver = null;
        }
      }, { once: true });
    }

    window.addEventListener('scroll', () => {
      const rect = sentinel.getBoundingClientRect();
      isPastSentinel = rect.top <= 65;
      updateStuckState();
    }, { passive: true, signal: __ahkhSignal });

    window.addEventListener('resize', () => {
      const active = document.querySelector('.yt-active-paragraph');
      if (active) scrollActiveCueIntoView(active, false);
    }, { passive: true, signal: __ahkhSignal });
  }

  // G. IMAGE LIGHTBOX (Floating figure viewer: zoom, pan, pinch, keyboard)
  const lightbox = document.getElementById('image-lightbox');
  const lightboxViewport = document.getElementById('lightbox-viewport');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxZoomLabel = document.getElementById('lightbox-zoom-label');
  const lightboxOriginalLink = document.getElementById('lightbox-original-link');
  const lightboxPrevBtn = document.getElementById('lightbox-prev-btn');
  const lightboxNextBtn = document.getElementById('lightbox-next-btn');

  let lbGallery = [];
  let lbIndex = 0;
  let lbScale = 1;
  let lbX = 0;
  let lbY = 0;
  const LB_MIN_SCALE = 1;
  const LB_MAX_SCALE = 4;

  function collectLessonImages() {
    const views = [document.getElementById('formatted-view'), document.getElementById('transcript-view')].filter(Boolean);
    const items = [];
    views.forEach((view) => {
      view.querySelectorAll('img').forEach((img) => {
        const src = img.currentSrc || img.src;
        if (!src) return;
        if (items.some((it) => it.src === src)) return;
        const fig = img.closest('figure');
        const capEl = fig ? fig.querySelector('figcaption, p') : null;
        const caption = capEl ? (capEl.textContent || '').trim() : '';
        items.push({ src, alt: img.getAttribute('alt') || 'Lesson figure', caption });
      });
    });
    return items;
  }

  function applyLightboxTransform() {
    if (!lightboxImg) return;
    lightboxImg.style.transform = `translate(${lbX}px, ${lbY}px) scale(${lbScale})`;
    if (lightboxZoomLabel) lightboxZoomLabel.textContent = `${Math.round(lbScale * 100)}%`;
    if (lightboxViewport) {
      const atRest = lbScale <= LB_MIN_SCALE + 0.001;
      lightboxViewport.classList.toggle('cursor-grab', atRest);
    }
  }

  function clampLightboxPan() {
    if (!lightboxViewport || !lightboxImg) return;
    const vw = lightboxViewport.clientWidth || 1;
    const vh = lightboxViewport.clientHeight || 1;
    const iw = (lightboxImg.offsetWidth || 0) * lbScale;
    const ih = (lightboxImg.offsetHeight || 0) * lbScale;
    const maxX = Math.max(0, (iw - vw) / 2);
    const maxY = Math.max(0, (ih - vh) / 2);
    lbX = Math.max(-maxX, Math.min(maxX, lbX));
    lbY = Math.max(-maxY, Math.min(maxY, lbY));
  }

  function zoomLightboxAt(newScale, cx, cy) {
    const clamped = Math.max(LB_MIN_SCALE, Math.min(LB_MAX_SCALE, newScale));
    if (clamped === lbScale) {
      if (clamped <= LB_MIN_SCALE) { lbX = 0; lbY = 0; applyLightboxTransform(); }
      return;
    }
    const ratio = clamped / lbScale;
    if (typeof cx === 'number' && typeof cy === 'number' && lightboxViewport) {
      const rect = lightboxViewport.getBoundingClientRect();
      const px = cx - (rect.left + rect.width / 2);
      const py = cy - (rect.top + rect.height / 2);
      lbX = px - (px - lbX) * ratio;
      lbY = py - (py - lbY) * ratio;
    } else {
      lbX *= ratio;
      lbY *= ratio;
    }
    lbScale = clamped;
    if (lbScale <= LB_MIN_SCALE + 0.001) { lbX = 0; lbY = 0; }
    clampLightboxPan();
    applyLightboxTransform();
  }

  function renderLightboxItem() {
    const item = lbGallery[lbIndex];
    if (!item || !lightboxImg) return;
    lbScale = LB_MIN_SCALE;
    lbX = 0;
    lbY = 0;
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    applyLightboxTransform();
    if (lightboxCounter) lightboxCounter.textContent = `${lbIndex + 1} / ${lbGallery.length}`;
    if (lightboxCaption) lightboxCaption.textContent = item.caption || item.alt;
    if (lightboxOriginalLink) lightboxOriginalLink.href = item.src;
    const multi = lbGallery.length > 1;
    lightboxPrevBtn?.classList.toggle('hidden', !multi);
    lightboxNextBtn?.classList.toggle('hidden', !multi);
  }

  function openLightbox(src) {
    if (!lightbox) return;
    lbGallery = collectLessonImages();
    if (!lbGallery.length) return;
    const found = lbGallery.findIndex((it) => it.src === src);
    lbIndex = found >= 0 ? found : 0;
    renderLightboxItem();
    lightbox.classList.remove('hidden');
    document.documentElement.style.overflow = 'hidden';
    closeDisplayMenu();
    hidePopover();
    closeMobileDrawers();
    document.getElementById('lightbox-close-btn')?.focus();
  }

  function closeLightbox() {
    if (!lightbox || lightbox.classList.contains('hidden')) return;
    lightbox.classList.add('hidden');
    document.documentElement.style.overflow = '';
  }

  function stepLightbox(dir) {
    if (lbGallery.length < 2) return;
    lbIndex = (lbIndex + dir + lbGallery.length) % lbGallery.length;
    renderLightboxItem();
  }

  function initImageLightbox() {
    if (!lightbox || !lightboxViewport || !lightboxImg) return;
    lightboxImg.draggable = false;

    ['formatted-view', 'transcript-view'].forEach((id) => {
      const view = document.getElementById(id);
      if (!view || view.dataset.lbBound) return;
      view.dataset.lbBound = 'true';
      view.querySelectorAll('img').forEach((img) => img.classList.add('cursor-zoom-in'));
      view.addEventListener('click', (e) => {
        const t = e.target;
        const img = t && t.closest ? t.closest('img') : null;
        if (!img || !view.contains(img)) return;
        e.preventDefault();
        openLightbox(img.currentSrc || img.src);
      }, { signal: __ahkhSignal });
    });

    if (lightbox.dataset.bound) return;
    lightbox.dataset.bound = 'true';

    document.getElementById('lightbox-close-btn')?.addEventListener('click', closeLightbox, { signal: __ahkhSignal });
    document.getElementById('lightbox-zoom-in-btn')?.addEventListener('click', () => zoomLightboxAt(lbScale * 1.4), { signal: __ahkhSignal });
    document.getElementById('lightbox-zoom-out-btn')?.addEventListener('click', () => zoomLightboxAt(lbScale / 1.4), { signal: __ahkhSignal });
    document.getElementById('lightbox-zoom-reset-btn')?.addEventListener('click', () => zoomLightboxAt(LB_MIN_SCALE), { signal: __ahkhSignal });
    lightboxPrevBtn?.addEventListener('click', (e) => { e.stopPropagation(); stepLightbox(-1); }, { signal: __ahkhSignal });
    lightboxNextBtn?.addEventListener('click', (e) => { e.stopPropagation(); stepLightbox(1); }, { signal: __ahkhSignal });

    lightbox.addEventListener('mousedown', (e) => {
      if (e.target === lightbox) closeLightbox();
    }, { signal: __ahkhSignal });

    lightboxViewport.addEventListener('wheel', (e) => {
      e.preventDefault();
      zoomLightboxAt(lbScale * (e.deltaY < 0 ? 1.15 : 1 / 1.15), e.clientX, e.clientY);
    }, { signal: __ahkhSignal, passive: false });

    lightboxViewport.addEventListener('dblclick', (e) => {
      const dcTarget = e.target;
      if (dcTarget && dcTarget.closest && dcTarget.closest('button')) return;
      e.preventDefault();
      zoomLightboxAt(lbScale > 1.5 ? LB_MIN_SCALE : 2.5, e.clientX, e.clientY);
    }, { signal: __ahkhSignal });

    lightboxViewport.addEventListener('dragstart', (e) => e.preventDefault(), { signal: __ahkhSignal });

    const lbPointers = new Map();
    let lbPinchDist = 0;

    lightboxViewport.addEventListener('pointerdown', (e) => {
      const pdTarget = e.target;
      if (pdTarget && pdTarget.closest && pdTarget.closest('button')) return;
      try { lightboxViewport.setPointerCapture(e.pointerId); } catch (err) {}
      lbPointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (lbPointers.size === 2) {
        const pts = Array.from(lbPointers.values());
        lbPinchDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) || 1;
      }
      lightboxViewport.classList.add('cursor-grabbing');
      lightboxViewport.classList.remove('cursor-grab');
    }, { signal: __ahkhSignal });

    lightboxViewport.addEventListener('pointermove', (e) => {
      if (!lbPointers.has(e.pointerId)) return;
      const prev = lbPointers.get(e.pointerId);
      lbPointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (lbPointers.size === 2) {
        const pts = Array.from(lbPointers.values());
        const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) || 1;
        const midX = (pts[0].x + pts[1].x) / 2;
        const midY = (pts[0].y + pts[1].y) / 2;
        if (lbPinchDist > 0) zoomLightboxAt(lbScale * (dist / lbPinchDist), midX, midY);
        lbPinchDist = dist;
      } else if (lbScale > LB_MIN_SCALE) {
        lbX += e.clientX - prev.x;
        lbY += e.clientY - prev.y;
        clampLightboxPan();
        applyLightboxTransform();
      }
    }, { signal: __ahkhSignal });

    const endLbPointer = (e) => {
      lbPointers.delete(e.pointerId);
      if (lbPointers.size < 2) lbPinchDist = 0;
      if (lbPointers.size === 0) {
        lightboxViewport.classList.remove('cursor-grabbing');
        if (lbScale <= LB_MIN_SCALE + 0.001) lightboxViewport.classList.add('cursor-grab');
      }
    };
    lightboxViewport.addEventListener('pointerup', endLbPointer, { signal: __ahkhSignal });
    lightboxViewport.addEventListener('pointercancel', endLbPointer, { signal: __ahkhSignal });

    window.addEventListener('keydown', (e) => {
      if (!lightbox || lightbox.classList.contains('hidden')) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === '+' || e.key === '=') {
        zoomLightboxAt(lbScale * 1.25);
      } else if (e.key === '-' || e.key === '_') {
        zoomLightboxAt(lbScale / 1.25);
      } else if (e.key === '0') {
        zoomLightboxAt(LB_MIN_SCALE);
      } else if (e.key === 'ArrowRight') {
        stepLightbox(1);
      } else if (e.key === 'ArrowLeft') {
        stepLightbox(-1);
      }
    }, { signal: __ahkhSignal });

    applyLightboxTransform();
  }

  // Transcript view toggle (video lessons): formatted study version vs verbatim original
  const TRANSCRIPT_VIEW_KEY = 'ahkh_transcript_view';
  function paintTranscriptTabs(mode) {
    document.querySelectorAll('.transcript-tab').forEach((btn) => {
      const active = btn.getAttribute('data-transcript-view') === mode;
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
      btn.classList.toggle('bg-paper-200/90', active);
      btn.classList.toggle('dark:bg-dark-border/80', active);
      btn.classList.toggle('text-ink', active);
      btn.classList.toggle('dark:text-dark-ink', active);
      btn.classList.toggle('border-ink-border/80', active);
      btn.classList.toggle('dark:border-dark-border', active);
      btn.classList.toggle('text-ink-muted', !active);
      btn.classList.toggle('dark:text-dark-muted', !active);
    });
  }
  function setTranscriptView(mode, persist = true) {
    const formatted = document.getElementById('formatted-view');
    const original = document.getElementById('transcript-view');
    if (!formatted || !original) return;
    const showOriginal = mode === 'original';
    formatted.classList.toggle('hidden', showOriginal);
    original.classList.toggle('hidden', !showOriginal);
    paintTranscriptTabs(mode);
    if (persist) {
      try { AhkhStorage.set(TRANSCRIPT_VIEW_KEY, mode); } catch (e) {}
    }
    restoreHighlightsInDOM();
    repositionAllGutterNotes();
  }
  function initTranscriptToggle() {
    const tabs = document.querySelectorAll('.transcript-tab');
    if (!tabs.length) return;
    let saved = 'formatted';
    try { saved = AhkhStorage.get(TRANSCRIPT_VIEW_KEY) || 'formatted'; } catch (e) {}
    if (saved !== 'original' && saved !== 'formatted') saved = 'formatted';
    tabs.forEach((btn) => {
      if (btn.dataset.bound) return;
      btn.dataset.bound = 'true';
      btn.addEventListener('click', () => setTranscriptView(btn.getAttribute('data-transcript-view') || 'formatted'), { signal: __ahkhSignal });
    });
    setTranscriptView(saved, false);
  }

  // Completion Toggle Controller
  function updateCompletionButton(isCompleted) {
    const btn = document.getElementById('toggle-lesson-completed-btn');
    const icon = document.getElementById('lesson-completed-icon');
    const label = document.getElementById('lesson-completed-label');
    if (!btn || !icon || !label) return;

    if (isCompleted) {
      icon.className = 'flex items-center text-emerald-600 dark:text-emerald-400';
      icon.innerHTML = `
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `;
      label.textContent = 'Completed';
    } else {
      icon.className = 'flex items-center text-ink-muted dark:text-dark-muted';
      icon.innerHTML = `
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
      `;
      label.textContent = 'Mark as complete';
    }
  }

  function initCompletionToggle() {
    const btn = document.getElementById('toggle-lesson-completed-btn');
    if (!btn) return;

    if (!btn.dataset.initialized) {
      btn.dataset.initialized = 'true';
      btn.addEventListener('click', () => {
        const readKey = `ahkh_read_${courseId}_${lessonSlug}`;
        const isCurrentlyRead = AhkhStorage.get(readKey) !== null;
        if (isCurrentlyRead) {
          try { AhkhStorage.remove(readKey); } catch (e) {}
          updateCompletionButton(false);
          updateLessonStatusUI();
        } else {
          try { AhkhStorage.set(readKey, new Date().toISOString()); } catch (e) {}
          updateCompletionButton(true);
          updateLessonStatusUI();
          if (progressFill) progressFill.style.width = '100%';
        }
      }, { signal: __ahkhSignal });
    }

    const isRead = AhkhStorage.get(`ahkh_read_${courseId}_${lessonSlug}`) !== null;
    updateCompletionButton(isRead);
  }

  // Document Outline Scrollspy & Mobile Drawer Handling
  function initOutlineScrollspy() {
    const outlineLinks = Array.from(document.querySelectorAll('#left-sidebar nav a[href^="#"]'));
    if (!outlineLinks.length) return;

    outlineLinks.forEach((link) => {
      if (!link.dataset.drawerBound) {
        link.dataset.drawerBound = 'true';
        link.addEventListener('click', () => {
          closeMobileDrawers();
        }, { signal: __ahkhSignal });
      }
    });

    const headings = outlineLinks
      .map((a) => {
        const id = a.getAttribute('href')?.slice(1);
        return id ? document.getElementById(id) : null;
      })
      .filter(Boolean);

    if (!headings.length) return;

    function updateActiveHeading() {
      const topOffset = 120;
      let activeHeadingId = null;

      for (const h of headings) {
        const rect = h.getBoundingClientRect();
        if (rect.top <= topOffset) {
          activeHeadingId = h.id;
        } else {
          break;
        }
      }

      if (!activeHeadingId && headings.length > 0) {
        activeHeadingId = headings[0].id;
      }

      outlineLinks.forEach((link) => {
        const targetId = link.getAttribute('href')?.slice(1);
        const isActive = targetId === activeHeadingId;
        if (isActive) {
          link.classList.add('text-ink', 'dark:text-dark-ink', 'border-ink', 'dark:border-dark-ink', 'bg-paper-100', 'dark:bg-dark-surface', 'font-medium');
          link.classList.remove('text-ink/70', 'dark:text-dark-ink/70', 'border-transparent');
        } else {
          link.classList.remove('text-ink', 'dark:text-dark-ink', 'border-ink', 'dark:border-dark-ink', 'bg-paper-100', 'dark:bg-dark-surface');
          link.classList.add('text-ink/70', 'dark:text-dark-ink/70', 'border-transparent');
        }
      });
    }

    if (!window.__ahkhOutlineSpyBound) {
      window.__ahkhOutlineSpyBound = true;
      window.addEventListener('scroll', updateActiveHeading, { passive: true, signal: __ahkhSignal });
    }
    updateActiveHeading();
  }

  // Initialize UI on load
  function initLesson() {
    // Clean up legacy cached defaults from previous sessions
    const legacyFont = AhkhStorage.get('ahkh_reader_font_family');
    if (!legacyFont || legacyFont === 'source-serif' || legacyFont === 'newsreader' || legacyFont === 'serif') {
      AhkhStorage.set('ahkh_reader_font_family', 'merriweather');
    }

    // Restore saved reading typography preferences
    const savedSize = AhkhStorage.get('ahkh_reader_font_size') || 'base';
    const savedFamily = AhkhStorage.get('ahkh_reader_font_family') || 'merriweather';
    const savedMeasure = AhkhStorage.get('ahkh_reader_measure') || 'standard';
    const savedTheme = AhkhStorage.get('ahkh_theme') || (document.documentElement.classList.contains('dark') ? 'dark' : 'light');

    applyFontSize(savedSize, false);
    applyFontFamily(savedFamily, false);
    applyReadingMeasure(savedMeasure, false);
    applyTheme(null, false);

    // Prevent animation flicker on initial mount or page transition
    const studyDesk = document.getElementById('study-desk');
    studyDesk?.classList.add('desk-initial-mount');

    // Restore desktop sidebar collapsed states
    if (window.innerWidth >= 768 && AhkhStorage.get('ahkh_left_sidebar_collapsed') === 'true') {
      leftSidebar?.setAttribute('data-collapsed', 'true');
    }
    if (window.innerWidth >= 1024 && AhkhStorage.get('ahkh_right_sidebar_collapsed') === 'true') {
      rightSidebar?.setAttribute('data-collapsed', 'true');
      document.body.setAttribute('data-right-collapsed', 'true');
    }
    updateSidebarButtons();
    try { AhkhStorage.set(`ahkh_opened_${courseId}_${lessonSlug}`, new Date().toISOString()); } catch (e) {}

    // Wire up Start Reading buttons
    const startBtn = document.getElementById('start-reading-btn');
    if (startBtn && !startBtn.dataset.initialized) {
      startBtn.dataset.initialized = 'true';
      startBtn.addEventListener('click', startReading, { signal: __ahkhSignal });
    }
    const toastStartBtn = document.getElementById('toast-start-reading-btn');
    if (toastStartBtn && !toastStartBtn.dataset.initialized) {
      toastStartBtn.dataset.initialized = 'true';
      toastStartBtn.addEventListener('click', startReading, { signal: __ahkhSignal });
    }

    // Initial status UI & scroll restoration
    updateLessonStatusUI();
    restoreSavedScrollPosition();

    // Re-enable smooth transitions on the next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        studyDesk?.classList.remove('desk-initial-mount');
      });
    });

    updateHeaderCount();
    renderSidebarHighlights();
    restoreHighlightsInDOM();
    initCompletionToggle();
    initOutlineScrollspy();

    // If deep-linked directly to a saved highlight anchor (#hl_...), scroll smoothly and pulse
    if (window.location.hash && window.location.hash.startsWith('#hl_')) {
      const targetId = window.location.hash.slice(1);
      setTimeout(() => {
        if (typeof window.jumpToHighlight === 'function') {
          window.jumpToHighlight(targetId);
        }
      }, 150);
    }

    if (!window.__ahkhHashChangeBound) {
      window.__ahkhHashChangeBound = true;
      window.addEventListener('hashchange', () => {
        if (window.location.hash && window.location.hash.startsWith('#hl_')) {
          const targetId = window.location.hash.slice(1);
          if (typeof window.jumpToHighlight === 'function') {
            window.jumpToHighlight(targetId);
          }
        }
      }, { signal: __ahkhSignal });
    }

    initYouTubeSync();
    initStickyVideo();
    initTranscriptToggle();
    initHlSwatches();
    initImageLightbox();
  }

  initLesson();
};

/* Session-persistent navigation teardown (ADR-027 / Milestone M3) */
if (!window.__ahkhReaderSwapBound) {
  window.__ahkhReaderSwapBound = true;
  document.addEventListener('astro:before-swap', () => {
    try {
      if (window.__ahkhReaderAbort) {
        window.__ahkhReaderAbort.abort();
        window.__ahkhReaderAbort = null;
      }
    } catch (e) {}

    try {
      if (window.__ahkhYtPlayer && typeof window.__ahkhYtPlayer.destroy === 'function') {
        window.__ahkhYtPlayer.destroy();
      }
    } catch (e) {}
    window.__ahkhYtPlayer = null;

    if (window.__ahkhYtTimer) {
      try { clearInterval(window.__ahkhYtTimer); } catch (e) {}
    }
    window.__ahkhYtTimer = null;

    if (window.__ahkhVideoObserver) {
      try { window.__ahkhVideoObserver.disconnect(); } catch (e) {}
    }
    window.__ahkhVideoObserver = null;

    window.__ahkhOutlineSpyBound = false;
    window.__ahkhHashChangeBound = false;

    var desk = document.getElementById('study-desk');
    if (desk) {
      delete desk.dataset.ahkhBooted;
      if (typeof desk.removeAttribute === 'function') {
        desk.removeAttribute('data-ahkh-booted');
      }
    }
  });
}

// Session-persistent navigation boot (module scope: the library file loads
// once per session, so this listener is registered exactly once and is never
// aborted). Fires on cold load and after every ClientRouter navigation;
// same-document re-fires are absorbed by the desk boot stamp inside boot.
document.addEventListener('astro:page-load', () => {
  try {
    var desk = document.getElementById('study-desk');
    if (desk && window.__ahkhBootReader) window.__ahkhBootReader(Object.assign({}, desk.dataset));
  } catch (e) {}
});

// Fallback self-boot check: if #study-desk is present in DOM upon script evaluation
// and not yet booted, immediately boot the reader. Eliminates dynamic script load race condition.
try {
  var desk = document.getElementById('study-desk');
  if (desk && !desk.dataset.ahkhBooted && typeof window.__ahkhBootReader === 'function') {
    window.__ahkhBootReader(Object.assign({}, desk.dataset));
  }
} catch (e) {}
