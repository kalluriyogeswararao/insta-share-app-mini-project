import {Component} from 'react'

import {Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import MyProfile from './components/MyProfile'
import UserProfile from './components/UserProfile'
import NotFound from './components/NotFound'
import SearchContext from './SearchContext/SearchContext'
import './App.css'

class App extends Component {
  state = {inputText: '', searchInput: ''}

  changeInput = value => {
    this.setState({inputText: value})
  }

  clickSearch = () => {
    const {inputText} = this.state
    this.setState({searchInput: inputText})
  }

  render() {
    const {inputText, searchInput} = this.state
    return (
      <SearchContext.Provider
        value={{
          inputText,
          searchInput,
          changeInput: this.changeInput,
          clickSearch: this.clickSearch,
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
