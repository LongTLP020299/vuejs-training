<template>
  <main>
    <section class="absolute w-full h-full">
      <div
        class="absolute top-0 w-full h-full bg-gray-900"
        style="background-size: 100%; background-repeat: no-repeat"
        :style="{
          'background-image':
            'url(' + require('../assets/img/register_bg_2.png').default + ')',
        }"
      ></div>
      <div class="container mx-auto px-4 h-full">
        <div class="flex content-center items-center justify-center h-full">
          <div class="w-full lg:w-4/12 px-4">
            <div
              class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0"
            >
              <hr class="mt-6 border-b-1 border-gray-400" />
              <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form @submit="getFormValues">
                  <div class="relative w-full mb-3">
                    <label
                      class="block uppercase text-gray-700 text-xs font-bold mb-2"
                      for="grid-password"
                      >Email</label
                    ><input
                      v-model="email"
                      type="email"
                      required
                      class="peer border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Email"
                      style="transition: all 0.15s ease 0s"
                    />
                    <span
                      class="text-red-600"
                      v-if="!isValidEmail && isEmailDirty || isExistEmail"
                      >{{ errors.email }}</span
                    >
                  </div>
                  <div class="relative w-full mb-3">
                    <label
                      class="block uppercase text-gray-700 text-xs font-bold mb-2"
                      for="grid-password"
                      >Password</label
                    ><input
                      v-model="password"
                      type="password"
                      class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Password"
                      style="transition: all 0.15s ease 0s"
                    />
                    <span
                      class="text-red-600"
                      v-if="!isValidPassword && isPasswordDirty"
                      >{{ errors.password }}</span
                    >
                  </div>
                  <div class="text-center mt-6">
                    <button
                      class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                      type="submit"
                      style="transition: all 0.15s ease 0s"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
              <div class="btn-wrapper">
                <div class="text-left mt-3">
                  <router-link to="/createaccount">Create Account</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import { db } from "@/firebase";
import MixinValAcc from "../mixin/MxValidateAcc";
import { collection, query, where, getDocs } from "firebase/firestore";
 import { mapState } from 'vuex';
export default {
  name: "LoginComponent",
  mixins: [MixinValAcc],
  data() {
    return {
      user: {}
    };
  },
  methods: {
    async getFormValues(event) {
      event.preventDefault();
      const isValid = this.isValidFormLg;
      const collectionRef = collection(db, "users");
      // điêu kiện
      const condition = query(
        collectionRef,
        where("email", "==", this.email),
        where("password", "==", this.password)
      );
      try {
        if (!isValid) return;
        const querySnapshot = await getDocs(condition);
        // Kiểm tra xem tài khoản đã tồn tại hay chưa
        if (querySnapshot.empty) {
          alert('Email hoac password khong dung!');
          //this.errors.email = "Email khong đã tồn tại";
          //this.isExistEmail = true;
          return;
        }
        querySnapshot.forEach((doc) => {
          // Lấy dữ liệu của mỗi document
          this.user = { ...doc.data(), id: doc.id };
        });
        console.log(this.user);

        this.$cookies.set('displayName', this.user.displayName);
        this.$cookies.set('isLoggedIn', true);
        this.$cookies.set('email', this.user.email);

        this.$router.push("/listnote");
      } catch (error) {
        console.error("Lỗi đăng nhập:", error);
      }
    }
  },
  computed: {
    ...mapState(['isLoggedIn','displayName']),
  },
};
</script>
