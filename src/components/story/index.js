import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class Story extends Component {
  render() {
    let { data, index } = this.props;
    const date = moment(moment.unix(data.time), "YYYYMMDD").fromNow()
    const url = `/item/${data.id}`

    return (
      <div className="story">
        {index && <div className="story-index">{index}. </div>}
        
        <div className="story-body">
          <a 
          href={data.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="story-title no-decoration">{data.title}</a>

          <div className="story-info">
            <div className="points">
              <span>{data.score}</span>
              <span>points</span>
            </div>

            <div className="author">
              <span>by</span>
              <span><a href="author">{data.by}</a></span>
            </div>

            <div className="time no-margin">
              <span className="no-margin">{date}</span>
            </div>

            <span className="separator">|</span>

            <div className="comments">
              <Link to={url}>
                <span>{data.descendants}</span>
                <span>comments</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Story