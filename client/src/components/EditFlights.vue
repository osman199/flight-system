
<template>
    <div class="edit-flight">
        <button style="margin-top: 1em;" @click=" deletflight()">ClearAll</button>
        <div class="card" v-for="flight in flights" v-bind:key="flight._id">
          <div class="flight-content">
            <td><button style="background-color: red;" v-on:click="deleteFlight(flight._id)">Delete</button></td>
            <p>FlightNR: {{flight.flight_number}}</p>
            <p>Airport: {{flight.airport}}</p>
            <p>Departure: {{flight.departure}}</p>
            <p>Destination: {{flight.destination.split('T')[0]}}</p>
            <p>Time: {{flight.departure_time}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import { Api } from '@/Api'
import Flights from '@/views/flights.vue'

export default {
  component: Flights,
  data() {
    return {
      flights: []
    }
  },
  mounted: function () {
    this.flights = Api.get('/flights')
      .then(response => {
        this.flights = response.data.flights
      })
      .catch(error => {
        this.flights = error
      })
  },
  methods: {
    getMessage() {
      Api.get('/flights')
        .then(response => {
          console.log(response.data.flights)
          this.flights = response.data.flights
        })
        .catch(error => {
          this.flights = error
        })
    },
    deleteFlight(id) {
      Api.delete(`/flights/${id}`)
        .then(response => {
          console.log(response)
          const index = this.flights.findIndex(flight => flight._id === id)
          this.flights.splice(index, 1)
        })
        .catch((error) => {
          console.error(error)
        })
    },
    deletflight() {
      this.flights = Api.delete('/flights/')
        .then(response => {
          this.flights = {}
        })
        .catch((error) => {
          console.error(error)
        })
    },
    PutFlights(status) {
      Api.putflightById('/flights')
      var data = {
        airport: this.flights.airport,
        flight_number: this.flights.flight_number,
        departuer: this.flights.departure,
        destination: this.flights.destnation,
        date: this.flights.date,
        updated: true

      }
      console.log(data)
        .then(response => {
          this.flights.updated = true
          console.log(response.data)
        })
        .catch(error => {
          console.error(error)
        })
    }

  }
}
</script>
<style lang="css">
.flight-card {
    display: flex;
    flex-direction: column;
}
 .card {
    height: 300px;
    margin: .5em;
    background-position: center;
    background-size: cover;
    text-align: center;
  }
.card-content {
    padding-top: 50px;
    position: absolute;
    color: #FFF;
    background-color: rgba(0, 0, 0, 0.35);
    top: 0;
    padding: 10px;
    width: 100%;
  }
p {
  margin-top: 10px;
}
</style>
