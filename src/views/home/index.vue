<template>
   <div class="common-layout">
      <el-container>
      <el-header><Header/></el-header>
      <BreadCrumb class="bread"/>
      <el-container class="content">
        <el-aside width="200px"><Aside/></el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
          <el-footer><Footer/></el-footer>
        </el-container>
      </el-container>
      </el-container>
  </div>
</template>

<script setup>
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
import Aside from '@/components/aside.vue'
import BreadCrumb from '@/components/BreadCrumb.vue'
components: {
  Header,
  Footer,
  Aside,
  BreadCrumb
}
</script>

<style lang="scss" scoped>
.common-layout {
  .content {
    position: absolute;
    width: 100%;
    top: 50px;
    bottom: 0;
    .el-main {
      margin-top: 60px;
    }
  }
  .el-header {
    padding: 0;
    height: 50px;
  }

}
</style>