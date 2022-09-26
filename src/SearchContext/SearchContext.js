import React from 'react'

const searchContext = React.createContext({
  searchInput: '',
  search: false,
  inputData: '',
  changeSearchInput: () => {},
  onClickSearchButton: () => {},
  resetSearch: () => {},
})

export default searchContext
