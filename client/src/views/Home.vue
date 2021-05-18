<template>
  <div>
    <Browse/>
    <ReviewList />
    <Footer/>
    <FlightItems/>
  </div>
</template>
<script>
// @ is an alias to /src
import { Api } from '@/Api'
import Browse from '@/components/browseFlights.vue'
import ReviewList from '@/components/ReviewList.vue'
import FlightItems from '@/components/FlightItems.vue'
export default {
  name: 'home',
  components: {
    Browse,
    ReviewList,
    FlightItems
  },
  data() {
    return {
      message: 'none'
    }
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
