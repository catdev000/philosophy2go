<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    const allPages = [
        //'aristotelianism',
        'daoism',
        'existentialism',
        'overton-window',
        //'phenomenology',
        'stoicism'
    ]
    const randomPage = '/philosophy2go/' + allPages[Math.floor(Math.random() * allPages.length)] + '.html'
    location.replace(randomPage)
})
</script>
