import React from "react";
import HashLoader from "react-spinners/HashLoader";

class LoadingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  render() {
    return (
      <div className="sweet-loading">
        <HashLoader
          className="loading-component"
          size={50}
          color={"#123abc"}
          loading={this.state.loading}
        />
      </div>
    );
  }
}
export default LoadingComponent;
