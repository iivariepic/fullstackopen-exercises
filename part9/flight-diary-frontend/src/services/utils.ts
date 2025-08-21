import type { AxiosError } from "axios"

export const handleAxiosError = (error: AxiosError)=> {
  if (error.response) console.error(error.response.data)
  else if (error.request) console.error(error.request)
  else console.error(`Error ${error.message}`)
  return
}