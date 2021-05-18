<template>
<div  class="card-holder">
  <div class="card" v-for="review in reviews" v-bind:key="review._id">
    <p>{{review.text}}</p>{{review.rating}}
    <vue-stars :readonly="true" :value="review.rating"></vue-stars>
  </div>
</div>
</template>
<script>
import { Api } from '@/Api'
import { mapGetters } from 'vuex'
import { VueStars } from 'vue-stars'
export default {
  name: 'my-reviews',
  components: {
    VueStars
  },
  data() {
    return {
      reviews: []
    }
  },
  computed: {
    ...mapGetters({
      account: 'auth/account'
    })
  },
  mounted: function () {
    var accountID = localStorage.getItem('accountID')
    Api.get(`/accounts/${accountID}/reviews`)
      .then(response => {
        this.reviews = response.data.reviews
        console.log(response.data.review)
      })
      .catch(error => {
        this.reviews = error
      })
  }
}
</script>
<style scoped>
.card-holder {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 2;
}
.card-holder:nth-child(even) {
  background-color: lightgrey;
  color: black;
}
.card {
  margin: 15px;
  text-align: center;
  width: calc((100% / 3) - 30px);
  transition: all 0.2s ease-in-out;
}
p {
  text-align: center;
}
@media screen and (max-width: 750px) {
  .card-holder {
    display: flexbox;
  }
  .card {
    flex: 50%;
    padding: 10px;
    height: 150px;
  }
}
</style>
