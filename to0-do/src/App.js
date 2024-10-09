import React, { Component } from "react";
import * as d3 from "d3";

class App extends Component {
  componentDidMount() {
    var data1 = [
      { x: 20, y: 20 },
      { x: 60, y: 20 },
      { x: 100, y: 60 },
      { x: 170, y: 80 },
    ];

    d3.select('.mysvg').selectAll("circle").data(data1)
      .join("circle") // Directly using "circle" here tells D3 to append circles for new data
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", 10)
        .attr("fill", 'green')
  }

  render() {
    return (
      <div className="mydiv">
        <svg className="mysvg" width="760" height="600">
          <circle className="c3" cx="120" cy="250" r="10" fill="gray" />
          <circle id="c_id4" cx="240" cy="250" r="10" fill="gray" />
        </svg>
      </div>
    );
  }
}

export default App;
