import { defineStore } from 'pinia'
import { removeToken, toLogin } from '@/utils'
import { usePermissionStore, useTabStore } from '@/store'
import { resetRouter } from '@/router'
import { removeLocal, setLocal, setToken } from '@/utils'
import { UserInfo } from './type'
import api from '@/api'
import { login } from '@/api/user/index'
import type { LoginItem, LoginResult } from '@/api/user/type'
import { AxiosResponse } from 'axios'

export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: <UserInfo>{},
    }
  },
  getters: {
    userId(): string {
      return this.userInfo.id || ''
    },
    name(): string {
      return this.userInfo.name || ''
    },
    avatar(): string {
      return this.userInfo.avatar || ''
    },
    role(): Array<string> {
      return this.userInfo.role || []
    },
  },
  // 异步逻辑
  actions: {
    async userLogin(loginItem: LoginItem) {
      const res: AxiosResponse<LoginResult, any> = await login(loginItem)
      if (res.data.code === 200) {
        setToken(res.data.data)
        return Promise.resolve(res.data)
      } else {
        return Promise.reject(new Error(res.data.msg))
      }
    },
    async getUserInfo() {
      try {
        const res: any = await api.getUser()
        if (res.code === 200) {
          const { id, name, avatar, role } = res.data
          this.userInfo = { id, name, avatar, role }
          return Promise.resolve(res.data)
        } else {
          return Promise.reject(res)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async userLogout() {
      const { resetTabs } = useTabStore()
      const { resetPermission } = usePermissionStore()
      removeToken()
      resetPermission()
      resetTabs()
      resetRouter()
      this.$reset()
      toLogin()
    },
    setUserInfo(userInfo = {}) {
      this.userInfo = { ...this.userInfo, ...userInfo }
    },
  },
})
