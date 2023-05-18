<template>
  <div id="app">
    <navbar-component></navbar-component>
    <login-component @open-modal="openModal"></login-component>
    <popup-component :email="email" v-show="showModal" @close-modal="showModal = false"></popup-component>
    <footer-component></footer-component>
  </div>
</template>

<script>
import LoginComponent from './views/Login.vue'
import NavbarComponent from './components/NavbarPage.vue';
import FooterComponent from './components/FooterPage.vue';
import PopupComponent from './components/PopupDemo.vue'
export default {
  name: "app",
  components: {
    NavbarComponent,
    LoginComponent,
    FooterComponent,
    PopupComponent
  },
  data() {
    return {
      showModal: false,
      email: ''
    }
  },
  methods: {
    openModal: function (inputEmail) {
      this.showModal = true
      this.email = inputEmail;
    }
  }
}
</script>

