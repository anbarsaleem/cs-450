import React, { Component } from "react";
import * as d3 from "d3";
import "./Child1.css";

class Child1 extends Component {
  state = {
    company: "Apple",
    selectedMonth: "November",
  };


  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    this.renderChart();
  }

  renderChart = () => {
    const { csv_data } = this.props;
    const { company, selectedMonth } = this.state;

    const filteredData = csv_data.filter(
      (item) =>
        item.Company === company &&
        item.Date.toLocaleString("default", { month: "long" }) === selectedMonth
    );

    const svgWidth = 800;
    const svgHeight = 400;
    const margin = { top: 20, right: 30, bottom: 50, left: 60 };

    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    d3.select("#chart").selectAll("*").remove(); // Clear prev chart

    const svg = d3
      .select("#chart")
      .attr("width", width)
      .attr("height", height)
      //.attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
      //.attr("preserveAspectRatio", "xMinYMin meet")
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(filteredData, (d) => d.Date))
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([
        d3.min(filteredData, (d) => Math.min(d.Open, d.Close)) - 5,
        d3.max(filteredData, (d) => Math.max(d.Open, d.Close)) + 5,
      ])
      .range([height, 0]);

    // Axes
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("text-anchor", "end")
      .attr("dx", "4.3em")
      .attr("dy", "0.5em")
      .attr("transform", "rotate(45)");

    svg.append("g").call(d3.axisLeft(yScale));

    // Lines
    const lineOpen = d3
      .line()
      .x((d) => xScale(d.Date))
      .y((d) => yScale(d.Open));

    const lineClose = d3
      .line()
      .x((d) => xScale(d.Date))
      .y((d) => yScale(d.Close));

    svg
      .append("path")
      .datum(filteredData)
      .attr("fill", "none")
      .attr("stroke", "#b2df8a") // Open line color
      .attr("stroke-width", 2)
      .attr("d", lineOpen);

    svg
      .append("path")
      .datum(filteredData)
      .attr("fill", "none")
      .attr("stroke", "#e41a1c") // Close line color
      .attr("stroke-width", 2)
      .attr("d", lineClose);

    // Circles
    svg
      .selectAll(".dot")
      .data(filteredData)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.Date))
      .attr("cy", (d) => yScale(d.Open))
      .attr("r", 4)
      .attr("fill", "#b2df8a")
      .on("mouseover", (event, d) => {
        const tooltip = d3.select("#tooltip");
        tooltip
          .style("opacity", 1)
          .html(
            `Date: ${d.Date.toDateString()}<br>Open: ${d.Open}<br>Close: ${
              d.Close
            }<br>Difference: ${(d.Close - d.Open).toFixed(2)}`
          )
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", () => {
        d3.select("#tooltip").style("opacity", 0);
      });

    svg
      .selectAll(".dot-close")
      .data(filteredData)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.Date))
      .attr("cy", (d) => yScale(d.Close))
      .attr("r", 4)
      .attr("fill", "#e41a1c");

    // legend
    const legend = svg
      .append("g")
      .attr("transform", `translate(${width - 50}, 5)`);

    // Close line legend
    legend
      .append("rect")
      .attr("x", 0)
      .attr("y", 25)
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", "#e41a1c");

    legend
      .append("text")
      .attr("x", 30)
      .attr("y", 35)
      .text("Close")
      .style("font-size", "12px")
      .attr("alignment-baseline", "middle")
      .attr("fill", "black");

    // Open line legend
    legend
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", "#b2df8a");

    legend
      .append("text")
      .attr("x", 30)
      .attr("y", 10)
      .text("Open")
      .style("font-size", "12px")
      .attr("alignment-baseline", "middle")
      .attr("fill", "black");
  };

  render() {
    const options = ["Apple", "Microsoft", "Amazon", "Google", "Meta"];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return (
      <div>
        <div>
          <h3>Select a Company</h3>
          {options.map((option) => (
            <label key={option}>
              <input
                type="radio"
                value={option}
                checked={this.state.company === option}
                onChange={(e) => this.setState({ company: e.target.value })}
              />
              {option}
            </label>
          ))}
        </div>
        <div>
          <h3>Select a Month</h3>
          <select
            value={this.state.selectedMonth}
            onChange={(e) => this.setState({ selectedMonth: e.target.value })}
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <svg id="chart"></svg>
        <div id="tooltip" style={{ position: "absolute", opacity: 0 }}></div>
      </div>
    );
  }
}

export default Child1;
