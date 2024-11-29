import React, { Component } from "react";
import "./App.css";
import FileUpload from "./FileUpload";
import Child1 from "./Child1";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  set_data = (data) => {
    this.setState({ data: data });
  };

  render() {
    return (
      <div>
        <FileUpload set_data={this.set_data}></FileUpload>
        <div className="parent">
          <Child1 csv_data={this.state.data}></Child1>
        </div>
      </div>
    );
  }
}

export default App;
