<template>
<div>
  <form @submit="postReview">
      <div id="form-element">
        <label for="rating">Rating</label>
        <b-form-rating name="rating" id="rating" v-model="rating" placeholder="Enter Rating"></b-form-rating>
      </div>
      <div id="form-element">
        <label for="text">Review</label>
        <textarea name="text" id="text" v-model="text" placeholder="Enter Review"></textarea>
      </div>
      <div id="form-element">
        <label for="submit"></label>
        <button name="submit" id="submit" class="btn btn-primary">Submit</button>
      </div>
  </form>
</div>
</template>
<script>
import { Api } from '@/Api'
import { mapGetters } from 'vuex'
export default {
  name: 'write-review',
  data() {
    return {
      rating: null,
      text: ''
    }
  },
  computed: {
    ...mapGetters({
      account: 'auth/account'
    })
  },
  methods: {
    postReview(event) {
      var accountID = this.account._id
      event.preventDefault()
      var token = localStorage.getItem('token')
      var review = {
        text: this.text,
        rating: this.rating,
        token
      }
      Api.post(`/accounts/${accountID}/reviews`, review)
        .then(response => {
          alert('Review Created')
          this.$router.replace({ name: 'my-reviews' })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
<style scoped>
form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: lightgrey;
    border: lightpink;
    border-radius: 5%;
    margin: 1em 6em 0;
    padding: 0 1em 1em;
}
div {
    display: flex;
    flex-direction: column;
}
b-form-rating {
    background-color: black;
}
@media screen and (max-width: 760px) {
  form {
    display: inline;
  }
  #button {
    border-color: black;
    margin-bottom: 2em;
    background-color: blue;
  }
}
</style>
