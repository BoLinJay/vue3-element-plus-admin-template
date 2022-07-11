<template>
  <!-- 表格 -->
  <el-table :data="worksList.data" stripe style="width: 100%">
    <el-table-column prop="id" label="用户ID" align="center"/>
    <el-table-column prop="userId" label="所属班级" align="center"/>
    <el-table-column prop="title" label="作业名称" align="center"/>
    <el-table-column prop="completed_text" label="完成情况" align="center"/>
    <el-table-column label="编辑" width="80px" align="center">
      <template #default="scope">
       <el-button type="danger" :icon="Delete" @click="deleteList(scope.row)"/>
      </template>
    </el-table-column>
  </el-table> 
  <!-- 分页 -->
    <Pagination 
    :student="worksList"  
    @change-size="changeSize" 
    @change-page="changePage" 
    />
</template>

<script setup>
import { getWorksList } from '@/api/student.js'
import { computed, nextTick, ref, watch } from 'vue';
import { Delete } from '@element-plus/icons-vue'
import Pagination from '@/components/pagination.vue'
components: {
  Pagination
}
watch(
  () => [size.value, page.value],
  ([sizeNewV, pageNewV]) => {
      getworks(pageNewV, sizeNewV)
  },{ immediate: true}
)

</script>

<script>
const worksList = ref([])
const openList = ref([])
const size = ref(10)
const page = ref(1)
const getworks = (page, size) => {
    return getWorksList(page, size).then( data => {
        data.data.forEach(element => {
            element.completed === 'true'? element.completed_text = '是': element.completed_text = '否'
        });
        worksList.value = data
    }).catch( err => {
        throw err
    })
}

// 分页数据
const changeSize = (val) => {
  size.value = val
}
const changePage = (val) => {
  page.value = val
}

</script>

<style>

</style>

