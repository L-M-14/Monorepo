import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProgramDeleteForm from "../components/ProgramDeleteForm";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
  category_id: number;
};

function ProgramDetail() {
  const { id } = useParams();
  const [program, setProgram] = useState<Program | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs/${id}`)
      .then((response) => response.json())
      .then((data: Program) => {
        setProgram(data);
      });
  }, [id]);

  return (
    program && (
      <div className="flex justify-center items-center flex-wrap m-10">
        <div className="md:mr-10">
          <img
            className="w-auto h-70 sm:h-100"
            src={program.poster}
            alt={program.title}
          />
        </div>
        <div className="flex flex-col max-w-150 justify-center">
          <h1 className="text-primary text-4xl m-10 text-center">
            {program.title}
          </h1>
          <p className="mb-5">{program.synopsis}</p>
          <div className="flex items-start">
            <p className="italic">
              {program.country}, {program.year}
            </p>
          </div>
          <div className="flex flex-col items-center justify-around sm:flex-row mt-10 ml-5 mr-5">
            <Link
              className="border-primary md:hover:animate-pulse w-44 p-1.5 bg-primary text-white cursor-pointer text-center border-2 rounded"
              to={`/programs/${program.id}/edit`}
            >
              Modifier
            </Link>
            <ProgramDeleteForm id={program.id}>Supprimer</ProgramDeleteForm>
          </div>
        </div>
      </div>
    )
  );
}

export default ProgramDetail;
