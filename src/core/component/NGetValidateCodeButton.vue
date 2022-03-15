<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import i18n from '@colocale/lang'
import { NButton, useMessage } from 'naive-ui'
import dict from '@cots/dict'

const message = useMessage()

const emit = defineEmits(['click'])

const props = defineProps({
    delay: {
        type: Number,
        default: 60
    },
    cacheKey: {
        type: String,
        default: 'cacheTriggerTime'
    },
    ableTrigger: {
        type: Boolean,
        default: false
    }
})

const isTrigger = ref(false)

const remainDelay = ref(props.delay)

const cacheTriggerTime = () => {
    window.localStorage.setItem(props.cacheKey as string, new Date().getTime().toString())
}

const startTimer = () => {
    const timer = setInterval(() => {
        remainDelay.value = remainDelay.value as number - 1
        if (remainDelay.value === 0) {
            clearInterval(timer)
            isTrigger.value = false
            remainDelay.value = props.delay
            localStorage.removeItem(props.cacheKey as string)
        }
    }, 1000)
    cacheTriggerTime()
}

const triggerValidate = () => {
    if (props.ableTrigger) {
        isTrigger.value = !isTrigger.value
        startTimer()
        emit('click')
    } else {
        message.warning(i18n.t(dict.validateButton.unableValidate))
    }
}

const initRemainDelay = () => {
    const hasCacheTriggerTime = Number(window.localStorage.getItem(props.cacheKey as string))
    if (!Number.isNaN(hasCacheTriggerTime)) {
        const currentTime = new Date().getTime()
        const delayGap = props.delay as number * 1000
        if (currentTime - hasCacheTriggerTime < delayGap) {
            remainDelay.value = Math.ceil(
                (hasCacheTriggerTime + delayGap - currentTime) / 1000
            )
            isTrigger.value = true
            startTimer()
        } else {
            localStorage.removeItem(props.cacheKey as string)
        }
    }
}

onMounted(() => {
    initRemainDelay()
})

</script>

<template>
    <n-button :disabled="isTrigger"
              class="n-code-btn"
              :type="isTrigger ? 'default' : 'primary'"
              @click="triggerValidate">
        {{ isTrigger ? `${remainDelay}s` : $t(dict.validateButton.getValidateCode) }}
    </n-button>
</template>

<style lang="scss" scoped></style>
