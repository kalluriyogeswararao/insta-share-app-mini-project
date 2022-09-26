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
  state = {searchDataList: 'dfdf'}

  onClickSearchButton = data => {
    this.setState({searchDataList: data})
  }

  render() {
    const {searchDataList} = this.state

    return (
      <SearchContext.Provider
        value={{
          searchDataList,
          onClickSearchButton: this.onClickSearchButton,
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
