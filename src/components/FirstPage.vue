<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
    <div class="container mx-auto max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
      <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-6 px-8">
        <h1 class="text-3xl font-extrabold text-center tracking-wide">ระบบจัดการออเดอร์</h1>
      </div>

      <div class="p-8 space-y-6">
        <div class="space-y-4">
          <h2 class="text-xl font-semibold text-blue-700 border-b-2 border-blue-100 pb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            ข้อมูลออเดอร์
          </h2>

          <div class="grid grid-cols-1 gap-4">
            <div class="relative">
              <div @click="toggleDatePicker"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200 flex items-center justify-between cursor-pointer hover:bg-blue-50 group">
                <span class="text-gray-700 group-hover:text-blue-700">
                  {{ formattedDate || 'เลือกวันที่' }}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 group-hover:text-blue-800"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>

              <div v-if="isDatePickerOpen"
                class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm"
                @click.self="closeDatePicker">
                <div class="bg-white rounded-2xl shadow-2xl w-96 transform transition-all duration-300 ease-in-out"
                  :class="{
                    'scale-95 opacity-0': !isDatePickerOpen,
                    'scale-100 opacity-100': isDatePickerOpen
                  }" @click.stop>
                  <div
                    class="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-t-2xl flex justify-between items-center">
                    <button @click="previousMonth" class="hover:bg-blue-500 rounded-full p-2 transition duration-200">
                      <ChevronLeft size="20" />
                    </button>
                    <h2 class="text-lg font-bold">
                      {{ currentMonthName }} {{ currentYear }}
                    </h2>
                    <button @click="nextMonth" class="hover:bg-blue-500 rounded-full p-2 transition duration-200">
                      <ChevronRight size="20" />
                    </button>
                  </div>

                  <div class="grid grid-cols-7 text-center text-sm text-gray-500 py-2 bg-blue-50">
                    <div>อา</div>
                    <div>จ</div>
                    <div>อ</div>
                    <div>พ</div>
                    <div>พฤ</div>
                    <div>ศ</div>
                    <div>ส</div>
                  </div>

                  <div class="grid grid-cols-7 gap-1 p-4">
                    <button v-for="day in calendarDays" :key="day.date" @click="selectDate(day)" 
                      :disabled="day.disabled" class="py-2 rounded-lg transition duration-200 ease-in-out" :class="{
                        'bg-blue-600 text-white': isSelectedDate(day),
                        'hover:bg-blue-100': !day.disabled,
                        'text-gray-300 cursor-not-allowed': day.disabled,
                        'text-gray-700': !day.disabled && !isSelectedDate(day)
                      }">
                      {{ day.day }}
                    </button>
                  </div>

                  <div class="flex justify-between p-4 border-t">
                    <button @click="selectToday"
                      class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200">
                      เลือกวันนี้
                    </button>
                    <button @click="clearDate"
                      class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200">
                      ล้าง
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-2">
              <label for="salesNumber" class="block text-sm font-medium text-gray-700">
                หมายเลขรายการขาย
              </label>
              <input id="salesNumber" type="text"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
                placeholder="กรอกหมายเลขรายการขาย" required v-model="salesNumber" />
            </div>

            <div class="space-y-2">
              <label for="salesPerson" class="block text-sm font-medium text-gray-700">
                พนักงานขาย
              </label>
              <input id="salesPerson" type="text"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
                placeholder="ชื่อพนักงานขาย" v-model="employeeName" required />
            </div>

            <div class="space-y-2">
              <label for="salesPersonPhone" class="block text-sm font-medium text-gray-700">
                เบอร์โทรศัพท์พนักงานขาย
              </label>
              <input id="salesPersonPhone" type="tel"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
                placeholder="กรอกเบอร์โทรศัพท์" v-model="employeeTel" required />
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <h2 class="text-xl font-semibold text-blue-700 border-b-2 border-blue-100 pb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            ข้อมูลลูกค้า
          </h2>
          
          <div class="grid grid-cols-1 gap-4">
            <div class="space-y-2">
              <label for="customerName" class="block text-sm font-medium text-gray-700">
                ชื่อลูกค้า
              </label>
              <input id="customerName" type="text"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
                placeholder="กรอกชื่อลูกค้า" v-model="customerName" required />
            </div>

            <div class="space-y-2">
              <label for="customerCode" class="block text-sm font-medium text-gray-700">
                รหัสลูกค้า
              </label>
              <input id="customerCode" type="text"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
                placeholder="กรอกรหัสลูกค้า" v-model="customerId" required />
            </div>

            <div class="flex space-x-4">
              <label for="newCustomer"
                class="flex-1 cursor-pointer text-center py-3 px-4 rounded-lg border-2 transition duration-200 ease-in-out flex items-center justify-center"
                :class="{
                  'bg-green-500 text-white border-transparent': customerType === 'ลูกค้าใหม่',
                  'bg-white text-gray-700 hover:bg-green-500 hover:border-green-500 hover:text-white border-gray-300': customerType !== 'ลูกค้าใหม่'
                }">
                <input type="radio" id="newCustomer" name="customerType" value="ลูกค้าใหม่" v-model="customerType"
                  class="hidden" />
                ลูกค้าใหม่
              </label>

              <label for="oldCustomer"
                class="flex-1 cursor-pointer text-center py-3 px-4 rounded-lg border-2 transition duration-200 ease-in-out flex items-center justify-center"
                :class="{
                  'bg-blue-500 text-white hover:bg-blue-500 border-transparent': customerType === 'ลูกค้าเก่า',
                  'bg-white text-gray-700 hover:bg-blue-500 hover:border-blue-500 hover:text-white border-gray-300': customerType !== 'ลูกค้าเก่า'
                }">
                <input type="radio" id="oldCustomer" name="customerType" value="ลูกค้าเก่า" v-model="customerType"
                  class="hidden" />
                ลูกค้าเก่า
              </label>
            </div>
          </div>
        </div>

        <div class="flex justify-end mt-6">
          <button @click="navigateToNext" type="submit"
            class="px-10 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center">
            ถัดไป
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineProps, defineEmits } from 'vue';
import router from '@/router';


const props = defineProps({
  modalValue: {
    type: Date,
    default: null
  }
})

const emit = defineEmits(['update:modelValue']);

const isDatePickerOpen = ref(false);
const currentDate = ref(new Date());
const selectedDate = ref(props.modalValue || null);

const monthNames = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน',
  'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม',
  'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];

const currentMonthName = computed(() => monthNames[currentDate.value.getMonth()]);
const currentYear = computed(() => currentDate.value.getFullYear());

const formattedDate = computed(() => {
  if (!selectedDate.value) return '';
  return selectedDate.value.toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
});

const calendarDays = computed(() => {
  const days = [];
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startingDay = firstDay.getDay();

  for (let i = 0; i < startingDay; i++) {
    days.push({ day: '', disabled: true });
  }

  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(year, month, day);
    days.push({
      day,
      date,
      disabled: false
    });
  }

  return days;
});

const toggleDatePicker = () => {
  isDatePickerOpen.value = !isDatePickerOpen.value;
};

const closeDatePicker = () => {
  isDatePickerOpen.value = false;
};

const selectDate = (day) => {
  if (!day.disabled) {
    selectedDate.value = day.date;
    emit('update:modelValue', selectedDate.value);
    closeDatePicker();
  }
};

const isSelectedDate = (day) => {
  if (!selectedDate.value || day.disabled) return false;
  return day.date.toDateString() === selectedDate.value.toDateString();
};

const previousMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  );
};

const nextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  );
};

const selectToday = () => {
  selectedDate.value = new Date();
  currentDate.value = new Date();
  emit('update:modelValue', selectedDate.value);
  closeDatePicker();
};

const clearDate = () => {
  selectedDate.value = null;
  emit('update:modelValue', null);
  closeDatePicker();
};

onMounted(() => {
  if (props.modalValue) {
    currentDate.value = props.modalValue;
  }
});

const customerId = ref('');
const customerName = ref('');
const customerType = ref('');
const salesNumber = ref('');
const employeeTel = ref('');
const employeeName = ref('');

const navigateToNext = () => {
  console.log(selectedDate.value);
  router.push({
    name: 'Next',
    query: {
      salesNumber: salesNumber.value,
      customerName: customerName.value,
      customerType: customerType.value,
      employeeTel: employeeTel.value,
      employeeName: employeeName.value,
      customerId: customerId.value,
      selectDate: selectedDate.value?.toISOString() || ''
    }
  });
};
</script>