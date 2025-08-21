import axios, { isAxiosError } from 'axios';
import type { DiaryEntry } from "../types.ts"
import { handleAxiosError } from "./utils.ts"

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaryEntries = async () => {
  try {
    const response = await axios.get<DiaryEntry[]>(baseUrl)
    return response.data
  } catch(error) {
    if (isAxiosError(error)) {
      handleAxiosError(error)
    }
    console.error(error)
  }
}
