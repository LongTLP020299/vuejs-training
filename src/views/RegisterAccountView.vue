<template>
  <div id="app">
    <navbar-component></navbar-component>
    <register-account-component></register-account-component>
    <footer-component></footer-component>
  </div>
</template>

<script>
import RegisterAccountComponent from '../components/RegisterAccount.vue';
import NavbarComponent from '../components/NavbarPage.vue';
import FooterComponent from '../components/FooterPage.vue';
export default {
  name: "app",
  components: {
    NavbarComponent,
    RegisterAccountComponent,
    FooterComponent
  }
}
</script>