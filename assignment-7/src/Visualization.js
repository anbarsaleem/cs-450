import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

function createLinearGradient(svg, id, stops) {
  let defs = svg.select("defs");
  if (defs.empty()) {
    defs = svg.append("defs");
  }

  let gradient = defs.select("#" + id);
  if (gradient.empty()) {
    gradient = defs.append("linearGradient")
      .attr("id", id)
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");
  }

  gradient.selectAll("stop").remove();
  stops.forEach((s) => {
    gradient.append("stop")
      .attr("offset", s.offset)
      .attr("stop-color", s.color);
  });
}

function createLegend(svg, width, sentimentColorScale, subjectivityColorScale, mode) {
  const legendGroup = svg.append("g")
    .attr("class", "legend-group")
    .attr("transform", `translate(${width - 150}, 50)`);

  if (mode === "Sentiment") {
    const gradientId = "sentimentGradient";
    createLinearGradient(svg, gradientId, [
      { offset: "0%", color: "red" },
      { offset: "50%", color: "#ECECEC" },
      { offset: "100%", color: "green" },
    ]);

    legendGroup.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 20)
      .attr("height", 100)
      .style("fill", `url(#${gradientId})`);

    legendGroup.append("text")
      .attr("x", 30)
      .attr("y", 10)
      .text("Negative");

    legendGroup.append("text")
      .attr("x", 30)
      .attr("y", 100)
      .text("Positive");
  } else {
    const gradientId = "subjectivityGradient";
    createLinearGradient(svg, gradientId, [
      { offset: "0%", color: "#ECECEC" },
      { offset: "100%", color: "#4467C4" },
    ]);

    legendGroup.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 20)
      .attr("height", 100)
      .style("fill", `url(#${gradientId})`);

    legendGroup.append("text")
      .attr("x", 30)
      .attr("y", 10)
      .text("Objective");

    legendGroup.append("text")
      .attr("x", 30)
      .attr("y", 100)
      .text("Subjective");
  }
}

const Visualization = ({ tweetsData }) => {
  const [colorMode, setColorMode] = useState("Sentiment");
  const [selectedTweets, setSelectedTweets] = useState([]);
  const svgRef = useRef(null);

  const sentimentColorScale = d3.scaleLinear()
    .domain([-1, 0, 1])
    .range(["red", "#ECECEC", "green"])
    .clamp(true); // ensure values outside domain do not break the scale

  const subjectivityColorScale = d3.scaleLinear()
    .domain([0, 1])
    .range(["#ECECEC", "#4467C4"])
    .clamp(true);

  useEffect(() => {
    // Guard clause
    if (!tweetsData || !Array.isArray(tweetsData) || tweetsData.length === 0) return;

    // Take only the first 300 entries
    const dataToVisualize = tweetsData.slice(0, 300);

    // Parse numeric fields
    dataToVisualize.forEach((d) => {
      d.Sentiment = +d.Sentiment;
      d.Subjectivity = +d.Subjectivity;
      d["Dimension 1"] = +d["Dimension 1"];
      d["Dimension 2"] = +d["Dimension 2"];
    });

    const width = 800;
    const height = 500;
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("*").remove();

    const months = [...new Set(dataToVisualize.map((d) => d.Month))];
    // If no months found or data doesn't have expected months:
    if (months.length === 0) {
      console.warn("No distinct months found in data. Check your Month field.");
    }

    const monthPositions = {};
    months.forEach((m, i) => {
      monthPositions[m] = (height / (months.length + 1)) * (i + 1);
    });

    const simulation = d3.forceSimulation(dataToVisualize)
      .force("x", d3.forceX(width / 2).strength(0.05))
      .force("y", d3.forceY((d) => monthPositions[d.Month] || height / 2).strength(0.2))
      .force("collide", d3.forceCollide(6))
      .stop();

    for (let i = 0; i < 300; i++) simulation.tick();

    svg.selectAll(".tweet-node")
      .data(dataToVisualize, (d) => d.idx)
      .enter()
      .append("circle")
      .attr("class", "tweet-node")
      .attr("r", 5)
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("fill", (d) =>
        colorMode === "Sentiment"
          ? sentimentColorScale(d.Sentiment)
          : subjectivityColorScale(d.Subjectivity)
      )
      .attr("stroke", "none")
      .attr("cursor", "pointer")
      .on("click", (event, d) => {
        setSelectedTweets((prev) => {
          const isSelected = prev.find((t) => t.idx === d.idx);
          return isSelected
            ? prev.filter((t) => t.idx !== d.idx)
            : [d, ...prev];
        });
      });

    months.forEach((m) => {
      svg.append("text")
        .attr("x", 50)
        .attr("y", monthPositions[m])
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .text(m);
    });

    createLegend(svg, width, sentimentColorScale, subjectivityColorScale, colorMode);
  }, [tweetsData]);

  useEffect(() => {
    if (!tweetsData || !Array.isArray(tweetsData) || tweetsData.length === 0) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll(".tweet-node")
      .transition()
      .duration(500)
      .attr("fill", (d) =>
        colorMode === "Sentiment"
          ? sentimentColorScale(d.Sentiment)
          : subjectivityColorScale(d.Subjectivity)
      );

    svg.selectAll(".legend-group").remove();
    createLegend(svg, 800, sentimentColorScale, subjectivityColorScale, colorMode);
  }, [colorMode, tweetsData]);

  useEffect(() => {
    if (!tweetsData || !Array.isArray(tweetsData) || tweetsData.length === 0) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll(".tweet-node")
      .attr("stroke", (d) =>
        selectedTweets.find((t) => t.idx === d.idx) ? "black" : "none"
      )
      .attr("stroke-width", (d) =>
        selectedTweets.find((t) => t.idx === d.idx) ? 1.5 : 0
      );
  }, [selectedTweets, tweetsData]);

  return (
    <div>
      <div>
        <label>Color By: </label>
        <select value={colorMode} onChange={(e) => setColorMode(e.target.value)}>
          <option value="Sentiment">Sentiment</option>
          <option value="Subjectivity">Subjectivity</option>
        </select>
      </div>
      <svg ref={svgRef}></svg>
      <div id="selected-tweets-container">
        {selectedTweets.map((t, i) => (
          <div key={t.idx || i} className="tweet-entry">
            {t.RawTweet}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Visualization;
