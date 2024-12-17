<template>
    <transition name="fade">
        <div v-if="isProductModalOpen"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white p-8 rounded-lg shadow-2xl w-11/12 max-w-3xl relative">
                <button @click="closeProductModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">เลือกสินค้า</h2>
                <p class="text-gray-600 mb-4 text-center">กรุณาเลือกสินค้าที่คุณต้องการ</p>

                <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div class="flex flex-col items-center border rounded-lg p-4 shadow-md hover:shadow-lg transition">
                        <span class="text-lg font-medium text-gray-800">{{ product.name }}</span>
                        <button
                            class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                            เลือก
                        </button>
                    </div>
                </div>

                <div class="flex justify-end mt-6">
                    <button @click="closeProductModal"
                        class="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition">
                        ปิด
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { ref } from 'vue';

const isProductModalOpen = ref(false);


const closeProductModal = () => {
    isProductModalOpen.value = false;
}
</script>