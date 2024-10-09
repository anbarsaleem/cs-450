import React from 'react';

function WorkExperience({ data }) {
  return (
    <div>
      <section className="section">
        <h2>Work Experience</h2>
        <div className="entries">
          {data.map((job, index) => (
            <div key={index} className="job">
              <h3>{job.jobTitle}</h3>
              <p>{job.dates}</p>
              <p>{job.description}</p>
            </div>
          ))}
        </div>
      </section>
      <hr class="solid"/>
    </div>
  );
}

export default WorkExperience;
