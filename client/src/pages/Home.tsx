import { useEffect, useRef, useState } from "react";
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

function Home({ showAddButton = true, showTitle = true }: ProgramIndexProps) {
  const [programs, setPrograms] = useState<Program[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs`)
      .then((response) => response.json())
      .then((data: Program[]) => {
        setPrograms(data);
      });
  }, []);

  const slideLeft = () => {
    if (sliderRef.current) {
      const newIndex = Math.max(currentIndex - 1, 0);
      setCurrentIndex(newIndex);
      sliderRef.current.scrollTo({
        left: newIndex * sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const slideRight = () => {
    if (sliderRef.current && programs.length > 0) {
      const newIndex = (currentIndex + 1) % programs.length;
      setCurrentIndex(newIndex);
      sliderRef.current.scrollTo({
        left: newIndex * sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {showTitle && (
        <div className="text-primary text-4xl mt-10 text-center">
          <h1 className="mb-5">{"Wild Series"}</h1>
          <p className="text-2xl mb-5">
            {"Créez une liste de vos séries préférées "}
          </p>
        </div>
      )}
      <div className="flex w-full justify-center items-center">
        <div className="flex w-68 sm:w-2xl md:max-w-4xl lg:w-full items-center justify-center">
          <button
            type="button"
            onClick={slideLeft}
            className="relative flex w-8 h-8 justify-center items-center top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full"
          >
            &lt;
          </button>
          <div className="relative full sm:max-w-lg md:max-w-2xl lg:max-w-4xl overflow-hidden">
            <div
              ref={sliderRef}
              className="flex flex-row h-auto overflow-x-auto scrollbar-hide"
            >
              {programs.map((program) => (
                <Link
                  key={program.id}
                  to={`/programs/${program.id}`}
                  className="flex-shrink-0 m-2 text-center mb-8.5 flex flex-col-reverse text-white w-52 h-80 rounded-lg overflow-hidden bg-primary"
                  style={{ aspectRatio: "3 / 2" }}
                >
                  <div className="p-1.5 md:hover:animate-pulse">
                    {program.title}
                  </div>
                  <img
                    src={program.poster}
                    alt={program.title}
                    className="w-60 h-80 object-cover"
                  />
                </Link>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={slideRight}
            className="relative flex w-8 h-8 justify-center items-center top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full"
          >
            &gt;
          </button>
        </div>
      </div>
      {showAddButton && (
        <div className="w-44 mx-auto md:hover:animate-pulse m-5 mb-10 md:mb-5 p-1.5 flex items-center justify-center bg-primary text-white rounded cursor-pointer text-center">
          <Link to={"/programs/new"}>Ajouter une série</Link>
        </div>
      )}
    </>
  );
}

export default Home;
