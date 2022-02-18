<script lang="ts" setup>
import {
    NSpace,
    NButton
} from 'naive-ui'

const currentYear = new Date().getFullYear()
</script>

<template>
    <n-space class="n-copyright" align="center" justify="center">
        <div>
            <n-button class="n-link-btn" quaternary
                      type="primary" tag="a" href="https://github.com/yiptsangkin/near-admin-naive"
                      target="_blank">
                Near-Admin
            </n-button>
        </div>
        <div>
            Copyright © {{ currentYear }} Near Yip
        </div>
    </n-space>
</template>

<style lang="scss" scoped>
@import "~@csscss/copyright";
</style>
