import { request } from '@/utils'
import type { LoginItem } from './type'
import type { AxiosRequestConfig } from 'axios'

enum API {
  BASE_URL = '',
  LOGIN_URL = BASE_URL + '/login',
  CAPTCHA_IMG_URL = BASE_URL + '/captchaImage',
}

export const login = (data: LoginItem) =>
  request.post(API.LOGIN_URL, data, {
    headers: { isToken: false },
  } as AxiosRequestConfig)

export const getCodeImg = () =>
  request.get(API.CAPTCHA_IMG_URL, {
    headers: { isToken: false },
  } as AxiosRequestConfig)
