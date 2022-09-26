import {Component} from 'react'
import Cookies from 'js-cookie'
import SearchContext from '../../SearchContext/SearchContext'
import PostItem from '../PostItem'

import './index.css'

class SearchResults extends Component {
  state = {searchList: []}

  onRenderSearchResults = async inputData => {
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts?search=${inputData}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

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
      this.setState({searchList: updatedData})
    }
  }

  onClickLikeIcon = async data => {
    const {postId, isLike} = data
    const jwtToken = Cookies.get('jwt_token')
    const likeStatus = {
      like_status: !isLike,
    }
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(likeStatus),
    }

    const response = await fetch(url, options)
    const status = await response.json()

    if (status.message === 'Post has been liked') {
      this.setState(prevState => ({
        searchList: prevState.searchList.map(each => {
          if (postId === each.postId) {
            return {...each, isLike: true, likesCount: each.likesCount + 1}
          }
          return {...each}
        }),
      }))
    } else {
      this.setState(prevState => ({
        searchList: prevState.searchList.map(each => {
          if (postId === each.postId) {
            return {...each, isLike: false, likesCount: each.likesCount - 1}
          }
          return {...each}
        }),
      }))
    }
  }

  onRenderPosts = () => {
    const {searchList} = this.state
    return (
      <ul className="all-posts">
        {searchList.map(eachPost => (
          <PostItem
            postDetailsData={eachPost}
            key={eachPost.postId}
            onClickLikeIcon={this.onClickLikeIcon}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <>
        <SearchContext.Consumer>
          {value => {
            const {search, inputData, resetSearch} = value

            if (search === true) {
              this.onRenderSearchResults(inputData)
              resetSearch()
            }
          }}
        </SearchContext.Consumer>

        {this.onRenderPosts()}
      </>
    )
  }
}

export default SearchResults
