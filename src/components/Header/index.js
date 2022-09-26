import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import {IoIosMenu} from 'react-icons/io'
import {ImCross} from 'react-icons/im'

import './index.css'

class Header extends Component {
  state = {
    showDetails: false,
    showSearch: false,
    searchInput: '',
  }

  updateListData = data => {
    const {receiveData} = this.props
    receiveData(data)
  }

  onClickSearch = async () => {
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = data.posts.map(eachPost => ({
        createdAt: eachPost.created_at,
        isLike: false,
        comments: eachPost.comments.map(eachComment => ({
          comment: eachComment.comment,
          userId: eachComment.user_id,
          username: eachComment.user_name,
        })),
        postId: eachPost.post_id,
        likesCount: eachPost.likes_count,
        profilePic: eachPost.profile_pic,
        userUserId: eachPost.user_id,
        userUsername: eachPost.user_name,
        postDetails: {
          caption: eachPost.post_details.caption,
          imageUrl: eachPost.post_details.image_url,
        },
      }))

      this.updateListData(updatedData)
    }
  }

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

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
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

  onShowSearchBar = () => {
    const {searchInput} = this.state
    return (
      <div className="popup-search-container">
        <input
          type="search"
          placeholder="Search"
          className="search-input"
          onChange={this.onChangeInput}
          value={searchInput}
        />
        <button
          type="button"
          className="search-btn"
          onClick={this.onClickSearch}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  render() {
    const {showDetails, showSearch, searchInput} = this.state
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
                  onChange={this.onChangeInput}
                  value={searchInput}
                />
                <button
                  type="button"
                  className="search-btn"
                  onClick={this.onClickSearch}
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
  }
}

export default withRouter(Header)
