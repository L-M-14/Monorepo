import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

type Program = {
  id: number;
  title: string;
  poster: string;
};

type ProgramIndexProps = {
  showAddButton?: boolean;
  showTitle?: boolean;
};

function ProgramIndex({
  showAddButton = true,
  showTitle = true,
}: ProgramIndexProps) {
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs`)
      .then((response) => response.json())
      .then((data: Program[]) => {
        setPrograms(data);
      });
  }, []);

  return (
    <>
      {showTitle && (
        <div className="text-primary text-4xl m-10 text-center">
          <h1>Mes séries</h1>
        </div>
      )}
      <div className="w-full justify-center text-white flex flex-row flex-wrap">
        {programs.map((program) => (
          <Link
            key={program.id}
            to={`/programs/${program.id}`}
            className="flex m-2 text-center mb-8.5 w-56 h-fit flex-col-reverse rounded-lg overflow-hidden bg-primary"
          >
            <div className="m-1.5 md:hover:animate-pulse">{program.title}</div>
            <div
              className="h-78 bg-cover bg-center pt-5 pb-5"
              style={{ backgroundImage: `url(${program.poster})` }}
            />
          </Link>
        ))}
      </div>
      {showAddButton && (
        <div className="w-44 mx-auto md:hover:animate-pulse m-5 mb-10 md:mb-5 p-1.5 flex items-center justify-center bg-primary text-white rounded cursor-pointer text-center">
          <Link to={"/programs/new"}>Ajouter une série</Link>
        </div>
      )}
    </>
  );
}

export default ProgramIndex;
