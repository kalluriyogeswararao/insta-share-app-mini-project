import {Component} from 'react'

import {Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import MyProfile from './components/MyProfile'
import UserProfile from './components/UserProfile'
import SearchContext from './SearchContext/SearchContext'
import './App.css'

class App extends Component {
  state = {searchInput: '', inputData: ''}

  changeSearchInput = value => {
    this.setState({searchInput: value})
  }

  onClickSearchButton = () => {
    const {searchInput} = this.state
    this.setState({inputData: searchInput})
  }

  render() {
    const {searchInput, inputData} = this.state
    console.log(inputData)
    return (
      <SearchContext.Provider
        value={{
          searchInput,
          inputData,
          changeSearchInput: this.changeSearchInput,
          onClickSearchButton: this.onClickSearchButton,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/my-profile" component={MyProfile} />
          <ProtectedRoute exact path="/users/:id" component={UserProfile} />
        </Switch>
      </SearchContext.Provider>
    )
  }
}

export default App
