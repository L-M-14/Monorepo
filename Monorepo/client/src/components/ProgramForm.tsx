import type { ReactNode } from "react";
import { useState } from "react";

type ProgramData = {
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
  category_id: number;
};

interface ProgramFormProps {
  children: ReactNode;
  defaultValue: ProgramData;
  onSubmit: (program: ProgramData) => void;
}

function ProgramForm({ children, defaultValue, onSubmit }: ProgramFormProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const title = formData.get("title") as string;
    const synopsis = formData.get("synopsis") as string;
    let poster = formData.get("poster") as string;
    const country = formData.get("country") as string;
    const year = Number(formData.get("year"));
    const category_id = Number(formData.get("category_id"));

    // Validation des champs
    const validationErrors: { [key: string]: string } = {};

    if (!title.trim()) {
      validationErrors.title = "Le titre est requis.";
    }

    if (!synopsis.trim()) {
      validationErrors.synopsis = "Le synopsis est requis.";
    }

    if (!country.trim()) {
      validationErrors.country = "Le pays est requis.";
    }

    if (Number.isNaN(year) || year <= 0 || year.toString().length !== 4) {
      validationErrors.year =
        "L'année doit être un nombre positif de 4 chiffres.";
    }

    if (Number.isNaN(category_id) || category_id <= 0) {
      validationErrors.category_id =
        "L'ID de la catégorie doit être un nombre positif.";
    }

    if (!poster) {
      poster =
        "https://img.freepik.com/vecteurs-premium/vecteur-icone-image-par-defaut-page-image-manquante-pour-conception-site-web-application-mobile-aucune-photo-disponible_87543-11093.jpg";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      title,
      synopsis,
      poster,
      country,
      year,
      category_id,
    });
  };

  return (
    <>
      <div className="text-primary text-4xl m-10 text-center">
        <h1>Ajouter une série</h1>
      </div>
      <form
        className="flex w-60 text-gray-800 mx-auto flex-col"
        onSubmit={handleSubmit}
      >
        <p>Title</p>
        <input
          className="border-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary border-2 pl-1 rounded"
          type="text"
          name="title"
          defaultValue={defaultValue.title}
          placeholder="Entrez le titre"
        />
        {errors.title && <span className="text-red-500">{errors.title}</span>}

        <p>Synopsis</p>
        <textarea
          className="border-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary border-2 pl-1 rounded"
          name="synopsis"
          defaultValue={defaultValue.synopsis}
          placeholder="Entrez le synopsis"
        />
        {errors.synopsis && (
          <span className="text-red-500">{errors.synopsis}</span>
        )}

        <p>Poster</p>
        <input
          className="border-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary border-2 pl-1 rounded"
          type="text"
          name="poster"
          defaultValue={defaultValue.poster}
          placeholder="URL de l'affiche"
        />

        <p>Country</p>
        <input
          className="border-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary border-2 pl-1 rounded"
          type="text"
          name="country"
          defaultValue={defaultValue.country}
          placeholder="Entrez le pays"
        />
        {errors.country && (
          <span className="text-red-500">{errors.country}</span>
        )}

        <p>Year</p>
        <input
          className="border-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary border-2 pl-1 rounded"
          type="number"
          name="year"
          defaultValue={defaultValue.year}
          placeholder="Entrez l'année (4 chiffres)"
        />
        {errors.year && <span className="text-red-500">{errors.year}</span>}

        <p>Category</p>
        <input
          className="border-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary border-2 pl-1 rounded"
          type="number"
          name="category_id"
          defaultValue={defaultValue.category_id}
          placeholder="Entrez l'ID de la catégorie"
        />
        {errors.category_id && (
          <span className="text-red-500">{errors.category_id}</span>
        )}

        <button
          className="border-primary md:hover:animate-pulse mx-auto w-44 p-1.5 flex items-center justify-center bg-primary text-white cursor-pointer text-center border-2 rounded m-10"
          type="submit"
        >
          {children}
        </button>
      </form>
    </>
  );
}

export default ProgramForm;
