import { request } from '@/utils'
import type { LoginInfo } from './type'
import type { RequestConfig } from '~/types/axios'

enum API {
  LOGIN_URL = '/auth/login',
}

export const login = (data: LoginInfo) =>
  request.post(API.LOGIN_URL, data, { noNeedToken: true } as RequestConfig)
