import React, { Component } from 'react';
import * as d3 from 'd3';
import Child1 from './Child1'; 
import Child2 from './Child2'; 
import tips from './tips.csv'; 
import './App.css'; 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
    };
  }

  componentDidMount() {
    // Fetch and parse CSV data
    d3.csv(tips).then((csv_data) => {
      this.setState({ data: csv_data, loading: false });
    });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>Tips Data Visualization</h1>
        <div className="chart-container">
          <Child1 data={this.state.data} />  {/* Scatter plot */}
        </div>
        <div className="chart-container">
          <Child2 data={this.state.data} />  {/* Bar chart */}
        </div>
      </div>
    );
  }
}

export default App;
