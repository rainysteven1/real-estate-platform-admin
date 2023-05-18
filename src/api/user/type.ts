import type { BasicResult } from '../type'

export interface LoginItem {
  username: string
  password: string
  code: string
  uuid: string
}
interface CaptchaImageDataType {
  img: string
  uuid: string
  captchaOnOff?: boolean
}

export type LoginResult = BasicResult<string>

export type CaptchaImageResult = BasicResult<CaptchaImageDataType>
