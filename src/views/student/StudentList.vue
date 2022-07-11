<template>
<!-- 查询表单 -->
<el-form :inline="true" class="demo-form-inline">
    <el-form-item label="姓名">
      <el-input v-model="userName" placeholder="请输入姓名" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onReset">重置</el-button>
    </el-form-item>
  </el-form>
<!-- 表格 -->
  <el-table :data="filterList" stripe style="width: 100%">
    <el-table-column prop="name" label="姓名" align="center"/>
    <el-table-column prop="age" label="年龄" align="center"/>
    <el-table-column prop="sex_text" label="性别" align="center"/>
    <el-table-column prop="number" label="学号" align="center"/>
    <el-table-column prop="class" label="班级" align="center"/>
    <el-table-column prop="state_text" label="状态" align="center"/>
    <el-table-column prop="address" label="家庭地址" width="180px" align="center"/>
    <el-table-column prop="phone" label="联系方式" width="180px" align="center"/>
    <el-table-column label="编辑" width="80px" align="center">
      <template #default="scope">
       <el-button type="danger" :icon="Delete" @click="deleteList(scope.row)"/>
      </template>
    </el-table-column>
  </el-table> 
  <!-- 分页 -->
    <Pagination :student="student" @cart-list="addList"/>
</template>

<script setup>
import { deleteStudent, studentList } from '@/api/student';
import { computed, ref, reactive, onMounted } from 'vue';
import { Delete } from '@element-plus/icons-vue'
import Pagination from '@/components/pagination.vue'
components: {
  Pagination
}
const student = ref([])
// 分页
const filterList = ref([])
const addList = (val) => {
  filterList.value = val
}
// 获取数据函数
const getList = (userName) => { 
  return studentList(userName)
  .then( data => {
  data.data.forEach(item => {
    item.sex === 1? item.sex_text = '男': item.sex_text = '女'
    item.state === "1" ? item.state_text = '已入学' : item.state === '2'? item.state_text = '未入学': item.state_text = '休学中'
  });
  student.value = data
}).catch(error => {
    throw error
})
}
// 调用
getList('')
// 删除按钮
const deleteList = ({id}) => {
   ElMessageBox.confirm(
    '确定删除该信息吗?',
    '注意',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
        // 删除API
      deleteStudent(id).then( data => {
         ElMessage({
        type: 'success',
        message: data.message,
        })
        InfoList()
      }).catch(error => {
         ElMessage({
        type: 'warning',
        message: error.message,
        })
      })
     
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消成功',
      })
    })
}

// 筛选表单
const userName = ref('')
// 查询
const onSubmit = () => {
  getList(userName.value)
}
// 重置
const onReset = () => {
  getList('')
}
</script>

<style lang="scss" scoped>

</style>