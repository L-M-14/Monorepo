import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
type Category = {
  id: number;
  name: string;
};

function CategoryIndex() {
  const [categories, setCategories] = useState([] as Category[]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
      .then((response) => response.json())
      .then((data: Category[]) => {
        setCategories(data);
      });
  }, []);

  return (
    <>
      <Header title="Ajouter / modifier une catégorie" showParagraph={false} />
      <ul>
        {categories.map((category) => (
          <li
            className="border-primary mx-auto w-44 p-1.5 flex items-center justify-center  bg-white text-primary  cursor-pointer text-center border-2 rounded m-10"
            key={category.id}
          >
            <Link to={`/categories/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
      <Link
        to={"/categories/new"}
        className="border-primary md:hover:animate-pulse mx-auto w-44 p-1.5 flex items-center justify-center  bg-primary text-white  cursor-pointer text-center border-2 rounded m-10"
      >
        Ajouter
      </Link>
    </>
  );
}

export default CategoryIndex;
