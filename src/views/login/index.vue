<!-- eslint-disable no-debugger -->
<!-- eslint-disable no-undef -->
<script setup lang="ts">
import bgImg from '@/assets/images/login_bg.webp'
import { useStorage } from '@vueuse/core'
import { getCodeImg } from '@/api/user/index'
import { getLocal, removeLocal, setLocal } from '@/utils'
import type { LoginItem, CaptchaImageResult } from '@/api/user/type'
import { useUserStore } from '~/src/store'
import { AxiosResponse } from 'axios'

const title: string = import.meta.env.VITE_APP_TITLE

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const query = route.query

const codeURL = ref<string>('')
// 验证码开关
const captchaOnOff = ref<boolean>(true)
const loging = ref<boolean>(false)
const isRemember = useStorage('isRemember', false)
const loginItem = ref<LoginItem>({
  username: '',
  password: '',
  code: '',
  uuid: '',
})

const localLoginInfo = getLocal('loginInfo') as LoginItem
if (localLoginInfo) {
  loginItem.value.username = localLoginInfo.username || ''
  loginItem.value.password = localLoginInfo.password || ''
}
function getCode() {
  getCodeImg().then((res: AxiosResponse<CaptchaImageResult, any>) => {
    const data = res.data.data
    captchaOnOff.value = data.captchaOnOff === undefined ? true : data.captchaOnOff
    if (captchaOnOff.value) {
      codeURL.value = data.img
      loginItem.value.uuid = data.uuid
    }
  })
}

async function handleLogin() {
  const { username, password, code, uuid } = loginItem.value
  if (!username || !password) {
    window.$message?.warning('请输入用户名和密码')
    return
  }
  if (!code) {
    window.$message?.warning('请输入验证码')
    return
  }

  loging.value = true
  try {
    await userStore.userLogin({
      username,
      password: password.toString(),
      code: code.toString(),
      uuid: uuid,
    })
    if (isRemember.value) setLocal('loginInfo', { username, password }, 60 * 30)
    else removeLocal('loginInfo')

    if (query.redirect) {
      const path = query.redirect as string
      Reflect.deleteProperty(query, 'redirect')
      router.push({ path, query })
    } else {
      router.push('/')
      window.$message?.success('登录成功')
    }
  } catch (error) {
    window.$message?.error((error as Error).message)
    console.log(error)
  }

  loging.value = false
}

getCode()
</script>

<template>
  <AppPage :show-footer="true" bg-cover :style="{ backgroundImage: `url(${bgImg})` }">
    <div m-auto p-15 f-c-c min-w-345 rounded-10 card-shadow bg-white dark:bg-dark bg-opacity-60>
      <div w-380 hidden md:block px-20 py-35>
        <img src="@/assets/images/login_banner.webp" w-full alt="login_banner" />
      </div>

      <div w-320 flex-col px-20 py-35>
        <h5 f-c-c text-24 font-normal color="#6a6a6a">
          <icon-custom-logo mr-30 text-50 color-primary />
          {{ title }}
        </h5>
        <div mt-30>
          <n-input
            v-model:value="loginItem.username"
            autofocus
            class="text-16 items-center h-40 pl-10"
            placeholder="用户名/邮箱"
            :maxlength="20"
          >
            <template #prefix>
              <n-icon size="16">
                <icon-mdi:account-outline></icon-mdi:account-outline>
              </n-icon>
            </template>
          </n-input>
        </div>
        <div mt-20>
          <n-input
            v-model:value="loginItem.password"
            class="text-16 items-center h-40 pl-10"
            type="password"
            show-password-on="mousedown"
            placeholder="密码"
            :maxlength="20"
          >
            <template #prefix>
              <n-icon size="16">
                <icon-mdi:lock-outline></icon-mdi:lock-outline>
              </n-icon>
            </template>
          </n-input>
        </div>
        <div mt-20 v-if="captchaOnOff">
          <n-input
            v-model:value="loginItem.code"
            class="text-16 items-center h-40 pl-10"
            style="width: 60%"
            placeholder="验证码"
            :maxlength="6"
          >
            <template #prefix>
              <n-icon size="16">
                <icon-mdi:check-circle-outline></icon-mdi:check-circle-outline>
              </n-icon>
            </template>
          </n-input>
          <div style="width: 33%; cursor: pointer; vertical-align: middle" h-40 float-right>
            <img :src="codeURL" @click="getCode" />
          </div>
        </div>
        <div mt-30>
          <n-checkbox
            :checked="isRemember"
            label="记住我"
            :on-update:checked="(val:boolean) => (isRemember = val)"
          />
        </div>

        <div mt-20>
          <n-button
            w-full
            h-50
            rounded-5
            text-16
            type="primary"
            :loading="loging"
            @click="handleLogin"
          >
            登录
          </n-button>
        </div>
      </div>
    </div>
  </AppPage>
</template>
