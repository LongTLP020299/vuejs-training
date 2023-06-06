<template>
  <div>
    <button @click="logout">Đăng xuất</button>
  </div>
</template>

<script>
import { signOut } from 'firebase/auth';
import auth from '@/firebase';

export default {
  methods: {
    logout() {
       try {
        signOut(auth)
        console.log('Logout thành công');
      } catch (error) {
        console.error('Lỗi Logout:', error);
      }
    },
  },
};
</script>