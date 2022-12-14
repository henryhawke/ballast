import React, { Component } from "react";
import App from "base-shell/lib";
import config from "./config";
// import prime from "./prime";

// const startPrime = setInterval(prime, 60000);

export default class Demo extends Component {
  // componentDidMount() {
  //   startPrime();
  // }

  // componentWillUnmount() {
  //   clearInterval(startPrime);
  // }
  render() {
    return <App config={config} />;
  }
}
