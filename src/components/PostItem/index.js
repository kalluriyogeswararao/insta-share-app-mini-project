import {Link} from 'react-router-dom'
import {BsHeart} from 'react-icons/bs'
import {ImShare2} from 'react-icons/im'
import {FaRegComment} from 'react-icons/fa'
import {FcLike} from 'react-icons/fc'
import './index.css'

const PostItem = props => {
  const {postDetailsData, onClickLikeIcon} = props
  const {
    createdAt,
    comments,
    postId,
    profilePic,
    userUserId,
    likesCount,
    userUsername,
    postDetails,
    isLike,
  } = postDetailsData
  const {caption, imageUrl} = postDetails

  const onClickLike = () => {
    onClickLikeIcon({postId, isLike})
  }

  return (
    <li className="post-details">
      <Link to={`/users/${userUserId}`} className="user-details-container">
        <img
          src={profilePic}
          alt="post author profile"
          className="profile-pic"
        />
        <p className="user-username">{userUsername}</p>
      </Link>

      <img src={imageUrl} alt="post" className="post-image" />
      <div className="post-details-container">
        <div className="icons-container">
          {isLike && (
            <button type="button" className="like-btn" onClick={onClickLike}>
              <FcLike className="like-icon" />
            </button>
          )}

          {!isLike && (
            <button type="button" className="like-btn" onClick={onClickLike}>
              <BsHeart className="like-icon" />
            </button>
          )}
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
          <p className="comment" key={each.comment}>
            {each.username} <span className="caption">{each.comment}</span>
          </p>
        ))}
        <p className="date">{createdAt}</p>
      </div>
    </li>
  )
}

export default PostItem
