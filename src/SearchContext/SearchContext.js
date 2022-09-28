import React from 'react'

const SearchContext = React.createContext({
  inputText: '',
  searchInput: '',
  changeInput: () => {},
  clickSearch: () => {},
})

export default SearchContext
