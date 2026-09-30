<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    const allPages = [
        'existentialism',
        'phenomenology',
        'aristotelianism',
        'absurdism'
    ]
    const randomPage = '/philosophy2go/' + allPages[Math.floor(Math.random() * allPages.length)] + '.html'
    location.replace(randomPage)
})
</script>
