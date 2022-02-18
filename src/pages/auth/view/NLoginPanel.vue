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
} from 'naive-ui'
import config from '@csts/config'
import dict from '@csts/dict'
import { PersonOutline, LockClosedOutline, ShieldCheckmarkOutline } from '@vicons/ionicons5'
import NLangPicker from '@cocp/NLangPicker.vue'
import ParticlesBackground from '../component/ParticlesBackground.vue'
import CopyRight from '../component/CopyRight.vue'

</script>

<template>
    <particles-background></particles-background>
    <n-lang-picker></n-lang-picker>
    <div class="n-main-login-wrp">
        <div class="n-frame-work-title-wrp">
            <n-space align="center" justify="center">
                <div class="n-frame-work-logo">
                    <img :src="config.sysInfo.logo" alt="">
                </div>
                <div class="n-frame-work-title">Near-Admin</div>
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
                        label-placement="left"
                >
                    <n-form-item-row>
                        <n-input :placeholder="$t(dict.loginPanel.accountPhd)">
                            <template #prefix>
                                <n-icon :component="PersonOutline" />
                            </template>
                        </n-input>
                    </n-form-item-row>
                    <n-form-item-row>
                        <n-input type="password"
                                 show-password-on="click"
                                 :placeholder="$t(dict.loginPanel.passwordPhd)">
                            <template #prefix>
                                <n-icon :component="LockClosedOutline" />
                            </template>
                        </n-input>
                    </n-form-item-row>
                </n-form>
            </n-tab-pane>
            <n-tab-pane class="n-login-tab-pane"
                        name="login" :tab="$t(dict.loginPanel.phoneLogin)">
                <n-form
                        label-placement="left"
                >
                    <n-form-item-row>
                        <n-input :placeholder="$t(dict.loginPanel.accountPhd)">
                            <template #prefix>
                                <n-icon :component="PersonOutline" />
                            </template>
                        </n-input>
                    </n-form-item-row>
                    <n-form-item-row>
                        <n-space class="n-form-space" align="center" justify="space-between">
                            <n-input :placeholder="$t(dict.loginPanel.validateCodePhd)">
                                <template #prefix>
                                    <n-icon :component="ShieldCheckmarkOutline" />
                                </template>
                            </n-input>
                            <n-button type="primary">
                                {{ $t(dict.loginPanel.getValidateCode) }}
                            </n-button>
                        </n-space>
                    </n-form-item-row>
                </n-form>
            </n-tab-pane>
        </n-tabs>
        <n-space align="center" justify="space-between">
            <n-checkbox :label="$t(dict.loginPanel.autoLogin)" />
            <n-button class="n-link-btn" quaternary type="primary" tag="a">
                {{ $t(dict.loginPanel.forgetPwd) }}
            </n-button>
        </n-space>
        <n-button class="n-login-btn" type="primary" block>
            {{ $t(dict.loginPanel.loginBtn) }}
        </n-button>
    </div>
    <copy-right></copy-right>
</template>

<style lang="scss" scoped>
@import "~@csscss/loginpanel";
</style>
