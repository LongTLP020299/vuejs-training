<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
  >
    <div class="w-2/4 bg-white p-6 rounded-md shadow-md">
      <h2 class="text-lg font-bold mb-4">Form Create Note</h2>
      <!-- Các trường nhập liệu và các nút điều khiển form -->
      <form @submit="handleNotes">
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
            v-model="contentNote"
            type="text"
            class="peer border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
            placeholder="Note"
            style="transition: all 0.15s ease 0s"
          />
          <span class="text-red-600" v-if="!isNoteDirty">{{ errors }}</span>
        </div>
        <div class="text-center mt-6">
          <button
            class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
            type="submit"
            style="transition: all 0.15s ease 0s"
          >
            {{ mode === "create" ? "Create Note" : "Update Note" }}
          </button>
        </div>
      </form>
      <button
        class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
        style="transition: all 0.15s ease 0s"
        @click="closePP"
      >
        CANCEL
      </button>
    </div>
  </div>
</template>
<script>
import { db } from "@/firebase";
import MixinValAcc from "../mixin/MxValidateAcc";
import { collection, doc, addDoc, updateDoc } from "firebase/firestore";
export default {
  name: "PopupRegisterComponent",
  mixins: [MixinValAcc],
  props: {
    mode: {
      type: String,
      required: true,
      validator: (value) => {
        return value === "create" || value === "update";
      },
    },
    initDataNote: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      dateNote: "",
      contentNote: "",
      isNoteDirty: false,
      errors: "",
      modifiedInitDataNote: null,
    };
  },
  mounted() {
    if (!this.checkLogin()) return;
    const currentDate = new Date().toISOString().slice(0, 16);
    this.dateNote = currentDate;

    if (this.mode === "update" && this.initDataNote != null) {
      this.modifiedInitDataNote = { ...this.initDataNote };
      this.modifiedInitDataNote.dateNote = this.dateNote;
      this.contentNote = this.modifiedInitDataNote.contentNote;
    }
  },
  watch: {
    contentNote() {
      if (this.contentNote.length < 8) {
        this.errors = "Note khong the it hon 8 ky tu!";
        this.isNoteDirty = false;
      } else {
        this.isNoteDirty = true;
      }
    },
  },
  methods: {
    async handleNotes(event) {
      event.preventDefault();

      const collectionRef = collection(db, "notes");
      try {
        if (this.mode === "create") {
          if (this.isNoteDirty == false) return;
          const newData = {
            dateNote: this.dateNote,
            contentNote: this.contentNote,
            email: this.$cookies.get("email"),
          };
          const newDocRef = await addDoc(collectionRef, newData);

          console.log("Dữ liệu đã được thêm vào với ID:", newDocRef.id);
        } else if (this.mode === "update") {
          
          if (this.isNoteDirty == false) return;

          const noteDocRef = doc(collectionRef, this.initDataNote.id);
          this.modifiedInitDataNote.contentNote = this.contentNote;

          await updateDoc(noteDocRef, this.modifiedInitDataNote);

          console.log(
            "Dữ liệu đã được update vào với ID:",
            this.modifiedInitDataNote.id
          );
        }

        this.$emit("close");
      } catch (error) {
        console.error("Lỗi khi lưu thông tin note vào Firestore:", error);
      }
    },
    closePP() {
      this.$emit("close");
    },
  },
};
</script>
