import {Component} from 'react'

import {Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import MyProfile from './components/MyProfile'
import UserProfile from './components/UserProfile'
import SearchContext from './SearchContext/SearchContext'
import NotFound from './components/NotFound'
import './App.css'

class App extends Component {
  state = {enterInput: '', searchInput: ''}

  onClickSearchButton = () => {
    const {enterInput} = this.state
    this.setState({searchInput: enterInput})
  }

  onChangeSearchInput = value => {
    this.setState({enterInput: value})
  }

  render() {
    const {enterInput, searchInput} = this.state

    return (
      <SearchContext.Provider
        value={{
          enterInput,
          searchInput,
          onClickSearchButton: this.onClickSearchButton,
          onChangeSearchInput: this.onChangeSearchInput,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/my-profile" component={MyProfile} />
          <ProtectedRoute exact path="/users/:id" component={UserProfile} />
          <Route component={NotFound} />
        </Switch>
      </SearchContext.Provider>
    )
  }
}

export default App
