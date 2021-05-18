<template>
  <div>
      <h1>Login Page</h1>
    <form @submit.prevent="submit">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="email"
        />
        <small id="emailHelp" class="form-text text-muted"
          >We'll never share your email with anyone else.</small
        >
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          v-model="password"
        />
      </div>
      <div class="unauth">
        <strong>{{message}}</strong>
      </div>
      <button type="submit" id="button">LOGIN</button>
    </form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  namespace: true,
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      message: ''
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated'
    })
  },
  methods: {
    ...mapActions({
      login: 'auth/login'
    }),
    submit() {
      this.login({ email: this.email, password: this.password })
        .then(() => {
          if (this.authenticated) {
            this.$router.replace({ name: 'home' })
          } else {
            this.message = 'Wrong Password or email'
          }
        })
    }
  }
}
</script>
<style scoped>
div {
  background-color: lightgrey;
}
form {
  margin: 1em 2em 0;
}
.form-element {
  width: 40%;
}
h1 {
  padding: 1em;
}
label {
  width: 40%;
}
.unauth {
  color: red;
}
@media screen and (max-width: 760px) {
  form {
    margin: 1em 1em 0;
  }
  #button {
    border-color: black;
    margin-bottom: 2em;
    background-color: blue;
  }
}
</style>
