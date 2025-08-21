import axios from 'axios';
import type { DiaryEntry, NewDiaryEntry } from "../types.ts"

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaryEntries = async () => {
  try {
    const response = await axios.get<DiaryEntry[]>(baseUrl)
    return response.data
  } catch(error) {
    throw error
  }
}

export const createDiaryEntry = async (entry: NewDiaryEntry) => {
  try {
    const response = await axios.post<DiaryEntry>(baseUrl, entry)
    return response.data
  } catch(error) {
    throw error
  }
}
