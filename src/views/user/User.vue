<template>
  <el-tree
    ref="treeRef"
    :data="menu"
    show-checkbox
    default-expand-all
    node-key="id"
    highlight-current
    :props="defaultProps"
  />
  <el-Button @click="getCheckedNodes ">通过node获取</el-Button>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const menu = ref([])
const treeRef = ref(null)
menu.value = [...router.options.routes]
const defaultProps = {
  children: 'children',
  label: 'name',
}
const getCheckedNodes  = () => {
    console.log(treeRef.value.getCheckedNodes(false, false));
}
</script>

<style>

</style>