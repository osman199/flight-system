<template>
    <div class="reviews container">
        <h3>
            Review:
        </h3>
        <div class="list">
            <ReviewCard />
        </div>
    </div>
</template>
<script>
import ReviewCard from '@/components/ReviewCard.vue'
export default {
  name: 'ReviewList',
  components: {
    ReviewCard
  }
}
</script>
<style scoped>
.reviews {
    margin-top: 100px;
    text-align: center;
    padding: 4em;
}
</style>
