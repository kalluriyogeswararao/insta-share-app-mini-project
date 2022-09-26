import React from 'react'

const searchContext = React.createContext({
  searchDataList: '',
  onClickSearchButton: () => {},
})

export default searchContext
