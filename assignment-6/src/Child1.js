import React, { Component } from "react";
import * as d3 from "d3";

class Child1 extends Component {
  constructor(props) {
    super(props);
    this.createStreamgraph = this.createStreamgraph.bind(this);
    this.showTooltip = this.showTooltip.bind(this);
  }

  componentDidMount() {
    if (this.props.csv_data) {
      this.createStreamgraph(this.props.csv_data);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.csv_data !== prevProps.csv_data) {
      this.createStreamgraph(this.props.csv_data);
    }
  }

  createStreamgraph(data) {
    d3.select(this.refs.streamgraph).selectAll("*").remove();

    const margin = { top: 20, right: 220, bottom: 50, left: 50 },
      width = 700 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    const svg = d3
      .select(this.refs.streamgraph)
      .append("svg")
      .attr("width", width + margin.left + margin.right + 200)
      .attr("height", height + margin.top + margin.bottom);

    const mainGroup = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const keys = Object.keys(data[0]).filter((key) => key !== "Date");

    const colorPalette = ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00"];
    const colors = {};
    keys.forEach((key, index) => {
      colors[key] = colorPalette[index % colorPalette.length];
    });

    const parseDate = d3.timeParse("%Y/%m/%d");

    data.forEach(function (d) {
      d.Date = parseDate(d.Date);
      keys.forEach(function (k) {
        d[k] = +d[k];
      });
    });

    const x = d3
      .scaleTime()
      .domain(
        d3.extent(data, function (d) {
          return d.Date;
        })
      )
      .range([0, width]);

    const y = d3.scaleLinear().range([height, 0]);

    const stack = d3
      .stack()
      .keys(keys)
      .offset(d3.stackOffsetSilhouette);

    const stackedData = stack(data);

    y.domain([
      d3.min(stackedData, function (layer) {
        return d3.min(layer, function (d) {
          return d[0];
        });
      }),
      d3.max(stackedData, function (layer) {
        return d3.max(layer, function (d) {
          return d[1];
        });
      }),
    ]);

    const area = d3
      .area()
      .x(function (d) {
        return x(d.data.Date);
      })
      .y0(function (d) {
        return y(d[0]);
      })
      .y1(function (d) {
        return y(d[1]);
      })
      .curve(d3.curveBasis);

    const layers = mainGroup
      .selectAll(".layer")
      .data(stackedData)
      .enter()
      .append("g")
      .attr("class", "layer");

    layers
      .append("path")
      .attr("class", "area")
      .attr("d", area)
      .style("fill", function (d) {
        return colors[d.key];
      });

    const xAxis = d3.axisBottom(x).tickFormat(d3.timeFormat("%b"));

    mainGroup
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    // Adjust legend keys to match the stacking order
    const legendKeys = stackedData.map((d) => d.key).reverse();

    const legend = svg
      .selectAll(".legend")
      .data(legendKeys)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr(
        "transform",
        (d, i) =>
          "translate(" +
          (width + margin.left + 20) +
          "," +
          (margin.top + i * 25) +
          ")"
      );

    legend
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", (d) => colors[d]);

    legend
      .append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .text((d) => d);

    // Create tooltip container
    const tooltip = d3
      .select(this.refs.streamgraph)
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background-color", "white")
      .style("padding", "5px")
      .style("border", "1px solid #ccc")
      .style("pointer-events", "none");

    tooltip.append("svg").attr("class", "mini-chart");

    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .style("fill", "none")
      .style("pointer-events", "all")
      .on("mousemove", (event) => {
        const [mouseX, mouseY] = d3.pointer(event, svg.node());

        const xm = x.invert(mouseX - margin.left);
        const ym = y.invert(mouseY - margin.top);

        let found = false;

        for (let i = 0; i < stackedData.length; i++) {
          const layer = stackedData[i];
          for (let j = 0; j < layer.length - 1; j++) {
            if (
              layer[j].data.Date <= xm &&
              layer[j + 1].data.Date >= xm
            ) {
              const y0 = layer[j][0];
              const y1 = layer[j][1];
              if (ym >= y0 && ym <= y1) {
                const d = layer;
                found = true;
                tooltip.style("opacity", 1);
                this.showTooltip(event, d, data, colors);
                break;
              }
            }
          }
          if (found) break;
        }

        if (!found) {
          tooltip.style("opacity", 0);
        }
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });
  }

  showTooltip(event, d, data, colors) {
    const model = d.key;

    const miniData = data.map((item) => {
      return { Date: item.Date, Value: item[model] };
    });

    const miniMargin = { top: 20, right: 20, bottom: 50, left: 40 },
      miniWidth = 250 - miniMargin.left - miniMargin.right,
      miniHeight = 200 - miniMargin.top - miniMargin.bottom;

    const tooltip = d3.select(this.refs.streamgraph).select(".tooltip");

    tooltip
      .style("left", event.pageX + 15 + "px")
      .style("top", event.pageY - 75 + "px");

    const miniSvg = tooltip
      .select(".mini-chart")
      .attr("width", miniWidth + miniMargin.left + miniMargin.right)
      .attr("height", miniHeight + miniMargin.top + miniMargin.bottom);

    const g = miniSvg.select("g");

    const x = d3
      .scaleBand()
      .domain(
        miniData.map(function (d) {
          return d3.timeFormat("%b %Y")(d.Date);
        })
      )
      .range([0, miniWidth])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(miniData, function (d) {
          return d.Value;
        }),
      ])
      .nice()
      .range([miniHeight, 0]);

    if (g.empty()) {
      const gEnter = miniSvg
        .append("g")
        .attr(
          "transform",
          "translate(" + miniMargin.left + "," + miniMargin.top + ")"
        );

      gEnter
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + miniHeight + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

      gEnter.append("g").attr("class", "y-axis").call(d3.axisLeft(y));

      gEnter
        .selectAll(".bar")
        .data(miniData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
          return x(d3.timeFormat("%b %Y")(d.Date));
        })
        .attr("width", x.bandwidth())
        .attr("y", miniHeight)
        .attr("height", 0)
        .attr("fill", colors[model])
        .transition()
        .duration(500)
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("height", function (d) {
          return miniHeight - y(d.Value);
        });
    } else {
      g.select(".x-axis")
        .transition()
        .duration(500)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

      g.select(".y-axis")
        .transition()
        .duration(500)
        .call(d3.axisLeft(y));

      const bars = g.selectAll(".bar").data(miniData);

      bars
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
          return x(d3.timeFormat("%b %Y")(d.Date));
        })
        .attr("width", x.bandwidth())
        .attr("y", miniHeight)
        .attr("height", 0)
        .attr("fill", colors[model])
        .merge(bars)
        .transition()
        .duration(500)
        .attr("x", function (d) {
          return x(d3.timeFormat("%b %Y")(d.Date));
        })
        .attr("width", x.bandwidth())
        .attr("y", function (d) {
          return y(d.Value);
        })
        .attr("height", function (d) {
          return miniHeight - y(d.Value);
        })
        .attr("fill", colors[model]);

      bars
        .exit()
        .transition()
        .duration(500)
        .attr("y", miniHeight)
        .attr("height", 0)
        .remove();
    }
  }

  render() {
    return <div ref="streamgraph"></div>;
  }
}

export default Child1;
