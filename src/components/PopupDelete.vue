<template>
  <!-- Modal -->
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="bg-white w-1/3 rounded-lg p-6">
      <p class="mb-4">Are you sure you want to delete the data?</p>
      <div class="flex justify-end">
        <button
          @click="deleteData"
          class="bg-red-500 text-white px-4 py-2 rounded mr-2"
        >
          Delete
        </button>
        <button
          @click="cancelDelete"
          class="bg-gray-300 text-gray-700 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";
import { collection, doc, deleteDoc } from "firebase/firestore";
export default {
  name: "PopupDeleteComponent",
  props: {
    idNoteDel: {
      type: String,
      required: true,
      validator: (value) => {
        return value != null;
      },
    },
  },
  data() {
    return {
      idNote: "",
    };
  },
  mounted() {
    this.idNote = this.idNoteDel;
     console.log("Delete id: ", this.idNote);
  },
  methods: {
    async deleteData() {
      const collectionRef = collection(db, "notes");
      const documentRef = doc(collectionRef, this.idNote);
      try {
        await deleteDoc(documentRef);
        this.showDeleteModal = false;
        console.log("Delete id: ", this.idNote);
        this.$emit("delete");
        
      } catch (error) {
        console.error("Delete error :", this.idNote);
      }
    },
    cancelDelete() {
      this.$emit("closeDel");
    },
  },
};
</script>
