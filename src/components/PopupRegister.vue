<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
  >
    <div class="w-2/4 bg-white p-6 rounded-md shadow-md">
      <h2 class="text-lg font-bold mb-4">Form Popup</h2>
      <!-- Các trường nhập liệu và các nút điều khiển form -->
      <form @submit="createNote">
        <div class="relative w-full mb-4">
          <label class="block uppercase text-gray-700 text-xs font-bold mb-2"
            >Time Create</label
          ><input
            v-model="dateNote"
            type="datetime-local"
            class="peer border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
            style="transition: all 0.15s ease 0s"
            :readonly="true"
          />
        </div>
        <div class="relative w-full mb-3">
          <label class="block uppercase text-gray-700 text-xs font-bold mb-2"
            >Note</label
          ><textarea
            v-model="note"
            type="text"
            class="peer border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
            placeholder="Note"
            style="transition: all 0.15s ease 0s"
          />
          <span class="text-red-600" v-if="!isNoteDirty">{{
            errors
          }}</span>
        </div>
        <div class="text-center mt-6">
          <button
            class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
            type="submit"
            style="transition: all 0.15s ease 0s"
          >
            Create Note
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { db } from "@/firebase";
import MixinValAcc from "../mixin/MxValidateAcc";
import { collection, addDoc } from 'firebase/firestore';
export default {
  name: "PopupRegisterComponent",
  mixins: [MixinValAcc],
  data() {
    return {
      dateNote: "",
      note: "",
      isNoteDirty: false,
      errors: ""
    };
  },
  mounted() {
    this.checkLogin();
    const currentDate = new Date().toISOString().slice(0, 16);
    this.dateNote = currentDate;
  },
  watch: {
    note() {
      if (this.note.length < 8) {
        this.errors = "Note khong the it hon 8 ky tu!";
      } else {
        this.isNoteDirty = true;
      }
    },
  },
  methods: {
    async createNote(event) {
      event.preventDefault();
      
      const collectionRef = collection(db, 'notes');
      try {
        if (this.isNoteDirty == false) return;
        const newData = {
          dateNote: this.dateNote,
          contentNote: this.note,
          email: this.$cookies.get('email')
        };
        const newDocRef = await addDoc(collectionRef, newData);

        console.log('Dữ liệu đã được thêm vào với ID:', newDocRef.id);
        this.$emit("close");
        this.$router.push("/listnote");

      } catch (error) {
        console.error(
          "Lỗi khi lưu thông tin note vào Firestore:",
          error
        );
      }
    },
  },
    
};
</script>
