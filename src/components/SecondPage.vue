<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
    <div class="container mx-auto max-w-7xl bg-white rounded-3xl shadow-2xl border border-gray-100">
      <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-6 px-8 rounded-t-3xl">
        <h1 class="text-3xl font-extrabold text-center tracking-wide flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-3" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          รายการสินค้า
        </h1>
      </div>
      <div class="p-8 space-y-6">
        <div class="flex justify-between items-center mb-4">
          <div class="flex space-x-4">
            <button @click="addNewRow"
              class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              เพิ่มสินค้า
            </button>

            <!-- <button @click="openProductModal"
              class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              เลือกสินค้า
            </button> -->
          </div>

          <div class="text-sm text-gray-600">
            <b>จำนวนสินค้า : {{ products.length }}</b>
          </div>
        </div>

        <div class="overflow-x-auto rounded-lg border border-gray-200">
          <table class="w-full">
            <thead>
              <tr class="bg-blue-50 text-blue-800">
                <th class="px-4 py-3 text-left">ลำดับ</th>
                <th class="px-4 py-3 text-left">รหัสสินค้า</th>
                <th class="px-4 py-3 text-left">ชื่อสินค้า</th>
                <th class="px-4 py-3 text-left">ราคาต่อชิ้น</th>
                <th class="px-4 py-3 text-left">จำนวน</th>
                <th class="px-4 py-3 text-left">ราคารวม (฿)</th>
                <th class="px-4 py-3 text-left">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in products" :key="index"
                class="hover:bg-blue-50 transition duration-150 border-b">
                <td class="px-4 py-3">
                  <input type="text" :value="index + 1" disabled
                    class="w-20 px-2 py-1 bg-gray-100 text-gray-600 rounded-lg">
                </td>
                <td class="px-4 py-3">
                  <input type="text" v-model="item.id" placeholder="รหัสสินค้า"
                    class="w-40 px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                </td>
                <td class="px-4 py-3">
                  <input type="text" v-model="item.name" placeholder="ชื่อสินค้า"
                    class="w-50 px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                </td>
                <td class="px-4 py-3">
                  <input type="number" v-model.number="item.price" placeholder="ราคาต่อชิ้น"
                    class="w-40 px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </td>
                <td class="px-4 py-3">
                  <input type="number" v-model.number="item.quantity" placeholder="จำนวน"
                    class="w-20 px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </td>
                <td class="px-4 py-3 font-semibold text-blue-700">
                  ฿{{ (item.price * item.quantity).toFixed(2) }}
                </td>
                <td class="px-4 py-3">
                  <button @click="removeProduct(index)"
                    class="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    ลบ
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div class="space-y-2">
            <label for="discount" class="block text-sm font-medium text-gray-700">
              ลดราคา
            </label>
            <div class="flex items-center">
              <input id="discount" type="number" v-model="discount"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="ลดราคา" />
              <span class="ml-2 text-gray-600">บาท</span>
            </div>
          </div>

          <div class="space-y-2">
            <label for="note" class="block text-sm font-medium text-gray-700">
              หมายเหตุ
            </label>
            <textarea id="note" v-model="note"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none h-24"
              placeholder="เพิ่มหมายเหตุ"></textarea>
          </div>
        </div>

        <div class="mt-6">
          <label for="paymentType" class="block text-sm font-medium text-gray-700 mb-2">
            การชำระเงิน
          </label>
          <select id="paymentType" v-model="paymentType"
            class="w-full px-4 py-2 border border-gray-300 bg-white  rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <option value="">เลือกการชำระเงิน</option>
            <option value="เงินสด">💵 เงินสด</option>
            <option value="บัตรเดรดิต">💳 บัตรเครดิต</option>
            <option value="โอนเงิน">➰ โอนเงิน</option>
          </select>
        </div>

        <div class="mt-6">
          <label class="block mb-2 text-sm font-medium text-gray-700">
            อัพโหลดไฟล์
          </label>
          <div class="relative">
            <input type="file" id="file-upload" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              @change="updateFileName" />
            <div class="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm">
              <span class="truncate" id="file-name">
                ไม่ได้เลือกไฟล์
              </span>
              <button type="button"
                class="px-4 py-1 ml-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none">
                เลือกไฟล์
              </button>
            </div>
          </div>
        </div>

        <div class="mt-6 text-right">
          <h2 class="text-2xl font-bold text-blue-700">
            ราคารวมทั้งหมด: ฿{{ totalAmount.toFixed(2) }}
          </h2>
          <h1>{{ discountShow }}</h1>
        </div>

        <div class="flex space-x-4 mt-6">
          <button @click="previous"
            class="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
            ก่อนหน้า
          </button>
          <button @click="submit"
            class="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
            ตรวจสอบ
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
    <div
      class="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-auto transform transition-all duration-300 ease-in-out scale-100 hover:scale-105">
      <div class="bg-blue-600 text-white p-6 rounded-t-xl">
        <h2 class="text-3xl font-bold text-center">ข้อมูลการตรวจสอบการขาย</h2>
      </div>

      <div class="p-8 space-y-6">
        <div class="grid grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg">
          <div>
            <h3 class="text-xl font-semibold text-blue-700 mb-4">ข้อมูลลูกค้า</h3>
            <div class="space-y-2">
              <p><span class="font-medium text-gray-600">วันที่:</span> {{ formattedDate }}</p>
              <p><span class="font-medium text-gray-600">รหัสลูกค้า:</span> {{ customerId }}</p>
              <p><span class="font-medium text-gray-600">ชื่อลูกค้า:</span> {{ customerName }}</p>
              <p><span class="font-medium text-gray-600">ประเภทลูกค้า:</span> {{ customerType }}</p>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-semibold text-blue-700 mb-4">ข้อมูลพนักงานขาย</h3>
            <div class="space-y-2">
              <p><span class="font-medium text-gray-600">ชื่อพนักงานขาย:</span> {{ employeeName }}</p>
              <p><span class="font-medium text-gray-600">เบอร์โทรศัพท์:</span> {{ employeeTel }}</p>
              <p><span class="font-medium text-gray-600">หมายเลขรายการขาย:</span> {{ salesNumber }}</p>
            </div>
          </div>
        </div>

        <div class="bg-gray-100 p-6 rounded-lg">
          <h3 class="text-2xl font-semibold text-blue-700 mb-4">รายละเอียดสินค้า</h3>
          <table class="w-full table-auto border-collapse shadow-md rounded-lg overflow-hidden">
            <thead class="bg-blue-500 text-white">
              <tr>
                <th class="px-4 py-3 text-center">ลำดับ</th>
                <th class="px-4 py-3 text-center">รหัสสินค้า</th>
                <th class="px-4 py-3 text-center">ชื่อสินค้า</th>
                <th class="px-4 py-3 text-center">ราคาต่อชิ้น</th>
                <th class="px-4 py-3 text-center">จำนวน</th>
                <th class="px-4 py-3 text-center">ราคารวม (฿)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in products" :key="index" class="border-b hover:bg-gray-50 transition-colors">
                <td class="px-4 py-3 text-center">{{ index + 1 }}</td>
                <td class="px-4 py-3 text-center">{{ product.id }}</td>
                <td class="px-4 py-3 text-center">{{ product.name }}</td>
                <td class="px-4 py-3 text-center">{{ product.price }}</td>
                <td class="px-4 py-3 text-center">{{ modalQuantity }}</td>
                <td class="px-4 py-3 text-center font-semibold">
                  ฿{{ (product.price * product.quantity).toFixed(2) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="grid grid-cols-2 gap-6">
          <div class="bg-gray-100 p-4 rounded-lg">
            <h3 class="text-xl font-semibold text-blue-700 mb-3">สรุปรายการ</h3>
            <div class="space-y-2">
              <p><span class="font-medium text-gray-600">จำนวน:</span> {{ modalQuantity }}</p>
              <p><span class="font-medium text-gray-600">วิธีการชำระเงิน:</span> {{ paymentType }}</p>
              <p><span class="font-medium text-gray-600">หมายเหตุ:</span> {{ note }}</p>
            </div>
          </div>

          <div class="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
            <h3 class="text-xl font-semibold text-blue-700 mb-3">สรุปยอดเงิน</h3>
            <div class="space-y-2">
              <p class="flex justify-between">
                <span class="text-gray-600">ลดราคา:</span>
                <span class="font-bold text-red-600">- ฿{{ discount }}</span>
              </p>
              <p class="flex justify-between text-lg">
                <span class="font-semibold text-gray-700">ราคารวมทั้งหมด:</span>
                <span class="font-bold text-blue-700">฿{{ totalAmount }}</span>
              </p>
            </div>
          </div>
        </div>

        <div class="flex justify-end space-x-4 mt-6">
          <button @click="showModal = false"
            class="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2">
            <span>ยกเลิก</span>
          </button>
          <button @click="confirmCheck"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <span>ยืนยัน</span>
          </button>
        </div>
      </div>
    </div>
  </div>



</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';

const route = useRoute();

const salesNumber = ref(route.query.salesNumber) || '-';
const customerName = ref(route.query.customerName || '-');
const customerType = ref(route.query.customerType || '-');
const employeeTel = ref(route.query.employeeTel || '-');
const employeeName = ref(route.query.employeeName || '-');
const customerId = ref(route.query.customerId) || '-';

const date = ref(route.query.selectDate) || '-';

const formattedDate = ref('');

onMounted(() => {
  if (date.value && date.value !== '-') {
    formattedDate.value = new Date(date.value).toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
});

const showModal = ref(false);
const modalQuantity = ref(0)
  ;
const submit = () => {
  modalQuantity.value = products.value.reduce((sum, product) => sum + Number(product.quantity), 0);
  showModal.value = true;
}

const discount = ref(0);
const note = ref('');
const paymentType = ref('');
const isProductModalOpen = ref(false);

const addNewRow = () => {
  products.value.push({
    id: '',
    name: '',
    price: 0,
    quantity: 0,
  });
};

const products = ref([
  { id: '', name: '', price: 0, quantity: 0 },
]);

const productsData = [
  { id: '001', name: 'สินค้า A', price: 2000 },
  { id: '002', name: 'สินค้า B', price: 5000 },
  { id: '003', name: 'สินค้า C', price: 10000 },
];

const fetchProductById = (id) => {
  return productsData.find(product => product.id === id) || { name: '', price: 0 };
};

watch(products, (newProducts) => {
  newProducts.forEach((product) => {
    const productData = fetchProductById(product.id);
    product.name = productData.name;
    product.price = productData.price;
  });
}, { deep: true });

const totalAmount = computed(() => {
  return products.value.reduce((total, product) => total + (product.price * product.quantity), 0) - discount.value;
});

const addProduct = (product) => {
  products.value.push({
    ...product,
    quantity: 1
  });
  isProductModalOpen.value = false;
};

const removeProduct = (index) => {
  products.value.splice(index, 1);
};

const previous = () => {
  router.push('/');
};

const checkout = () => {
  showModal.value = true;
};

const confirmCheck = () => {
  alert('ยืนยัน');
  showModal.value = false;
};
</script>
