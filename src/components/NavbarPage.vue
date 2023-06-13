<template>
  <nav
    class="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3"
  >
    <div
      class="container px-4 mx-auto flex flex-wrap items-center justify-between"
    >
      <div
        class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
      >
        <p
          class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
          >Note My Self</p
        >
      </div>
      <div v-if="isLoggedIn"
        class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
      >
        <p
          class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
          >Hello {{ displayName }}</p
        >
      </div>
      <div v-if="isLoggedIn"
        class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
      >
        <button
          class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
          v-on:click="logout()"
          >Logout</button
        >
      </div>
      <div v-else
        class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
      >
        <button
          class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
          v-on:click="login()"
          >Login</button
        >
      </div>
    </div>
  </nav>
</template>
<script>
import { mapState } from 'vuex';
import MixinValAcc from "../mixin/MxValidateAcc";
export default {
  name: "NavbarComponent",
  mixins: [MixinValAcc],
  computed: {
    ...mapState(['isLoggedIn','displayName']),
  },
  methods: {
    login() {
      this.$router.push("/login");
    },

  },

};
</script>
