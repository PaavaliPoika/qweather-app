<template>
  <q-page class="flex column" :class="bgClass">
  <!-- SearshBar -->
    <div class="col q-pt-lg q-px-md text-white">
     <q-input
        @keyup.enter="getWeatherBySearch"
        bottom-slots
        v-model="search"
        placeholder="Search"
        dark
        borderless>
        <template v-slot:before>
         <q-icon
          @click="getLocation"
          name="my_location" />
        </template>
        <template v-slot:append>
          <q-btn
            @click="getWeatherBySearch"
            round
            dense
            flat
            icon="search" />
        </template>
      </q-input>
    </div>
    <!-- end SearshBar -->
    <template v-if="weatherData">
      <div class="col text-white text-center">
        <!-- CityName -->
        <div class="text-h4 text-weight-light">
          {{weatherData.name}} ({{weatherData.sys.country}})
        </div>
        <!-- end CityName -->
        <!-- Weather -->
        <div class="text-h6 text-weight-light">
          {{weatherData.weather[0].main}}
        </div>
        <!-- end Weather -->
        <!-- Icon -->
        <div class="col text-center">
          <img :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`" alt="Icon">
        </div>
        <!-- end Icon -->
        <!-- Main Temp -->
        <div class="text-h1 text-weight-thin q-my-lg relative-position">
          <span>{{Math.round(weatherData.main.temp)}}</span> <span class="text-h4 relative-position degree">&deg;C</span>
        </div>
        <!-- end Main Temp -->
        <!-- add Info -->
        <div class="row q-mx-lg justify-center">
          <div class="q-px-md ">
            <q-chip outline color="white" text-color="white" class="q-pa-md text-weight-thin" icon="fas fa-thermometer-three-quarters">
                <span>&nbsp;Real fell:&nbsp;{{Math.round(weatherData.main.feels_like)}}</span><span>&nbsp;&deg;</span>
            </q-chip>
          </div>
          <div class="q-px-md ">
            <q-chip outline color="white" text-color="white" class="q-pa-md text-weight-thin" icon="fas fa-tachometer-alt">
               <span>&nbsp;Humidity:&nbsp;{{weatherData.main.humidity}}</span><span>&nbsp;%</span>
            </q-chip>
          </div>
        </div>
        <div class="row q-mx-lg justify-center">
          <div class="q-px-md items-center">
            <q-chip outline color="white" text-color="white" class="q-pa-md text-weight-thin" icon="fas fa-compress-arrows-alt">
               <span>&nbsp;Pressure:&nbsp;{{Math.round(weatherData.main.pressure*0.75)}}</span><span>&nbsp;mmHg</span>
            </q-chip>
          </div>
          <div class="q-px-md items-center">
            <q-chip outline color="white" text-color="white" class="q-pa-md text-weight-thin" icon="fas fa-wind">
               <span>&nbsp;Wind:&nbsp;{{weatherData.wind.speed}}</span><span>&nbsp;m/sec</span>
            </q-chip>
          </div>
        </div>
      <div class="row q-mx-lg justify-center">
        <div class="q-px-md items-center">
          <q-chip outline color="white" text-color="white" class="q-pa-md text-weight-thin" icon="fab fa-cloudscale">
              <span>&nbsp;Cloudiness:&nbsp;{{weatherData.clouds.all}}</span><span>&nbsp;%</span>
          </q-chip>
        </div>
        <div class="q-px-md items-center">
          <q-chip outline color="white" text-color="white" class="q-pa-md text-weight-thin" icon="far fa-eye">
              <span>&nbsp;Visibility:&nbsp;{{weatherData.visibility}}</span><span>&nbsp;m</span>
          </q-chip>
          </div>
        </div>
      </div>
      <!-- end add Info -->
    </template>
    <template v-else>
      <div class="col column text-white text-center">
        <div class="col text-h2 text-weight-thin">
          Yours <br> QWeather
        </div>
        <q-btn
          @click="getLocation"
          left
          color="col"
          flat>
          <q-icon
            left
            size="3em"
            name="my_location" />
          <div>Finde my location</div>
        </q-btn>
      </div>
    </template>
    <div class="col city"></div>
  </q-page>
</template>

<script>
import { date } from 'quasar'
export default {
  name: 'PageIndex',
  data () {
    return {
      search: '',
      weatherData: null,
      lat: null,
      lon: null,
      apiUrl: 'https://api.openweathermap.org/data/2.5/weather',
      apiKey: 'da5eff0e906777ae0f20e2e0354a9793',
      timeStamp: Date.now(),
      getUnits: true 
    }
  },
  computed: {
    bgClass () {
      if (this.weatherData) {
        if (this.weatherData.weather[0].icon.endsWith('n')) {
          return 'bg-night'
        } else {
          return 'bg-day'
        }
      }
    }
  },
  methods: {
    getLocation () {
      this.$q.loading.show ()
      if (this.$q.platform.is.electron) {
        this.$axios.get('https://freegeoip.app/json/')
        .then(response => {
          this.lat = response.data.latitude
          this.lon = response.data.longitude
          this.getWeatherByCoords()
        })
      } else {
          navigator.geolocation.getCurrentPosition(position => {
            /* console.log('position', position) */
            this.lat = position.coords.latitude
            this.lon = position.coords.longitude
            this.getWeatherByCoords()
          })
      }
    },
    getWeatherByCoords () {
      this.$q.loading.show ()
      this.$axios(`${this.apiUrl}?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}&units=metric`)
      .then((response) => {
        /* console.log('response: ', response) */
        this.weatherData = response.data
        this.$q.loading.hide ()
      })
      .catch((error) => {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Loading failed',
          icon: 'report_problem'
        })
        this.$q.loading.hide ()
      })
    },
    getWeatherBySearch () {
      this.$q.loading.show ()
      this.$axios(`${this.apiUrl}?q=${this.search}&appid=${this.apiKey}&units=metric`)
      .then(response => {
        this.weatherData = response.data
        this.$q.loading.hide ()
        })
      .catch((error) => {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Loading failed',
          icon: 'report_problem'
        })
        this.$q.loading.hide ()
      })
    }
  }
}
</script>
<style lang="sass">
  .q-page
    background: linear-gradient(to bottom, #2c3e50, #3498db)
    &.bg-day
       background: linear-gradient(to bottom, #003973, #e5e5be)
    &.bg-night
       background: linear-gradient(to bottom, #232526, #414345)
  .degree
    top: -44px
    &--r
      top: -24px
  .city
    flex: 0 0 100px
    background: url(../statics/future.png)
    background-size: contain
    background-position: center bottom
</style>
