import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import StoryItem from '../StoryItem'

import './index.css'

const apiStatusConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
}

class InstaAllPosts extends Component {
  state = {postsList: [], apiStatus: apiStatusConstraints.initial}

  componentDidMount() {
    this.getUserStories()
  }

  getUserStories = async () => {
    this.setState({apiStatus: apiStatusConstraints.inprogress})
    const url = `https://apis.ccbp.in/insta-share/posts`
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
      const updatedData = data.posts.map(eachPost => ({
        createdAt: eachPost.created_at,
        comments: eachPost.comments.map(eachComment => ({
          comment: eachComment.comment,
          userId: eachComment.user_id,
          username: eachComment.user_name,
        })),
        postId: eachPost.post_id,
        profilePic: eachPost.profile_pic,
        userId: eachPost.user_id,
        username: eachPost.user_name,
        postDetails: {
          caption: eachPost.post_details.caption,
          imageUrl: eachPost.post_details.image_url,
        },
      }))
      this.setState({postsList: updatedData})
    } else {
      this.setState({apiStatus: apiStatusConstraints.failure})
    }
  }

  onRenderSuccessPageStories = () => {
    const {postsList} = this.state

    return (
      <ul className="all-posts">
        {postsList.map(eachStory => (
          <StoryItem storyDetails={eachStory} key={eachStory.userId} />
        ))}
      </ul>
    )
  }

  onRenderInprogress = () => (
    <div className="loader-container">
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
    return <div className="home-container">hgghgfhf</div>
  }
}

export default InstaAllPosts
