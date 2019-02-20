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