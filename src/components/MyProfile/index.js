import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsGrid3X3} from 'react-icons/bs'
import {AiFillCamera} from 'react-icons/ai'
import Header from '../Header'

import './index.css'

const apiStatusConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
}

class MyProfile extends Component {
  state = {myProfileDetails: [], apiStatus: apiStatusConstraints.initial}

  componentDidMount() {
    this.getUserStories()
  }

  getUserStories = async () => {
    this.setState({apiStatus: apiStatusConstraints.inprogress})
    const url = `https://apis.ccbp.in/insta-share/my-profile`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      const updatedData = {
        followersCount: data.profile.followers_count,
        followingCount: data.profile.following_count,
        id: data.profile.id,
        postsCount: data.profile.posts_count,
        profilePic: data.profile.profile_pic,
        userBio: data.profile.user_bio,
        userId: data.profile.user_id,
        username: data.profile.user_name,
        posts: data.profile.posts,
        stories: data.profile.stories,
      }

      this.setState({
        apiStatus: apiStatusConstraints.success,
        myProfileDetails: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstraints.failure})
    }
  }

  onRenderPosts = posts => (
    <ul className="all-posts-list">
      {posts.map(post => (
        <li className="post-item">
          <img src={post.image} alt="my post" className="post" />
        </li>
      ))}
    </ul>
  )

  onRenderEmpty = () => (
    <div>
      <AiFillCamera className="camera-icon" />
      <p className="no-posts">No Posts Yet</p>
    </div>
  )

  onRenderAllPosts = () => {
    const {myProfileDetails} = this.state
    const {posts} = myProfileDetails

    if (posts.length > 0) {
      return this.onRenderPosts(posts)
    }
    return this.onRenderEmpty()
  }

  onRenderSuccessPageStories = () => {
    const {myProfileDetails} = this.state
    const {
      profilePic,
      username,
      followersCount,
      followingCount,
      postsCount,
      userId,
      userBio,
      stories,
    } = myProfileDetails

    return (
      <div className="all">
        <div className="profile-container">
          <img src={profilePic} alt="my profile" className="my-profile-image" />
          <div className="profile-details-container">
            <p className="profile-username">{username}</p>
            <div className="posts-followers-container">
              <p className="posts">
                {postsCount} <span className="span">posts</span>
              </p>
              <p className="posts">
                {followersCount} <span className="span">followers</span>
              </p>
              <p className="posts">
                {followingCount} <span className="span"> following</span>
              </p>
            </div>
            <p className="user-id">{userId}</p>
            <p>{userBio}</p>
          </div>
        </div>
        <ul className="my-profile-stories">
          {stories.map(item => (
            <li key={item.id} className="story">
              <img src={item.image} alt="my story" className="image" />
            </li>
          ))}
        </ul>
        <hr className="hr-line" />
        <div className="grid-icon-container">
          <BsGrid3X3 className="grid-icon" />
          <p className="post-heading">Posts</p>
        </div>

        {this.onRenderAllPosts()}
      </div>
    )
  }

  onRenderInprogress = () => (
    <div className="my-profile-loader-container">
      <Loader type="TailSpin" color="#4094EF" height={30} width={30} />
    </div>
  )

  onRenderFailurePage = () => {}

  onRenderStories = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstraints.inprogress:
        return this.onRenderInprogress()
      case apiStatusConstraints.success:
        return this.onRenderSuccessPageStories()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-container">
        <Header />
        <div className="posts-container">{this.onRenderStories()}</div>
      </div>
    )
  }
}

export default MyProfile
