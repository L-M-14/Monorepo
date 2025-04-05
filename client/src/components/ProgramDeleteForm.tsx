import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type ProgramDeleteFormProps = {
  id: number;
  children: ReactNode;
};

function ProgramDeleteForm({ id, children }: ProgramDeleteFormProps) {
  const navigate = useNavigate();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        fetch(`${import.meta.env.VITE_API_URL}/api/programs/${id}`, {
          method: "delete",
        }).then((response) => {
          if (response.status === 204) {
            navigate("/programs");
          }
        });
      }}
    >
      <button
        className="border-primary md:hover:animate-pulse mx-auto w-44 p-1.5 flex items-center justify-center  bg-primary text-white  cursor-pointer text-center border-2 rounded m-10"
        type="submit"
      >
        {children}
      </button>
    </form>
  );
}

export default ProgramDeleteForm;
