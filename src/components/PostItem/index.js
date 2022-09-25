import {Link} from 'react-router-dom'
import {BsHeart} from 'react-icons/bs'
import {ImShare2} from 'react-icons/im'
import {FaRegComment} from 'react-icons/fa'
import './index.css'

const PostItem = props => {
  const {postDetailsData} = props
  const {
    createdAt,
    comments,
    postId,
    profilePic,
    userUserId,
    likesCount,
    userUsername,
    postDetails,
  } = postDetailsData
  const {caption, imageUrl} = postDetails

  return (
    <li className="post-details">
      <Link to={`/user/${userUserId}`} className="user-details-container">
        <img
          src={profilePic}
          alt="post author profile"
          className="profile-pic"
        />
        <p className="user-username">{userUsername}</p>
      </Link>

      <Link to={`/posts/${postId}/like`} className="link">
        <img src={imageUrl} alt="post author profile" className="post-image" />
        <div className="post-details-container">
          <div className="icons-container">
            <button type="button" className="like-btn">
              <BsHeart className="like-icon" />
            </button>
            <button type="button" className="like-btn">
              <FaRegComment className="like-icon" />
            </button>
            <button type="button" className="like-btn">
              <ImShare2 className="like-icon" />
            </button>
          </div>
          <p className="like">{likesCount} likes</p>
          <p className="caption">{caption}</p>
          {comments.map(each => (
            <p className="comment">
              {each.username} <span className="caption">{each.comment}</span>
            </p>
          ))}
          <p className="date">{createdAt}</p>
        </div>
      </Link>
    </li>
  )
}

export default PostItem
