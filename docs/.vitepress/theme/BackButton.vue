<script setup>
    import { computed } from 'vue'
    import { useData, useRouter } from 'vitepress'

    const { page } = useData()
    const router = useRouter()

    const isHome = computed(() =>
        /(^|\/)index\.md$/.test(page.value.relativePath || '')
    )

    function goBack() {
        history.back()
    }
</script>

<template>
    <button
        v-if="!isHome"
        class="vp-back-button"
        type="button"
        aria-label="Go back to the previous page"
        @click="goBack"
    >
    ← Back
  </button>
</template>

<style scoped>
    .vp-back-button {
        display: inline-flex;
        align-items: center;
        margin-bottom: 5px;
        padding: 4px 12px;
        font-size: 14px;
        line-height: 24px;
        color: var(--vp-c-text-2);
        background: transparent;
        border: 1px solid var(--vp-c-divider);
        border-radius: 6px;
        cursor: pointer;
        transition: color 0.2s, border-color 0.2s;
    }
    .vp-back-button:hover {
        color: var(--vp-c-brand-1);
        border-color: var(--vp-c-brand-1);
    }

    @media (min-width: 768px) {
        .vp-back-button {
            display: none;
        }
    }

    @media (max-width: 767.98px) {
        .vp-back-button {
            display: inline-flex;
        }
    }
</style>