import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import {IoIosMenu} from 'react-icons/io'
import {ImCross} from 'react-icons/im'
import SearchContext from '../../SearchContext/SearchContext'

import './index.css'

class Header extends Component {
  state = {showDetails: false, showSearch: false}

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onClickMenu = () => {
    this.setState({showDetails: true, showSearch: false})
  }

  onClickCloseMenu = () => {
    this.setState({showDetails: false})
  }

  onShowSearch = () => {
    this.setState({showSearch: true, showDetails: false})
  }

  onRenderNavDetails = () => (
    <div className="small-screen-details">
      <Link to="/">
        <button type="button" className="nav-home-heading">
          Home
        </button>
      </Link>
      <button
        type="button"
        className="nav-home-heading"
        onClick={this.onShowSearch}
      >
        Search
      </button>
      <Link to="/my-profile">
        <button type="button" className="nav-profile-heading">
          Profile
        </button>
      </Link>
      <button type="button" className="logout-btn" onClick={this.onClickLogout}>
        Logout
      </button>
      <button
        type="button"
        className="close-btn"
        onClick={this.onClickCloseMenu}
      >
        <ImCross />
      </button>
    </div>
  )

  onShowSearchBar = () => (
    <SearchContext.Consumer>
      {value => {
        const {changeSearchInput, onClickSearchButton, searchInput} = value

        const onChangeInput = event => {
          changeSearchInput(event.target.value)
        }

        const onClickSearch = () => {
          onClickSearchButton()
        }

        return (
          <div className="popup-search-container">
            <input
              type="search"
              placeholder="Search"
              className="search-input"
              onChange={onChangeInput}
              value={searchInput}
            />
            <button
              type="button"
              className="search-btn"
              onClick={onClickSearch}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
        )
      }}
    </SearchContext.Consumer>
  )

  render() {
    const {showDetails, showSearch} = this.state
    return (
      <SearchContext.Consumer>
        {value => {
          const {searchInput, changeSearchInput, onClickSearchButton} = value

          const onChangeInput = event => {
            changeSearchInput(event.target.value)
          }

          const onClickSearch = () => {
            onClickSearchButton()
          }

          return (
            <>
              <nav className="navbar-container">
                <div className="header-container">
                  <div className="logo-container">
                    <Link to="/">
                      <img
                        src="https://res.cloudinary.com/ysdsp/image/upload/v1663996344/logo_wlcmi9.png"
                        alt="website logo"
                        className="website-header-logo"
                      />
                    </Link>
                    <h1 className="website-header-title">Insta Share</h1>
                  </div>
                  <div className="details-container">
                    <div className="search-container">
                      <input
                        type="search"
                        placeholder="Search"
                        className="search-input"
                        onChange={onChangeInput}
                        value={searchInput}
                      />
                      <button
                        type="button"
                        className="search-btn"
                        onClick={onClickSearch}
                      >
                        <BsSearch className="search-icon" />
                      </button>
                    </div>
                    <Link to="/">
                      <button type="button" className="nav-home-heading">
                        Home
                      </button>
                    </Link>
                    <Link to="/my-profile">
                      <button type="button" className="nav-profile-heading">
                        Profile
                      </button>
                    </Link>
                    <button
                      type="button"
                      className="logout-btn"
                      onClick={this.onClickLogout}
                    >
                      Logout
                    </button>
                  </div>
                  <button
                    type="button"
                    className="menu-button"
                    onClick={this.onClickMenu}
                  >
                    <IoIosMenu className="menu-icon" />
                  </button>
                </div>
              </nav>

              {showDetails && this.onRenderNavDetails()}
              {showSearch && this.onShowSearchBar()}
            </>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}

export default withRouter(Header)
