import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {BsSearch} from 'react-icons/bs'
import {IoIosMenu} from 'react-icons/io'
import {ImCross} from 'react-icons/im'

import './index.css'

const Header = props => {
  const {history} = props

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar-container">
      <div className="header-container">
        <div className="logo-container">
          <img
            src="https://res.cloudinary.com/ysdsp/image/upload/v1663996344/logo_wlcmi9.png"
            alt="website logo"
            className="website-header-logo"
          />
          <h1 className="website-header-title">Insta Share</h1>
        </div>
        <div className="details-container">
          <div className="search-container">
            <input
              type="search"
              placeholder="Search"
              className="search-input"
            />
            <button type="button" className="search-btn">
              <BsSearch className="search-icon" />
            </button>
          </div>
          <Link to="/">
            <button type="button" className="nav-home-heading">
              Home
            </button>
          </Link>
          <Link to="/profile">
            <button type="button" className="nav-profile-heading">
              Profile
            </button>
          </Link>
          <button type="button" className="logout-btn" onClick={onClickLogout}>
            Logout
          </button>
        </div>
        <div className="popup-container">
          <Popup
            trigger={
              <button type="button" className="menu-button">
                <IoIosMenu className="menu-icon" />
              </button>
            }
          >
            {close => (
              <div className="small-screen-details">
                <Link to="/">
                  <button type="button" className="nav-home-heading">
                    Home
                  </button>
                </Link>
                <button type="button" className="nav-home-heading">
                  Search
                </button>
                <Link to="/profile">
                  <button type="button" className="nav-profile-heading">
                    Profile
                  </button>
                </Link>
                <button
                  type="button"
                  className="logout-btn"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
                <button
                  type="button"
                  className="close-btn"
                  onClick={() => close()}
                >
                  <ImCross />
                </button>
              </div>
            )}
          </Popup>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
