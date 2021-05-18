<template>
  <div id="nav">
    <b-navbar toggleable="lg" type="dark" variant="dark" >
      <b-navbar-brand href="/">AG25 Flight Service</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item id="nav-item" href="/">Browse For Flights</b-nav-item>
        <b-nav-item id="nav-item" href='create-account' v-if="!authenticated">Create Account</b-nav-item>
        <b-nav-item id="nav-item" href='login' v-if="!authenticated">Sign in</b-nav-item>
        <!-- Navbar dropdowns -->
        <b-nav-item-dropdown text="Acount options" v-if="authenticated && !moderator" right>
          <b-dropdown-item href="/write-review">Write Review</b-dropdown-item>
          <b-dropdown-item href="my-reviews">View my Reviews</b-dropdown-item>
          <b-dropdown-item href="change-password">Change password</b-dropdown-item>
          <b-dropdown-item href="delete">Delete Account</b-dropdown-item>
          <b-dropdown-item href="#" @click.prevent="signout">Log Out</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown text="Moderator" v-if="moderator" right>
          <b-dropdown-item href="/flights">Create Flights</b-dropdown-item>
          <b-dropdown-item href="/edit-flights">Edit Flights</b-dropdown-item>
          <b-dropdown-item href="#" @click.prevent="signout">Log Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'navbar',
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      account: 'auth/account',
      moderator: 'auth/moderator'
    })
  },
  methods: {
    ...mapActions({
      signoutAction: 'auth/signout'
    }),
    signout() {
      this.signoutAction().then(() => {
        if (!(this.$router.history.current.name === 'home')) {
          this.$router.replace({
            name: 'home'
          })
        }
      })
    }
  }
}
</script>
