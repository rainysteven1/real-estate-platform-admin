import { defineStore } from 'pinia'
import { filterAsyncRoutes } from './helpers'
import { asyncRoutes, constantRoutes } from '@/router/routes'
import type { RoutesType } from '~/types/router'

export const usePermissionStore = defineStore('permission', {
  state() {
    return {
      accessRoutes: <RoutesType>[],
    }
  },
  getters: {
    routes(): RoutesType {
      return constantRoutes.concat(this.accessRoutes)
    },
    menus(): RoutesType {
      return this.routes.filter((route) => route.name && !route.isHidden)
    },
  },
  actions: {
    generateRoutes(role: Array<string> = []): RoutesType {
      const accessRoutes = filterAsyncRoutes(asyncRoutes, role)
      this.accessRoutes = accessRoutes
      return accessRoutes
    },
    resetPermission() {
      this.$reset()
    },
  },
})
