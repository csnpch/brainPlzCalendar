<template>
    <div class="bg-[#2D2D2D] duration-200 px-4 py-3 flex items-center justify-between border-t border-[#999] sm:px-6 select-none">
        <div class="mt-2 flex-1 flex justify-between items-end sm:hidden">
            <a @click="onPage > 1 && onPage--" class="relative inline-flex items-center px-4 py-2 border border-[#999] text-sm font-medium rounded-md text-[#999] bg-[#2D2D2D] duration-200 hover:bg-[#222]"> Previous </a>
            <span class="font-medium">{{ onPage }}/{{totalPage}}</span>
            <a @click="onPage < totalPage && onPage++" class="ml-3 relative inline-flex items-center px-4 py-2 border border-[#999] text-sm font-medium rounded-md text-[#999] bg-[#2D2D2D] duration-200 hover:bg-[#222]"> Next </a>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div :class="{'hidden': totalPage > limitPageShow}">
                <p class="text-sm text-[#999] mt-4">
                    Showing
                    <span class="font-medium">{{ rangeItemsShow.start }}</span>
                    to
                    <span class="font-medium">{{ (rangeItemsShow.end > totalItem ? totalItem : rangeItemsShow.end) }}</span>
                    of
                    <span class="font-medium">{{ totalItem }}</span>
                    results
                </p>
            </div>
            <div>
                <div class="mt-2 relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    
                    <a 
                        class="cursor-pointer relative inline-flex items-center px-2 py-2 rounded-l-md border border-[#999] bg-[#2D2D2D] duration-200 text-sm font-medium text-[#999] hover:bg-[#222]"
                        :class="{'hidden': totalPage > limitPageShow}"
                        @click="onPage > 1 && onPage--"
                    >
                        <!-- <span @click="onPage > 1 && onPage--" class="sr-only">Previous</span> -->
                        <!-- Heroicon name: solid/chevron-left -->
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                    </a>

                    <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-[#2D2D2D] duration-200 border-[#999] text-[#999] hover:bg-[#222]" -->
                    <div :class="{'hidden': totalPage > limitPageShow}">
                        <a
                            v-for="page in totalPage" :key="page"
                            @click="onPage = page"
                            :class="{
                                'bg-[#222] text-sky-400 relative inline-flex items-center px-4 py-2 border border-sky-300 border-opacity-80 text-sm font-medium'
                                    : page === onPage,
                                'bg-[#2D2D2D] duration-200 border-[#999] text-[#999] hover:text-sky-400 hover:bg-[#222] hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium cursor-pointer'
                                    : page !== onPage
                            }"
                        >
                            {{ page }}
                        </a>
                    </div>
                    <!--
                        <a class="bg-[#2D2D2D] duration-200 border-[#999] text-[#999] hover:text-sky-400 hover:bg-[#222] relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 2 </a>
                        <span v-if="true" class="relative inline-flex items-center px-4 py-2 border border-[#999] bg-[#2D2D2D] duration-200 text-sm font-medium text-[#999]"> ... </span>
                        <a class="bg-[#2D2D2D] duration-200 border-[#999] text-[#999] hover:text-sky-400 hover:bg-[#222] hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"> 8 </a>
                    -->
                    <a 
                        class="cursor-pointer relative inline-flex items-center px-2 py-2 rounded-r-md border border-[#999] bg-[#2D2D2D] duration-200 text-sm font-medium text-[#999] hover:text-sky-400 hover:bg-[#222]"
                        :class="{'hidden': totalPage > limitPageShow}"
                        @click="onPage < totalPage && onPage++"
                    >
                        <!-- <span @click="onPage < totalPage && onPage++" class="sr-only">Next</span> -->
                        <!-- Heroicon name: solid/chevron-right -->
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                        </svg>
                    </a>

                </div>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'Pagination',
        data() {
            return {
                onPage: 1,
            }
        },
        props: {
            totalPage: {
                type: Number,
                required: true
            },
            totalItem: {
                type: Number,
                required: true
            },
            limitPageShow: {
                type: Number,
                default: 6
            },
            rangeItemsShow: {
                type: Object
            }
        },
        watch: {
            onPage: function(val) {
                this.$emit('onPage', val);
            }
        },
        mounted() {
            console.log(this.data);
        },
    }
</script>