import React, { Component } from 'react';
import axios from 'axios';
import Layout from 'components/layout'
import Story from 'components/story';
import { Link } from 'react-router-dom';

class Home extends Component {
  state = {
    loading: false,
    ids: null,
    news: null,
    size: 30,
    page: 0
  }

  componentDidUpdate = prev => {
    const page = this.props.match.params.page || 0;

    if(page !== this.state.page) {
      this.setState({ page, loading: true }, async () => {
        const news = await this.fetchStories()
        this.setState({ news, loading: false })
      })
    }
  }

  componentWillMount = async () => {
    this.base = 'https://hacker-news.firebaseio.com/v0'
    const url = `${this.base}/topstories.json`;
    const { match: { params: { page } } } = this.props;

    if(page) {
      this.setState({ page })
    }

    try {
      const ids = await axios.get(url);
      this.setState({ ids: ids.data, loading: true }, async () => {
        const news = await this.fetchStories()
        this.setState({ news, loading: false })
      })
    } catch (err) {
      console.log(err)
    }
  }

  fetchStories = async () => {
    let { page, size, ids } = this.state;
    const start = page * size;
    const input = ids.slice(start, start + size).map(id => {
      return `${this.base}/item/${id}.json`
    });

    try {
      const data = await Promise.all(input.map(link => axios.get(link)))
      return data.map(({ data }) => data)
    } catch (err) {
      console.log(err)
    }
  }

  renderNews = () => {
    const { news, loading, page, size } = this.state;

    if(news === null || loading) {
      return <div className="loading">Loading news...</div>
    }

    if(!news.length) {
      return <div className="loading">Nothing found.</div>
    }

    return news.map((item, index) =>
      <Story index={page * size + index + 1} key={item.id} data={item} />
    )
  }


  render() {
    let { page, loading, news } = this.state;
    let nextPage = `/page/${+page + 1}`

    return (
      <Layout>
        {this.renderNews()}

        {(!loading && news && news.length) ? <Link 
        className = "next-page"
        to={nextPage}>More</Link> : null}
      </Layout>
    );
  }
}

export default Home