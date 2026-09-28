<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    const allPages = [
        'existentialism',
        'phenomenology',
        'aristotelianism',
        'absurdism'
    ]
    const randomPage = '/' + allPages[Math.floor(Math.random() * allPages.length)] + '.html'
    location.replace(randomPage)
})
</script>
