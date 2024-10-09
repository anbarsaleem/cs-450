import React, { useState } from 'react';
import Header from './components/Header';
import PersonalProfile from './components/PersonalProfile';
import WorkExperience from './components/WorkExperience';
import Skills from './components/Skills';
import Education from './components/Education';
import './App.css';

function App() {
  const [resumeData, setResumeData] = useState({
    header: {
      name: "Zh Rimel",
      title: "Data Scientist",
      email: "abc@gmail.com",
      web: "abc.github.io/abc",
      mobile: "01234567890"
    },
    profile: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    workExperience: [
      {
        jobTitle: "Job Title at Company (August 2022 – December 2023)",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      },
      {
        jobTitle: "Job Title 2 at Company 2 (August 2020 – December 2021)",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      }
    ],
    skills: ["A Key Skill", "A Key Skill", "A Key Skill", "A Key Skill", "A Key Skill", "A Key Skill", "A Key Skill", "A Key Skill", "A Key Skill"],
    education: [
      {
        school: "New Jersey Institute of Technology",
        degree: "BS in Computer Science",
        dates: "2018 - 2022",
        gpa: "GPA: 3.9"
      },
      {
        school: "New Jersey Institute of Technology",
        degree: "MS in Data Science",
        dates: "2022 - 2023",
        gpa: "GPA: 4.0"
      }
    ]
  });

  return (
    <div className="App">
      <Header data={resumeData.header} />
      <PersonalProfile data={resumeData.profile} />
      <WorkExperience data={resumeData.workExperience} />
      <Skills data={resumeData.skills} />
      <Education data={resumeData.education} />
    </div>
  );
}

export default App;
