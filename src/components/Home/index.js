import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import InstaAllPosts from '../InstaAllPosts'
import StoryItem from '../StoryItem'
import SearchContext from '../../SearchContext/SearchContext'
import SearchResults from '../SearchResults'

import './index.css'

const apiStatusConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    storiesList: [],
    apiStatus: apiStatusConstraints.initial,
  }

  componentDidMount() {
    this.getUserStories()
  }

  getUserStories = async () => {
    this.setState({apiStatus: apiStatusConstraints.inprogress})
    const url = `https://apis.ccbp.in/insta-share/stories`
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
      const updatedData = data.users_stories.map(each => ({
        storyUrl: each.story_url,
        userId: each.user_id,
        username: each.user_name,
      }))
      this.setState({
        storiesList: updatedData,
        apiStatus: apiStatusConstraints.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstraints.failure})
    }
  }

  onClickTryAgain = () => {
    this.getUserStories()
  }

  onRenderSuccessPageStories = () => {
    const settings = {
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
      ],
    }
    const {storiesList} = this.state

    return (
      <div className="all-stories">
        <ul>
          <Slider {...settings}>
            {storiesList.map(eachStory => (
              <StoryItem storyDetails={eachStory} key={eachStory.userId} />
            ))}
          </Slider>
        </ul>
      </div>
    )
  }

  onRenderInprogress = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#4094EF" height={30} width={30} />
    </div>
  )

  onRenderFailurePage = () => (
    <div className="something-container">
      <img
        src="https://res.cloudinary.com/ysdsp/image/upload/v1664183855/opps_b7yfve.png"
        alt="failure view"
        className="oops-error"
      />
      <p className="wrong-error">Something went wrong. Please try again</p>
      <button
        type="button"
        className="try-again-btn"
        onClick={this.onClickTryAgain}
      >
        Try again
      </button>
    </div>
  )

  onRenderStories = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstraints.inprogress:
        return this.onRenderInprogress()
      case apiStatusConstraints.success:
        return this.onRenderSuccessPageStories()
      case apiStatusConstraints.failure:
        return this.onRenderFailurePage()
      default:
        return null
    }
  }

  onRenderResults = () => (
    <div className="home-container">
      <Header />
      <div className="stories-posts-container">
        {this.onRenderStories()}
        <InstaAllPosts />
        <SearchResults />
      </div>
    </div>
  )

  onRenderSearchResults = () => (
    <div className="home-container">
      <Header />
      <div className="stories-posts-container">
        <SearchResults />
      </div>
    </div>
  )

  render() {
    return (
      <SearchContext.Consumer>
        {value => {
          const {searchInput} = value
          if (searchInput !== '') {
            return this.onRenderSearchResults()
          }
          return this.onRenderResults()
        }}
      </SearchContext.Consumer>
    )
  }
}

export default Home
