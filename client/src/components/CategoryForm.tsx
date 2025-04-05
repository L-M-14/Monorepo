import type { ReactNode } from "react";

type CategoryData = {
  name: string;
};

interface CategoryFormProps {
  children: ReactNode;
  defaultValue: CategoryData;
  onSubmit: (category: CategoryData) => void;
}

function CategoryForm({ children, defaultValue, onSubmit }: CategoryFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const name = formData.get("name") as string;

        onSubmit({
          name,
        });
      }}
    >
      <div className="text-primary text-4xl m-10 text-center">
        <h1>Créer une catégorie</h1>
      </div>
      <div className="flex justify-center m-10">
        <input
          className="border-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary border-2 pl-1 rounded"
          type="text"
          name="name"
          defaultValue={defaultValue.name}
          placeholder="Entrez une catégorie"
        />
      </div>

      <button
        className="border-primary md:hover:animate-pulse mx-auto w-44 p-1.5 flex items-center justify-center  bg-primary text-white  cursor-pointer text-center border-2 rounded m-10"
        type="submit"
      >
        {children}
      </button>
    </form>
  );
}

export default CategoryForm;
