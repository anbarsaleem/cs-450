import React from 'react';

function Skills({ data }) {
  return (
    <div>
      <section className="section">
        <h2>Key Skills</h2>
        <div className="skills-grid">
          {data.map((skill, index) => (
            <p key={index}>{skill}</p>
          ))}
        </div>
      </section>
      <hr class="solid"/>
    </div>
  );
}

export default Skills;
