import { useDispatch } from 'react-redux'
import { filterChange } from "../reducers/filterReducer.js";

const Filter = () => {
  const dispatch = useDispatch()


  const handleChange = (event) => {
    event.preventDefault()
    const filter = event.target.value
    dispatch(filterChange(filter))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input name="filter" onChange={handleChange} />
    </div>
  )
}

export default Filter