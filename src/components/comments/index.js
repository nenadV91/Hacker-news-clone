import React, { Component } from 'react';
import Comment from 'components/comment';

class Comments extends Component {
  render() {
    let { data } = this.props;

    if(data === null) {
      return <div 
      className="loading">
      Loading comments...</div>
    }

    if(data === false) {
      return null;
    }

    if(!data.length) {
      return <div 
      className="text-light">
      No comments found.</div>
    }

    return (
      <div>
        {data.map(comment =>
          <Comment 
          key={comment.id} 
          data={comment} />)}
      </div>
    )
  }
}

export default Comments