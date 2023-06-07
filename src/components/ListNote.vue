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
          <div class="w-full">
            <div
              class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0"
            >
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
                    <tr v-for="note in listNote" :key="note.id">
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
                        <a class="text-green-500 hover:text-green-700" href="#">
                          Edit
                        </a>
                      </td>
                      <td
                        class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap"
                      >
                        <a class="text-red-500 hover:text-red-700" href="#">
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
                <div>
                  <!-- Các phần tử và nút điều khiển khác trong component cha -->
                  <button @click="openPopup">Create Note</button>
                  <PopupRegisterComponent
                    v-if="showPopup"
                    @close="closePopup"
                  />
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
import MixinValAcc from "../mixin/MxValidateAcc";
import PopupRegisterComponent from "./PopupRegister.vue";
import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
export default {
  name: "ListNoteComponent",
  data() {
    return {
      showPopup: false,
      listNote: [],
      noDataNote: false,
    };
  },
  components: {
    PopupRegisterComponent,
  },
  mixins: [MixinValAcc],

  created() {
    this.checkLogin()
  },
  mounted() {
    this.getListNote();
  },
  // Các phương thức để hiển thị/ẩn form popup khi cần thiết
  methods: {
    openPopup() {
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
    },
    async getListNote() {
      const collectionRef = collection(db, "notes");
      // điêu kiện
      const condition = query(
        collectionRef,
        where("email", "==", this.$cookies.get("email"))
      );
      try {
        const querySnapshot = await getDocs(condition);
        // Kiểm tra xem tài khoản đã tồn tại hay chưa
        if (querySnapshot.empty) {
          console.log("Không có data!");
          this.noDataNote = true;
          return;
        }
        querySnapshot.forEach((doc) => {
          // Lấy dữ liệu của mỗi document
          this.listNote.push({ id: doc.id, ...doc.data() });
        });
      } catch (error) {
        console.error("List note error:", error);
      }
    },
  },
};
</script>
