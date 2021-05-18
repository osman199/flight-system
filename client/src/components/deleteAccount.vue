<template>
<div>
    <form @submit="deleteAccount">
        <div>
            <p><strong>Warning:</strong> account will be Deleted</p>
        </div>
        <button type="submit"><strong>DELETE</strong></button>
    </form>
</div>
</template>
<script>
import { Api } from '../Api'
import { mapActions } from 'vuex'
export default {
  methods: {
    deleteAccount(event) {
      event.preventDefault()
      var accountID = localStorage.getItem('accountID')
      Api.delete(`accounts/${accountID}`)
        .then(() => {
          this.signoutAction().then(() => {
            this.$router.replace({
              name: 'home'
            })
            alert('Deleted')
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    ...mapActions({
      signoutAction: 'auth/signout'
    })
  }
}
</script>
<style scoped>
input {
    text-align: center;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: space-between 26px;
  background-color: lightgrey;
  margin: 2em 10em;
  padding-bottom: 2em;
  border-radius: 3%;
  width: 50%;
}
button {
    color: white;
    background-color: red;
}
</style>
