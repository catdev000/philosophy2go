<script setup>
    import DefaultTheme from 'vitepress/theme'
    import BackButton from './BackButton.vue'
    const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-before>
      <BackButton />
    </template>
  </Layout>
</template>