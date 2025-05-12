const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const handleQueryChange = (event) => {
    setSearchQuery(event.target.value)
  }

  return (
    <>
      filter shown with <input value={searchQuery} onChange={handleQueryChange} />
    </>
  )
}

export default SearchBar
