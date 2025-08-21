import type { AxiosError } from "axios"


export const handleAxiosError = (error: AxiosError): string => {
  if (error.response) {
    return JSON.stringify(error.response.data)
  } else if (error.request) {
    return error.request.error
  } else {
    return `Error: ${error.message}`
  }
}
