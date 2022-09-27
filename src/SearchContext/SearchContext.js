import React from 'react'

const searchContext = React.createContext({
  onClickSearchButton: () => {},
  enterInput: '',
  searchInput: '',
  onChangeSearchInput: () => {},
})

export default searchContext
