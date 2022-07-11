<template>
  <el-card>
        <template #header>
      <div class="card-header">通用后台管理系统</div>
        </template>
      <el-form 
        ref="ruleFormRef"
      :model="form"
      label-width="80px"
      :rules="rules"
      >
        <el-form-item label="用户名" prop="userName">
            <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
        </el-form-item> 
        <el-form-item label="密码" prop="passWord">
            <el-input v-model="form.passWord" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="success" @click="login(ruleFormRef)">登录</el-button>
        </el-form-item>
      </el-form>
  </el-card>
</template>

<script setup> 
import { reactive, ref } from 'vue'
import { nameRule, passRule } from '@/utils/vaidate.js'
import { userLogin } from '@/api/user.js'
import { useRouter } from 'vue-router'
import { setCookie } from '@/utils/token'
const router = useRouter()
const form = reactive({
    userName: 'admin',
    passWord: '123456Aa'
})
const rules = reactive({
    userName:[
        { validator: nameRule, trigger: 'blur' },
    ],
    passWord: [
        { validator: passRule, trigger: 'blur' },

    ]
})
const ruleFormRef = ref()
const login = (formEL) => {
    if(!formEL) return 
    formEL.validate((valid) => {
        if(valid) {
           userLogin(form).then( ({ data }) => {
                console.log(data); 
                setCookie('token', data.token)  
                router.push('/home')
           })
        } else {
            console.log('error');
        }
    })
}
</script>

<style lang="scss" scoped>

.el-card {
    width: 400px;
    margin: 200px auto;
    text-align: center;
    .card-header {
        font-size: 20px;
    }
    .el-form {
         .el-button {
        width: 100%;
        }
    }
   
}
</style>