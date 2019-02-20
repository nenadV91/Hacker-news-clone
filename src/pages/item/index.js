import React, { Component } from 'react';
import axios from 'axios';
import Layout from 'components/layout';
import Story from 'components/story';
import Comments from 'components/comments';


class Item extends Component {
  state = {
    post: null,
    comments: null
  }

  fetchComments = async ids => {
    const res = await Promise.all(ids.map(async id => {
      const url = `${this.baseURL}/${id}.json`
      const { data } = await axios.get(url)

      if(data.kids) {
        const comments = await this.fetchComments(data.kids);
        data.comments = comments;
      }

      return data;
    }));

    return res;
  }


  fetchPost = async id => {
    const url = `${this.baseURL}/${id}.json`;
    const { data } = await axios.get(url);
    return data;
  }


  componentDidMount = async () => {
    this.baseURL = 'https://hacker-news.firebaseio.com/v0/item';
    const { match: { params: { id } } } = this.props;

    const post = await this.fetchPost(id)
    this.setState({ post })

    const comments = await this.fetchComments(post.kids)
    this.setState({ comments })
  }


  render() {
    let { post, comments } = this.state;

    return (
      <Layout>
        <Story data={post} />
        
        <div className="post-comments">
          <Comments data={comments} />
        </div>
      </Layout>
    );
  }
}

export default Item