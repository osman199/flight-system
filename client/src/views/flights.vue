<template>
  <b-container>
    <div>
      <h5 v-if="flightExists">Flight Already Exists</h5>
      <h2 class="h4 text-center mb-4">Post flights here</h2>
      <form @submit="createflights">
        <div class="form-element">
          <label for="defaultFormRegisterNameEx" class="grey-text"
            >AirPort</label
          >
          <input
            type="text"
            id="defaultFormRegisterNameEx"
            v-model="airport"
            class="form-control"
            required
          />
        </div>
        <div class="form-element">
          <label for="defaultFormRegisterFNumberEx" class="grey-text"
            >Flight Number</label
          >
          <input
            type="number"
            id="defaultFormRegisterEmailEx"
            v-model="flight_number"
            class="form-control"
            required
          />
        </div>
        <div class="form-element">
          <label for="defaultFormRegisterDepaEx" class="grey-text">From</label>
          <input
            type="text"
            id="defaultFormRegisterNameEx"
            v-model="departure"
            class="form-control"
            required
          />
        </div>
        <div class="form-element">
          <label for="defaultFormRegisterDestEx" class="grey-text">To</label>
          <input
            type="text"
            id="defaultFormRegisterDestEx"
            v-model="destination"
            class="form-control"
            required
          />
        </div>
        <div class="form-element">
          <label for="date">Choose a date</label>
          <input
            type="date"
            id="date"
            name="date"
            v-model="departure_time"
            min="2018-01-01"
            max="2020-12-31"
            required
          />
        </div>
          <button id="button"  type="submit">Post</button>
      </form>

    </div>
  </b-container>
</template>
<script>
import { Api } from '@/Api'
// import FlightItems from '@/components/FlightItems.vue'
export default {
  name: 'flights',
  components: {
    // FlightItems
  },
  data() {
    return {
      flight_number: 0,
      departure: '',
      airport: '',
      destination: '',
      departure_time: '',
      flightExists: false
    }
  },
  methods: {
    createflights(event) {
      event.preventDefault()
      console.log('here')
      var flight = {
        flight_number: this.flight_number,
        departure: this.departure,
        airport: this.airport,
        departure_time: this.departure_time,
        destination: this.destination
      }
      console.log(flight)
      Api.post('/flights', flight)
        .then((response) => {
          if (response.data.FlightExist) {
            this.flightExists = true
          }
        })
        .catch((error) => {
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
.blue {
  color: aliceblue;
}
h5 {
  color: red;
}
h2 {
  margin-top: 1em;
}
label {
  text-align: left;
}
#button {
  background-color: #e7e7e7;
  color: black;
  font-size: 16px;
  padding: 14px 30px;
  margin: 1em 8em;
}
@media screen and (max-width: 760px) {
  form {
    padding: 10px;
    margin: .1em .2em;
  }
  #button {
    padding: 8px 15px;
    font-size: 12px;
    text-align: center;
  }
  .form-element {
    margin: .1em;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
}
</style>
