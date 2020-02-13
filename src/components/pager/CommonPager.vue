<template>
  <el-pagination
    background
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    :page-sizes="pageSizes">
  </el-pagination>
</template>

<script>
  export default {
    name: 'CommonPager',
    data() {
      return {
        pageSizes: [10, 20, 30]
      }
    },
    props: {
      total: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<style scoped>

</style>
