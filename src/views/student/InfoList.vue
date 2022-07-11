<template>
  <el-button type="danger" :icon="CirclePlus" circle @click="addButton('add')" class="addButon"/>
<!-- 弹出框 -->
<el-dialog v-model="dialogFormVisible" :title="(submitSchema==='add'?'添加':'修改') + '学生信息'">
    <el-form :model="form" label-width="120px">
    <el-form-item label="姓名">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="年龄">
      <el-input v-model="form.age" />
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="form.sex">
        <el-radio label="1">男</el-radio>
        <el-radio label="2">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="父亲姓名">
      <el-input v-model="form.father" />
    </el-form-item>
    <el-form-item label="母亲姓名">
      <el-input v-model="form.mather" />
    </el-form-item>
    <el-form-item label="入校时间">
      <el-col :span="11">
        <el-date-picker
          v-model="form.time"
          type="date"
          placeholder="Pick a date"
          style="width: 100%"
        />
      </el-col>
    </el-form-item>
    <el-form-item label="家庭住址">
      <el-input v-model.number="form.address" />
    </el-form-item>
    <el-form-item label="联系方式">
      <el-input v-model.number="form.phone" />
    </el-form-item>
  </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onReset">重置</el-button>
        <el-button type="primary" @click="onSubmit">{{submitSchema==='add'?'提交':'修改'}}</el-button>
      </span>
    </template>
  </el-dialog>
<!-- 表格 -->
  <el-table :data="filterList" stripe style="width: 100%">
    <el-table-column prop="name" label="姓名" align="center"/>
    <el-table-column prop="age" label="年龄" align="center"/>
    <el-table-column prop="sex_text" label="性别" align="center"/>
    <el-table-column prop="father" label="父亲姓名" align="center"/>
    <el-table-column prop="mather" label="母亲姓名" align="center"/>
    <el-table-column prop="time" label="入校时间" width="110px" align="center"/>
    <el-table-column prop="address" label="家庭住址" width="180px" align="center"/>
    <el-table-column prop="phone" label="联系方式" width="180px" align="center"/>
    <el-table-column label="编辑" width="150px" align="center">
      <template #default="scope">
       <el-button type="primary" :icon="Edit" circle  @click="onEdit('edit')"/>
       <el-button type="danger" :icon="Delete" circle @click="deleteInfoList(scope.row)"/>
      </template>
    </el-table-column>
  </el-table> 
  <!-- 分页 -->
    <Pagination :student="student" @cart-list="addList"/>
</template>

<script setup>
import { getInfoList, deleteInfo, Info } from '@/api/student';
import { computed, ref, reactive } from 'vue';
import { Delete, Edit, CirclePlus } from '@element-plus/icons-vue'
import Pagination from '@/components/pagination.vue'
components: {
  Pagination
}
const student = ref([])
// 获取数据函数
const InfoList = () => { 
  return getInfoList()
  .then( data => {
  student.value = data
  data.data.forEach(item => {
    item.sex === 1? item.sex_text = '男': item.sex_text = '女'
    item.state === "1" ? item.state_text = '已入学' : item.state === '2'? item.state_text = '未入学': item.state_text = '休学中'
  });
}).catch(error => {
    throw error
})
}
// 调用
InfoList()

// 分页
const filterList = ref([])
const addList = (val) => {
  filterList.value = val
}

// 删除按钮
const deleteInfoList = ({id}) => {
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
      deleteInfo(id).then( data => {
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

//弹出框（添加）
const dialogFormVisible = ref(false)
const form = reactive({
  name: '',
  age: '',
  sex: '',
  father: '',
  mather: '',
  time: '',
  address: '',
  phone: '',
})
const submitSchema = ref('')
// 新增按钮
const addButton = (add) => {
  dialogFormVisible.value = true
  submitSchema.value = add
}
// 修改按钮
const onEdit = (edit) => {
  dialogFormVisible.value = true
  submitSchema.value = edit
}
// Info API成功后的复用函数
const successFul = (data) => {
   ElMessage({
      message: data.message,
      type: 'success'
    })
     // 清空数据
    for(let i in form ) {
      form[i] = ''
    }
}
// 确认按钮
const onSubmit = () => {
  dialogFormVisible.value = false
  if(submitSchema.value === 'add') {
      //添加信息API
    Info( 'post', form).then( data => {
      successFul(data)
  }).catch( error => {
    console.log(error);
  })
  } else if(submitSchema.value === 'edit') {
     // 编辑信息API
    Info( 'put', form).then( data => {
      successFul(data)
    }).catch( error => {
      console.log(error);
    })
    }
  InfoList()
}
// 重置按钮
const onReset = () => {
  // 清空数据
  for(let i in form ) {
    form[i] = ''
  }
}

</script>

<style lang="scss" scoped>
.pagination {
  margin: 10px 0 5px 0;
}
.addButon {
  margin: 5px 0 5px 20px;
}
</style>