import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import BackButton from './BackButton.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(BackButton),
    }),
  enhanceApp({ app, router }) {
    if (!import.meta.env.SSR) {
      addMutationObserverScrollReveal(router)
    }
  },
}

function addMutationObserverScrollReveal(router) {
  let sectionObserver = null;
  let pendingObserver = null;
  let rafId = 0;

  const REVEAL_SELECTOR = 'h2, h3, p, details';

  const init = () => {
    const doc = document.querySelector('.vp-doc');
    if (!doc) return;

    const sections = doc.querySelectorAll(REVEAL_SELECTOR);
    if (!sections.length) return;

    sectionObserver?.disconnect();

    sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          e.target.classList.toggle('in-view', e.isIntersecting)
        })
      },
      { threshold: 0.1 }
    )

    sections.forEach((s) => {
      const rect = s.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        s.classList.add('in-view');
      } else {
        s.classList.add('reveal');
      }
      sectionObserver.observe(s)
    })
  }

  const waitForContent = () => {
    pendingObserver?.disconnect()
    pendingObserver = null
    cancelAnimationFrame(rafId)

    const check = () =>
      !!document.querySelector(`.vp-doc ${REVEAL_SELECTOR}`)

    if (check()) {
      init()
      return
    }

    pendingObserver = new MutationObserver(() => {
      if (check()) {
        pendingObserver.disconnect()
        pendingObserver = null
        init()
      }
    })

    pendingObserver.observe(document.body, { childList: true, subtree: true })
  }

  const prevAfterRouteChange = router.onAfterRouteChange
  router.onAfterRouteChange = async (to) => {
    await prevAfterRouteChange?.(to)
    rafId = requestAnimationFrame(waitForContent)
  }

  waitForContent()
}