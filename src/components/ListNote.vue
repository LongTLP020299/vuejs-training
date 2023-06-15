<template>
  <div class="slide-container">
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
            <div class="w-full">
              <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0"
              >
                <div>
                  <!-- Các phần tử và nút điều khiển khác trong component cha -->
                  <button @click="openPopup(null, 'create')">
                    Create Note
                  </button>
                  <PopupRegisterComponent
                    v-if="showPopup"
                    @close="closePopup"
                    :mode="mode"
                    :initDataNote="initDataNote"
                  />
                </div>
                <div class="flex-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                        >
                          No
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                        >
                          Time Create
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                        >
                          Content
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase"
                        >
                          Edit
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase"
                        >
                          Delete
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr v-for="note in paginatedItems" :key="note.id">
                        <td
                          class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap"
                        >
                          1
                        </td>
                        <td
                          class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"
                        >
                          {{ note.dateNote }}
                        </td>
                        <td
                          class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"
                        >
                          {{ note.contentNote }}
                        </td>
                        <td
                          class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap"
                        >
                          <a
                            @click="openPopup(note.id, 'update')"
                            class="text-green-500 hover:text-green-700"
                          >
                            Edit
                          </a>
                        </td>
                        <td
                          class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap"
                        >
                          <a
                            class="text-red-500 hover:text-red-700"
                            @click="openDeleteConfirmation(note.id)"
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                      <tr class="text-center">
                        <td colspan="3">
                          <p v-if="noDataNote" class="text-red-600">
                            No data was found!
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="flex items-center justify-center mt-4">
                    <nav class="flex space-x-2">
                      <button
                        class="px-3 py-1 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
                        :disabled="currentPage === 1"
                        @click="previousPage"
                      >
                        Previous
                      </button>
                      <div
                        v-for="pageNumber in pageDisplayNumbers"
                        :key="pageNumber"
                      >
                        <button
                          class="px-3 py-1 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
                          :class="{
                            'bg-gray-500 text-white':
                              pageNumber === currentPage,
                          }"
                          @click="goToPage(pageNumber)"
                        >
                          {{ pageNumber }}
                        </button>
                      </div>
                      <button
                        class="px-3 py-1 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
                        :disabled="currentPage === totalPages"
                        @click="nextPage"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
      <transition name="slide">
        <PopupDeleteComponent
          v-if="showDeleteModal"
          @closeDel="closeDel"
          :idNoteDel="idNoteDel"
          @delete="closeDeleted"
        />
      </transition>
  </div>
</template>
<script>
import MixinValAcc from "../mixin/MxValidateAcc";
import PopupRegisterComponent from "./PopupRegister.vue";
import PopupDeleteComponent from "./PopupDelete.vue";
import { db } from "@/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
export default {
  name: "ListNoteComponent",
  components: {
    PopupRegisterComponent,
    PopupDeleteComponent,
  },
  data() {
    return {
      showPopup: false,
      listNote: [],
      noDataNote: false,
      currentPage: 1,
      itemsPage: 5,
      totalPages: 0,
      pageDisplay: 1,
      pageDisplayNumbers: [],
      mode: "",
      initDataNote: {},
      showDeleteModal: false,
      idNoteDel: "",
    };
  },
  mixins: [MixinValAcc],

  created() {
    if (!this.checkLogin()) {
      return;
    }
  },
  async mounted() {
    await this.getListNote();

    if (this.listNote.length < 6) {
      this.pageDisplay = 1;
    } else {
      this.pageDisplay = 3;
    }

    this.calculatePageDisplay();
  },
  methods: {
    openPopup(id, vMode) {
      this.showPopup = true;
      this.mode = vMode;
      if (this.mode === "update") {
        this.initDataNote = this.listNote.find((item) => item.id === id);
      }
    },
    closePopup() {
      this.showPopup = false;
      this.renderPageListNote();
    },
    openDeleteConfirmation(id) {
      this.showDeleteModal = true;
      this.idNoteDel = id;
    },

    closeDel() {
      this.showDeleteModal = false;
    },
    closeDeleted() {
      this.showDeleteModal = false;
      this.renderPageListNote();
    },

    async renderPageListNote() {
      this.listNote = [];
      await this.getListNote();
    },

    // Get data
    async getListNote() {
      const collectionRef = collection(db, "notes");
      // điêu kiện
      const condition = query(
        collectionRef,
        where("email", "==", this.$cookies.get("email")),
        orderBy("dateNote", "desc")
      );
      try {
        const lstNote = await getDocs(condition);
        // Kiểm tra xem tài khoản đã tồn tại hay chưa
        if (lstNote.empty) {
          console.log("Không có data!");
          this.noDataNote = true;
          return;
        }
        lstNote.forEach((doc) => {
          // Lấy dữ liệu của mỗi document
          this.listNote.push({ id: doc.id, ...doc.data() });
        });
      } catch (error) {
        console.error("List note error:", error);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.calculatePageDisplay();
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.calculatePageDisplay();
      }
    },

    //Click page hien thi tren man hinh
    goToPage(pageNumber) {
      this.currentPage = pageNumber;
    },

    // Tinh toan de hien thi page khi click nut next and previous
    calculatePageDisplay() {
      this.totalPages = Math.ceil(this.listNote.length / this.itemsPage);
      const startPage = Math.max(
        this.currentPage - Math.floor(this.pageDisplay / 2),
        1
      );
      const endPage = startPage + this.pageDisplay - 1;
      this.pageDisplayNumbers = [];

      for (let i = startPage; i <= endPage; i++) {
        if (i <= this.totalPages) {
          this.pageDisplayNumbers.push(i);
        }
      }
    },
  },
  computed: {
    // Get data theo số record cho 1 page
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPage;
      const endIndex = startIndex + this.itemsPage;
      return this.listNote.slice(startIndex, endIndex);
    },
  },
};
</script>
<style>
.slide-leave-active {
  transition: transform 0.5s;
}
.slide-leave-to {
  transform: translateX(100%);
}

</style>
