<template>
  <nav class="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3" >
    <div class="container px-4 mx-auto flex flex-wrap items-center justify-between" >
      <div class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
        <a
          class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
          href="#"
          >Note My Self</a>
        <button
          class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
          type="button"
          v-on:click="toggleNavbar()" >
          <i class="text-white fas fa-bars"></i>
        </button>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "NavbarComponent",
  data() {
    return {
      // showMenu: false,
    };
  },
  methods: {
    toggleNavbar: function () {
      //this.showMenu = !this.showMenu;
    },
  },
};
</script>
