import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import CategoryDeleteForm from "../components/CategoryDeleteForm";
import Header from "../components/Header";

type Category = {
  id: number;
  name: string;
};

function CategoryDetail() {
  const { id } = useParams();
  const [category, setCategory] = useState(null as null | Category);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories/${id}`)
      .then((response) => response.json())
      .then((data: Category) => {
        setCategory(data);
      });
  }, [id]);

  return (
    category && (
      <>
        <Header
          title="Modifier / supprimer une catégorie"
          showParagraph={false}
        />

        <h2 className="border-primary mx-auto w-44 p-1.5 flex items-center justify-center  bg-white text-primary  cursor-pointer text-center border-2 rounded m-10">
          {category.name}
        </h2>

        <Link
          className=" md:hover:animate-pulse border-primary mx-auto w-44 p-1.5 flex items-center justify-center  bg-primary text-white  cursor-pointer text-center border-2 rounded "
          to={`/categories/${category.id}/edit`}
        >
          Modifier
        </Link>
        <CategoryDeleteForm id={category.id}>Supprimer</CategoryDeleteForm>
      </>
    )
  );
}

export default CategoryDetail;
