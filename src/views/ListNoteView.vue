<template>
  <div id="app">
    <navbar-component></navbar-component>
    <list-note-component></list-note-component>
    <footer-component></footer-component>
  </div>
</template>

<script>
import ListNoteComponent from '../components/ListNote.vue';
import NavbarComponent from '../components/NavbarPage.vue';
import FooterComponent from '../components/FooterPage.vue';
export default {
  name: "app",
  components: {
    NavbarComponent,
    ListNoteComponent,
    FooterComponent
  }
}
</script>