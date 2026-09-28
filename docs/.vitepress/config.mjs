import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Philosophy2Go",
  description: "",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/catdev000/philosophy2go' }
    ]
  },
  markdown: {
    container: {
      customContainers: {
        article: '',
        question: '',
        overviewheadingpage: '',
        overviewpage: ''
      }
    }
  }
})
