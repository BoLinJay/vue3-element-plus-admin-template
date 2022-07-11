<template>
  <el-menu
        active-text-color="#ffd04b"
        background-color="#0f52ba"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        router
      >
      <template v-for="(item, index) in menu" :key="index">
        <el-sub-menu :index="index + ''" v-if="!item.hidden">
          <template #title >
            <span>{{item.name}}</span>
          </template>
            <el-menu-item :index="child.path" v-for="(child, i) in item.children" :key="i">{{child.name}}</el-menu-item>
        </el-sub-menu>
      </template>
        <el-menu-item index="/home/user">用户中心</el-menu-item>
      </el-menu>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'
const menu = ref([])
const router = useRouter()
menu.value = [...router.options.routes]
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  border: 0;
}
</style>