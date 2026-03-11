import "./styles/Education.css";

const educationEntries = [
  {
    degree: "Bachelor of Technology in Electronics & Communication",
    institute: "Haldia Institute of Technology",
    date: "Aug 2019 - Sep 2023",
    location: "Haldia, West Bengal",
    grade: "GPA: 8.70 (82.65%)",
  },
  {
    degree: "Intermediate",
    institute: "S.N.S.Y Inter College",
    date: "Apr 2016 - Feb 2018",
    location: "Purnia, Bihar",
    grade: "GPA: 65.8%",
  },
  {
    degree: "Matriculation",
    institute: "Jawahar Navodaya Vidyalaya",
    date: "Apr 2015 - Mar 2016",
    location: "Araria, Bihar",
    grade: "CGPA: 9.8 (93.10%)",
  },
];

const Education = () => {
  return (
    <div className="education-section section-container" id="education">
      <h2>Education</h2>
      <div className="education-grid">
        {educationEntries.map((entry) => (
          <div className="education-card" key={entry.degree}>
            <div className="education-main">
              <div className="education-details">
                <h4>{entry.degree}</h4>
                <h5>{entry.institute}</h5>
              </div>
              <span className="education-date">{entry.date}</span>
            </div>
            <div className="education-meta">
              <span>{entry.location}</span>
              <span>{entry.grade}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
