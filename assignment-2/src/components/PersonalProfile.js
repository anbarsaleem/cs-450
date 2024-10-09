import React from 'react';

function PersonalProfile({ data }) {
  return (
    <div>
      <section className="section">
        <h2>Personal Profile</h2>
        <div className="entries">
          <p>{data}</p>
        </div>
      </section>
      <hr class="solid"/>
    </div>
  );
}

export default PersonalProfile;
