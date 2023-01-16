import React from "react";
import loading from "./Loading.gif";

const LoadingGif =()=>{
    return (
      <div>
        <div className="text-center">
          <img className="my-4" src={loading} alt="Loading" />
        </div>
      </div>
    );
}

export default LoadingGif;
