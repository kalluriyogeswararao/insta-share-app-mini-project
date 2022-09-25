import React from 'react'

const searchContext = React.createContext({
  searchInput: '',
  changeSearchInput: () => {},
  onClickSearchButton: () => {},
})

export default searchContext
