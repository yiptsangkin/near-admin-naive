<script lang="ts" setup>
import {
    NTabs,
    NTabPane,
    NForm,
    NFormItemRow,
    NInput,
    NIcon,
    NButton,
    NSpace,
    NCheckbox,
    NLayout,
    useMessage
} from 'naive-ui'
import { ref, computed } from 'vue'
import dict from '@csts/dict'
import i18n from '@colocale/lang'
import utils from '@csts/utils'
import csstore from '@csstore/index'
import api from '@api/auth/apiMethod'
import { PersonOutline, LockClosedOutline, ShieldCheckmarkOutline } from '@vicons/ionicons5'
import NLangPicker from '@cocp/NLangPicker.vue'
import NGetValidateCodeButton from '@cocp/NGetValidateCodeButton.vue'
import ParticlesBackground from '../../component/ParticlesBackground.vue'
import CopyRight from '../../component/CopyRight.vue'

const store = csstore()
const message = useMessage()

const accountForm = ref({
    model: {
        username: undefined,
        password: undefined,
        validateCode: undefined,
    },
    rules: {
        username: {
            required: true,
            trigger: 'blur',
            message: i18n.t(dict.loginPanel.accountReq),
        },
        password: {
            required: true,
            trigger: 'blur',
            message: i18n.t(dict.loginPanel.passwordReq),
        },
        validateCode: {
            required: true,
            trigger: 'blur',
            message: i18n.t(dict.loginPanel.validateCodeReq),
        },
    }
})

const ableGetValidateCode = computed(() => {
    if (accountForm.value.model.username && utils.checkChinesePhone(accountForm.value.model.username)) {
        return true
    }
    return false
})

const getValidateCode = () => {
    api.sendMessage({
        data: {},
        success (res) {
            message.warning(`${i18n.t(dict.loginPanel.validateTip)}:${res.msgCode}`)
        }
    })
}

</script>

<template>
    <n-layout class="full-height">
        <particles-background></particles-background>
        <n-lang-picker class="auth-lang-picker-wrp"></n-lang-picker>
        <div class="n-main-login-wrp">
            <div class="n-frame-work-title-wrp">
                <n-space align="center" justify="center">
                    <div class="n-frame-work-logo">
                        <img :src="store.sysInfo.logo" alt="">
                    </div>
                    <div class="n-frame-work-title">{{ store.sysInfo.name }}</div>
                </n-space>
            </div>
            <div class="n-frame-work-desc">{{ $t(dict.sysInfo.description) }}</div>
            <n-tabs
                    class="n-login-panel"
                    default-value="account"
                    type="line"
                    justify-content="space-evenly"
            >
                <n-tab-pane class="n-login-tab-pane"
                            name="account" :tab="$t(dict.loginPanel.accountLogin)">
                    <n-form
                            :model="accountForm.model"
                            :rules="accountForm.rules"
                            label-placement="left"
                    >
                        <n-form-item-row path="username">
                            <n-input v-model:value="accountForm.model.username"
                                     :placeholder="$t(dict.loginPanel.accountPhd)">
                                <template #prefix>
                                    <n-icon :component="PersonOutline"/>
                                </template>
                            </n-input>
                        </n-form-item-row>
                        <n-form-item-row path="password">
                            <n-input type="password"
                                     v-model:value="accountForm.model.password"
                                     show-password-on="click"
                                     :placeholder="$t(dict.loginPanel.passwordPhd)">
                                <template #prefix>
                                    <n-icon :component="LockClosedOutline"/>
                                </template>
                            </n-input>
                        </n-form-item-row>
                    </n-form>
                </n-tab-pane>
                <n-tab-pane class="n-login-tab-pane"
                            name="login" :tab="$t(dict.loginPanel.phoneLogin)">
                    <n-form
                            :model="accountForm.model"
                            :rules="accountForm.rules"
                            label-placement="left"
                    >
                        <n-form-item-row path="username">
                            <n-input v-model:value="accountForm.model.username"
                                     :placeholder="$t(dict.loginPanel.accountPhd)">
                                <template #prefix>
                                    <n-icon :component="PersonOutline"/>
                                </template>
                            </n-input>
                        </n-form-item-row>
                        <n-form-item-row path="validateCode">
                            <n-space class="n-form-space" align="center" justify="space-between">
                                <n-input v-model:value="accountForm.model.validateCode"
                                         :placeholder="$t(dict.loginPanel.validateCodePhd)">
                                    <template #prefix>
                                        <n-icon :component="ShieldCheckmarkOutline"/>
                                    </template>
                                </n-input>
                                <n-get-validate-code-button
                                        @click="getValidateCode"
                                        :able-trigger="ableGetValidateCode"
                                ></n-get-validate-code-button>
                            </n-space>
                        </n-form-item-row>
                    </n-form>
                </n-tab-pane>
            </n-tabs>
            <n-space align="center" justify="space-between">
                <n-checkbox :label="$t(dict.loginPanel.autoLogin)"/>
                <n-button class="n-link-btn" quaternary type="primary" tag="a">
                    {{ $t(dict.loginPanel.forgetPwd) }}
                </n-button>
            </n-space>
            <n-button class="n-login-btn" type="primary" block>
                {{ $t(dict.loginPanel.loginBtn) }}
            </n-button>
        </div>
        <copy-right></copy-right>
    </n-layout>
</template>

<style lang="scss" scoped>
@import "~@csscss/loginpanel";
</style>
