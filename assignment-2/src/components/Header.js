import React from 'react';

function Header({ data }) {
  return (
    <div>
      <header className="header">
        <div className="left-column">
          <h1>{data.name}</h1>
          <p className="title">{data.title}</p>
        </div>
        <div className="right-column">
          <p>Email: {data.email}</p>
          <p>Web: {data.web}</p>
          <p>Mobile: {data.mobile}</p>
        </div>
      </header>
      <div class="header-separator"></div>
    </div>
  );
}

export default Header;
