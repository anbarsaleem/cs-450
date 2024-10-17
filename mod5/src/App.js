import React, { Component } from "react";
import * as d3 from "d3";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { x: 10, y: 1.5 },
        { x: 20, y: 3 },
        { x: 30, y: 4.5 },
        { x: 40, y: 6 },
        { x: 50, y: 8 },
      ],
    };
  }
  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    this.renderChart();
  }

  renderChart() {
    // Set the dimensions and margins of the graph
    const margin = { top: 50, right: 10, bottom: 50, left: 30 },
      w = 500 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;

    const data = this.state.data;

  }

  render() {
    return (
      <svg className="child1_svg">
        <g className="g_1"></g>
      </svg>
    );
  }
}

export default App;

