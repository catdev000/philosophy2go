import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout),
  enhanceApp({ app, router }) {
    if (!import.meta.env.SSR) {
      addMutationObserverScrollReveal(router);
    }
  }
}

function addMutationObserverScrollReveal(router) {
  let currentObserver = null

  const init = () => {
    const doc = document.querySelector('.vp-doc')
    if (!doc) return

    const sections = doc.querySelectorAll('h2, h3, p, details')
    if (!sections.length) return

    // Disconnect previous observer
    currentObserver?.disconnect()

    currentObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          e.target.classList.toggle('in-view', e.isIntersecting)
        })
      },
      { threshold: 0.1 }
    )

    sections.forEach((s) => {
      const rect = s.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        s.classList.add('in-view')
      }
      currentObserver.observe(s)
    })
  }

  const waitForContent = () => {
    const check = () => {
      const doc = document.querySelector('.vp-doc')
      if (doc?.querySelector('h2, h3, p, details')) {
        return true
      }
      return false
    }

    if (check()) {
      init()
      return
    }

    const observer = new MutationObserver(() => {
      if (check()) {
        observer.disconnect()
        init()
      }
    })

    observer.observe(document.body, { childList: true, subtree: true })
  }   

  router.onAfterRouteChange = waitForContent
  waitForContent()
}