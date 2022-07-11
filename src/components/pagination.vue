<template>
  <div class="demo-pagination-block pagination">
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 50, 100, 200]"
      background
      layout="total, sizes, prev, pager, next"
      :total="student.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"  
    />
  </div>
</template>

<script setup>
import {ref,computed, watch, onMounted, nextTick, onUpdated} from 'vue'
const props = defineProps({
    student: {
        type: Object,
        default: () => {}
    }
})
const emit = defineEmits(['cart-list', 'change-size', 'change-page'])
const currentPage = ref(1)
const pageSize = ref(10)
const handleSizeChange = (val) => {
    pageSize.value = val
}
const handleCurrentChange = (val) => {
    currentPage.value = val
}
const List = computed(
 () => {
        return props.student.data.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value)
        },
)
onUpdated(() => {
    emit('cart-list', List.value)
    emit('change-size', pageSize.value)
    emit('change-page', currentPage.value)
})

</script>

<style lang="scss" scoped>
.pagination {
  margin: 10px 0 5px 0;
}
</style>