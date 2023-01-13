import React, { Component } from "react";
import LoadingGif from "./LoadingGif";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    pageSize: 6,
    country: "in",
    category: "general",
  };
  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - Newz`
  }

  update = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=617e04b0ea3242e4bdcb9cdc653a1953&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false,
    });
  };

  async componentDidMount() {
    this.update();
  };

  handlePreviClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.update();
  };

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.update();
  };

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  render() {
    return (
      <div>
        <div className="container my-3">
          <h1 className="text-center">
            Newz - Top {this.capitalizeFirstLetter(this.props.category)} Headlines
          </h1>
          {this.state.loading && <LoadingGif />}
          <div className="row my-3">
            {!this.state.loading &&
              this.state.articles.map((elem) => {
                return (
                  <div className="col-md-4 my-3" key={elem.url}>
                    <NewsItem
                      title={
                        !elem.title
                          ? "For more details click read more button"
                          : elem.title
                      }
                      description={
                        !elem.description
                          ? "For more details click read more button"
                          : elem.description
                      }
                      imageUrl={
                        !elem.urlToImage
                          ? "https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg"
                          : elem.urlToImage
                      }
                      newsUrl={elem.url}
                      author={!elem.author ? "Unknown" : elem.author}
                      time={new Date(elem.publishedAt).toGMTString()}
                      source={elem.source.name}
                    />
                  </div>
                );
              })}
          </div>
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalArticles / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
