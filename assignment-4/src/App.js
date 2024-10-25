import React, { Component } from "react";
import "./App.css";
import * as d3 from "d3";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { wordFrequency: [] };
  }
  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    this.renderChart();
  }

  getWordFrequency = (text) => {
    const stopWords = new Set([
      "the",
      "and",
      "a",
      "an",
      "in",
      "on",
      "at",
      "for",
      "with",
      "about",
      "as",
      "by",
      "to",
      "of",
      "from",
      "that",
      "which",
      "who",
      "whom",
      "this",
      "these",
      "those",
      "it",
      "its",
      "they",
      "their",
      "them",
      "we",
      "our",
      "ours",
      "you",
      "your",
      "yours",
      "he",
      "him",
      "his",
      "she",
      "her",
      "hers",
      "it",
      "its",
      "we",
      "us",
      "our",
      "ours",
      "they",
      "them",
      "theirs",
      "I",
      "me",
      "my",
      "myself",
      "you",
      "your",
      "yourself",
      "yourselves",
      "was",
      "were",
      "is",
      "am",
      "are",
      "be",
      "been",
      "being",
      "have",
      "has",
      "had",
      "having",
      "do",
      "does",
      "did",
      "doing",
      "a",
      "an",
      "the",
      "as",
      "if",
      "each",
      "how",
      "which",
      "who",
      "whom",
      "what",
      "this",
      "these",
      "those",
      "that",
      "with",
      "without",
      "through",
      "over",
      "under",
      "above",
      "below",
      "between",
      "among",
      "during",
      "before",
      "after",
      "until",
      "while",
      "of",
      "for",
      "on",
      "off",
      "out",
      "in",
      "into",
      "by",
      "about",
      "against",
      "with",
      "amongst",
      "throughout",
      "despite",
      "towards",
      "upon",
      "isn't",
      "aren't",
      "wasn't",
      "weren't",
      "haven't",
      "hasn't",
      "hadn't",
      "doesn't",
      "didn't",
      "don't",
      "doesn't",
      "didn't",
      "won't",
      "wouldn't",
      "can't",
      "couldn't",
      "shouldn't",
      "mustn't",
      "needn't",
      "daren't",
      "hasn't",
      "haven't",
      "hadn't",
    ]);
    const words = text
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=_`~()]/g, "")
      .replace(/\s{2,}/g, " ")
      .split(" ");
    const filteredWords = words.filter((word) => !stopWords.has(word));
    return Object.entries(
      filteredWords.reduce((freq, word) => {
        freq[word] = (freq[word] || 0) + 1;
        return freq;
      }, {})
    );
  };

  renderChart() {
    const data = this.state.wordFrequency
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    console.log(data);
    // your code here
    const svg = d3.select(".svg_parent");

    const width = 1000; // Set to match the input width
    const height = 300;
    const padding = 20;

    svg
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "#1a1a1a");

    const maxFreq = data[0] ? data[0][1] : 1;
    const fontSizeScale = d3.scaleLinear().domain([0, maxFreq]).range([20, 60]);

    let currentX = padding;

    const wordData = data.map((d) => {
      const fontSize = fontSizeScale(d[1]);
      const wordWidth = d[0].length * (fontSize * 0.6);
      const wordX = currentX + wordWidth / 2;
      currentX += wordWidth + 20;
      return {
        text: d[0],
        freq: d[1],
        fontSize,
        width: wordWidth,
        x: wordX,
      };
    });

    // Word selection
    const words = svg.selectAll("text").data(wordData, (d) => d.text);

    // ENTER new words
    words
      .enter()
      .append("text")
      .attr("text-anchor", "middle")
      .attr("x", (d) => d.x)
      .attr("y", height / 2)
      .text((d) => d.text)
      .attr("fill", "white")
      .style("font-family", "Times New Roman")
      .style("font-size", "1px") // Start small (animation from nothing)
      .style("opacity", 0)
      .transition()
      .duration(2000)
      .style("font-size", (d) => `${d.fontSize}px`)
      .style("opacity", 1);

    // UPDATE existing words
    words
      .transition()
      .duration(2000)
      .attr("x", (d) => d.x)
      .attr("y", height / 2)
      .style("font-size", (d) => `${d.fontSize}px`);

    // EXIT old words that are no longer in the data
    words.exit().transition().duration(2000).style("opacity", 0).remove();
  }

  render() {
    return (
      <div className="parent">
        <div className="child1" style={{ width: 1000 }}>
          <textarea
            type="text"
            id="input_field"
            style={{ height: 150, width: 1000 }}
          />
          <button
            type="submit"
            value="Generate Matrix"
            style={{ marginTop: 10, height: 40, width: 1000 }}
            onClick={() => {
              var input_data = document.getElementById("input_field").value;
              this.setState({
                wordFrequency: this.getWordFrequency(input_data),
              });
            }}
          >
            {" "}
            Generate WordCloud
          </button>
        </div>
        <div className="child2">
          <svg className="svg_parent"></svg>
        </div>
      </div>
    );
  }
}

export default App;
