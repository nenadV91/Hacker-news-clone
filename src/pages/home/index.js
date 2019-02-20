import React, { Component } from 'react';
import axios from 'axios';
import Layout from 'components/layout'
import Story from 'components/story';

class Home extends Component {
  state = {
    news: null,
    size: 30,
    page: 0
  }

  fetchStories = async ids => {
    let { page, size } = this.state;
    const start = page * size;
    const base = 'https://hacker-news.firebaseio.com/v0';
    const input = ids.slice(start, start + size).map(id => `${base}/item/${id}.json`);

    try {
      const data = await Promise.all(input.map(link => axios.get(link)))
      return data.map(({ data }) => data)
    } catch (err) {
      console.log(err)
    }
  }


  componentWillMount = async () => {
    const base = 'https://hacker-news.firebaseio.com/v0';
    const path = '/topstories.json'

    try {
      const ids = await axios.get(`${base}/${path}`);
      const news = await this.fetchStories(ids.data)
      this.setState({ news })
    } catch (err) {
      console.log(err)
    }
  }


  renderNews = () => {
    const { news } = this.state;

    if(news === null) {
      return <div className="loading">Loading news...</div>
    }

    if(!news.length) {
      return <div className="loading">Nothing found.</div>
    }

    return news.map((item, index) =>
      <Story index={index + 1} key={item.id} data={item} />
    )
  }


  render() {
    return (
      <Layout>
        {this.renderNews()}
      </Layout>
    );
  }
}

export default Home