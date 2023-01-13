import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl,author,time,source } = this.props;
    return (
      <div>
        <div className="card">
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"80%",zIndex:"1"}}>
                {source}
            </span>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">
              {title.length >= 40 ? title.slice(0, 40) + "..." : title}
            </h5>
            <p className="card-text">
              {description.length > 80
                ? description.slice(0, 80) + "..."
                : description}
            </p>
            <p className="card-text"><small className="text-muted">By {author} on {time}</small></p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
