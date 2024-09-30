import React, { Component } from "react";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      inputText: "",
    };
  }
  handleInputChange = (e) => {
    this.setState({ inputText: e.target.value });
  };
  handleButtonClick = () => {
    this.setState({
      todos: [...this.state.todos, this.state.inputText],
    });
  };
  render() {
    return (
      <div>
        <input type="text" onChange={this.handleInputChange}></input>
        <button onClick={this.handleButtonClick}>Add Todo</button>
        {this.state.todos.map((item) => {
          return (
            <div>
              <p>{item}</p>
              <button
                onClick={() =>
                  this.setState({
                    todos: this.state.todos.filter(
                      (element) => item != element
                    ),
                  })
                }
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}
export default App;
