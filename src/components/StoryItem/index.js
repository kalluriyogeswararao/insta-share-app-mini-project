import {Link} from 'react-router-dom'
import './index.css'

const StoryItem = props => {
  const {storyDetails} = props
  const {userId, storyUrl, username} = storyDetails

  return (
    <div>
      <Link to={`/users/${userId}`} className="link">
        <img src={storyUrl} alt="user story" className="user-story-image" />
        <p className="username">{username}</p>
      </Link>
    </div>
  )
}

export default StoryItem
