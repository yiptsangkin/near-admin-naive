<script lang="ts" setup>
import {
    NAvatar
} from 'naive-ui'
import csstore from '@csstore/index'

defineProps({
    size: {
        type: String || Number,
        default: 'small',
    }
})

const store = csstore()

</script>

<template>
    <n-avatar
            round
            :size="size"
            :src="store.userInfo.userAvatar"
    />
</template>

<style lang="scss" scoped></style>
