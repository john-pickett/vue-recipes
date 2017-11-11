import Vue from 'vue'
import Vuetify from 'vuetify'
import draggable from 'vuedraggable'

Vue.use(Vuetify)
import App from './App.vue'

export const eventBus = new Vue();

new Vue({
  el: '#app',
  render: h => h(App)
})
