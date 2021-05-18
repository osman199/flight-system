<template>
    <div class="review-card">
        <div class="card" v-for="review in reviews" v-bind:key="review._id">
            <div class="card-content">
                <p>Written by: {{review.username}}</p>
                <p>{{review.text}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import { Api } from '@/Api'
export default {
  data() {
    return {
      reviews: []
    }
  },
  mounted: function () {
    this.reviews = Api.get('/reviews')
      .then(response => {
        this.reviews = response.data.reviews
      })
      .catch(error => {
        this.reviews = error
      })
  }
}
</script>
<style lang="css">
.review-card {
    display: flex;
    flex-direction: column;
}
 .card {
    height: 100px;
    margin: .5em;
    background-position: center;
    background-size: cover;
    text-align: center;
  }
.card-content {
    padding-top: 50px;
    position: absolute;
    color: #FFF;
    background-color: rgba(0, 0, 0, 0.35);
    top: 0;
    padding: 10px;
    width: 100%;
  }
p {
  margin-top: 10px;
}
</style>
