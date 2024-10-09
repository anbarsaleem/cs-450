import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div className="hd1">
        <div className="hd1_c1">
          <div>
            <p>{this.props.personInfo.name}</p>
            <p>{this.props.personInfo.occupation}</p>
          </div>
        </div>
        <div className="hd1_c2">
          <div>
            <p>Email: {this.props.contactInfo.email}</p>
            <p>Web: {this.props.contactInfo.web}</p>
            <p>Mobile: {this.props.contactInfo.mobile}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
