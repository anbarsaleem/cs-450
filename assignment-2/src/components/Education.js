import React from 'react';

function Education({ data }) {
  return (
    <section className="section">
      <h2>Education</h2>
      <div className="education-entries">
        {data.map((edu, index) => (
          <div key={index} className="entries">
            <h3 className="school">{edu.school}</h3>
            <p class = "details">{edu.degree}<br/>{edu.dates}<br/>{edu.gpa}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Education;
