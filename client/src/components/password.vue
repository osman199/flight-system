<template>
<div>
    <form @submit.prevent="changePassword">
        <h2>Change Password</h2>
        <div class="form-element">
            <label for="password">Currnet Password</label>
            <input type="password" name="password" v-model="password">
        </div>
        <div class="form-element">
            <label for="newPassword">New Password</label>
            <input type="password" name="newPassword" v-model="newPassword">
        </div>
        <button type="submit">Change</button>
    </form>
</div>
</template>
<script>
import { Api } from '@/Api'
export default {
  data() {
    return {
      password: '',
      newPassword: ''
    }
  },
  methods: {
    changePassword() {
      var accountID = localStorage.getItem('accountID')
      Api.put(`/accounts/${accountID}`, { password: this.password, newPassword: this.newPassword })
        .then(response => {
          console.log(response)
          this.$router.replace({ name: 'home' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
