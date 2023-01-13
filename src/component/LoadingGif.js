import React, { Component } from "react";
import loading from "./Loading.gif";

export class LoadingGif extends Component {
  render() {
    return (
      <div>
        <div className="text-center">
          <img className="my-3" src={loading} alt="Loading" />
        </div>
      </div>
    );
  }
}

export default LoadingGif;
