<script lang="ts" setup>
import costore from '@costore/index'

const store = costore()

const currentCp = store.curTabList[store.curTabIdx]
</script>

<template>
    <iframe :title="currentCp.label" class="n-webview-iframe" :src="currentCp.params.pageUrl"></iframe>
</template>

<style lang="scss" scoped>
@import '~@coscss/nwebview';
</style>
