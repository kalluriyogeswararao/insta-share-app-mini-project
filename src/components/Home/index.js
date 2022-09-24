import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

class Home extends Component {
  state = {storiesList: []}

  componentDidMount() {
    this.getUserStories()
  }

  getUserStories = async () => {
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
      console.log(updatedData)
      this.setState({storiesList: updatedData})
    }
  }

  render() {
    return (
      <div>
        <Header />
      </div>
    )
  }
}

export default Home
