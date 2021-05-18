<template>
<div id="form-container">
    <form @submit="search">
        <h2 class="h4 text-center mb-4">Search For Flights</h2>
        <div class="form-element">
            <label for="from" class="grey-text">FLYING FROM</label>
            <input type="country" id="from" v-model="departure" class="form-control"/>
        </div>
        <div class="form-element">
            <label for="destination" class="grey-text">FLYING TO:</label>
            <input type="country" id="destination" v-model="destination" class="form-control"/>
        </div>
        <div class="form-element">
            <label for="date">Choose a date</label>
            <input type="date" id="date" name="date"
                v-model="departure_time"
                min="2018-01-01" max="2020-12-31" />
        </div>
        <div class="button">
            <button class="btn btn-unique" type="submit">Search</button>
        </div>
    </form>
</div>
</template>
<script>
import { Api } from '@/Api'
export default {
  name: 'browse',
  data() {
    return {
      status: false,
      departure: '',
      destination: '',
      departure_time: ''
    }
  },
  methods: {
    search() {
      Api.get('/api/flights/search')
    }
  }
}
</script>
<style scoped>
#form-container {
    background-color: lightgrey;
}
form {
    padding-bottom: 2em;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

button {
    background-color: mediumblue;
    display: flexbox;
    color: white;
}
h2 {
    margin-top: 1em;
}
.form-element {
    display: flex;
    flex-direction: column;
    justify-content: space-between  ;
    text-align: left;
    margin: .3em 0 2em .3em;
    margin-left: 2em;
}
.date {
    width: 20px;
}
input{
    width: 70%;
}
</style>
