import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { mapState } from 'vuex';
import VueCookies from 'vue-cookies';

const mixinValAcc = {
  data() {
    return {
      email: "",
      password: "",
      name: "",
      isEmailDirty: false,
      isExistEmail: false,
      isNameDirty: false,
      isPasswordDirty: false,
      isConfirmPasswordDirty: false,
      errors: {}
    };
  },
  methods: {
    
    async checkExistingAccount(email) {
      const collectionRef = collection(db, "users");

      // điêu kiện
      const condition = query(collectionRef, where("email", "==", email));
      try {
        const querySnapshot = await getDocs(condition);
        if (querySnapshot.empty) {
          console.log("Tài khoản không tồn tại!");
          return false;
        } else {
          console.log("Tài khoản tồn tại!");
          return true;
        }
      } catch (error) {
        console.error("Error getting documents:", error);
      }
    },

    checkLogin() {
      

      this.$store.commit('setDisplayName', this.$cookies.get('displayName'));
      this.$store.commit('setIsLoggedIn', this.$cookies.get('isLoggedIn'));
      this.$store.commit('setIsLoggedIn', this.$cookies.get('email'));
      
      // Kiểm tra nếu đã đăng nhập
      if (this.isLoggedIn == false) {
          this.$router.push("/login");
      }
    },

    logout() {
      VueCookies.remove('displayName');
      VueCookies.remove('isLoggedIn');
      VueCookies.remove('email');
      this.$router.push("/login");
    },
  },
  watch: {
    email() {
      this.isEmailDirty = true;
      this.isExistEmail = false;
    },
    password() {
      this.isPasswordDirty = true;
    },
    name() {
      this.isNameDirty = true;
    },
    confirmPassword() {
      this.isConfirmPasswordDirty = true;
    },
    note() {
      this.isNoteDirty = true;
    },
  },
  computed: {
    ...mapState(['isLoggedIn','displayName']),
    isValidEmail() {
      // Validate email
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

      if (!emailRegex.test(this.email)) {
        this.errors.email = "Email không hợp lệ";
        return false;
      }
      return true;
    },
    isValidPassword() {
      // Validate password
      if (this.password.length < 8) {
        this.errors.password = "Password phải có ít nhất 8 ký tự";
        return false;
      }
      return true;
    },
    isValidName() {
      // Validate password
      if (this.name.length < 4) {
        this.errors.name = "Name phải có ít nhất 4 ký tự";
        return false;
      }
      return true;
    },
    isValidFormRg() {
      // Kiểm tra tính hợp lệ của toàn bộ form
      return (
        this.isValidEmail &&
        this.isValidPassword &&
        this.password === this.confirmPassword
      );
    },
    isValidFormLg() {
      // Kiểm tra tính hợp lệ của toàn bộ form
      return this.isValidEmail && this.isValidPassword;
    },
  },
};

export default mixinValAcc;
