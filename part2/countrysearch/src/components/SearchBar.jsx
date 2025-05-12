const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const handleQueryChange = (event) => {
    setSearchQuery(event.target.value)
  }

  return (
    <>
      find countries <input value={searchQuery === null ? "" : searchQuery} onChange={handleQueryChange} />
    </>
  )
}

export default SearchBar