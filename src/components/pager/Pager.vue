<template>
    <el-pagination
        background
        layout="sizes, prev, pager, next, jumper, total"
        :total="page.total"
        :page-size="page.size"
        :page-sizes="page.sizes"
        :current-page="page.current"
        @size-change="sizeChange"
        @current-change="currentChange"
      ></el-pagination>
</template>