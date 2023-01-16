import React, { useState, useEffect } from "react";
import LoadingGif from "./LoadingGif";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [loading, setLoading] = useState(false);

  const update = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    props.setProgress(30);
    let data = await fetch(url);
    let parsedData = await data.json();
    props.setProgress(50);
    setArticles(parsedData.articles);
    setTotalArticles(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalArticles(parsedData.totalResults);
    setPage(page + 1);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - Newz`;
    update();
  }, []);

  return (
    <>
      <h1 className="text-center" style={{ marginTop: "70px" }}>
        Newz - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <LoadingGif />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalArticles}
        loader={<LoadingGif />}
      >
        <div className="container">
          <div className="row">
            {articles.map((elem) => {
              return (
                <div className="col-md-4 my-4" key={elem.url}>
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
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  pageSize: 6,
  country: "in",
  category: "general",
};

News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string,
};

export default News;
