import { useState } from 'react'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = (event) => {
    setValue('')
  }

  return {
    input: {
      type,
      value,
      onChange
    },
    value,
    reset
  }
}

export default useField