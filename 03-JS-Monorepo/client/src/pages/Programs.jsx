import React, { useEffect, useState } from "react";

const Programs = () => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/programs")
      .then((response) => response.json())
      .then(setPrograms);
  }, []);

  return (
    <div>
      <h1>Programs</h1>
      <ul>
        {programs.map((program) => (
          <li key={program.id}>
            <h2>{program.title}</h2>
            <p>{program.synopsis}</p>
            <img src={program.poster} alt={program.title} width="200" />
            <p>Pays : {program.country}</p>
            <p>Année : {program.year}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Programs;
