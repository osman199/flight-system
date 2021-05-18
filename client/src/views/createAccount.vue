<template>
  <div>
    <h2>Sign up</h2>
    <h5 v-if="accountExists">This account already exists with this Email</h5>
    <form @submit="createAccount">
    <div class="form-element">
      <label for="defaultFormRegisterNameEx">Your name</label>
      <input type="text" id="defaultFormRegisterNameEx" v-model="name" class="form-control"/>
    </div>
    <div class="form-element">
      <label for="defaultFormRegisterEmailEx">Your email</label>
      <input type="email" id="defaultFormRegisterEmailEx" v-model="email" class="form-control"/>
    </div>
    <div class="form-element">
      <label for="defaultFormRegisterConfirmEx">Confirm your email</label>
      <input type="email" id="defaultFormRegisterConfirmEx" class="form-control"/>
    </div>
    <div class="form-element">
      <label for="defaultFormRegisterPasswordEx">Your password</label>
      <input type="password" id="defaultFormRegisterPasswordEx" v-model="password" class="form-control"/>
    </div>
    <div id="moderator" class="form-element">
      <label for="checkbox">Are you a moderator: </label>
      <input type="checkbox" id="checkbox" v-model="authorised">
    </div>
    <div class="form-element" id="button">
      <button class="btn" type="submit">Register</button>
    </div>
  </form>
  </div>

</template>

<script>
import { Api } from '../Api'
export default {
  name: 'create-account',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      authorised: false,
      accountExists: false
    }
  },
  methods: {
    createAccount(event) {
      event.preventDefault()
      var account = {
        name: this.name,
        email: this.email,
        password: this.password,
        authorised: this.authorised
      }
      Api.post('/accounts', account)
        .then(response => {
          this.accountExists = response.data.accountExists
          if (!response.data.accountExists) {
            this.$router.replace({ name: 'home' })
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
h5 {
  color: red;
}
h2 {
    color: black;
    margin-top: 1em;
}
form {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  background-color: lightgrey;
  margin: 2em 10em;
  padding-bottom: 2em;
  border-radius: 3%;
}
.form-element {
  margin: 1em .8em;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

#button {
  background-color: white;
  width: 50%;
  margin: auto;
}
@media screen and (max-width: 760px) {
  form {
    margin: 1em 1em 0;
    background-color: lightgrey;
  }
  #button {
    border-color: black;
  }
  #moderator {
    text-align: center;
  }
}
#moderator {
  display: inline;
}
</style>
