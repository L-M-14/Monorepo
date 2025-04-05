// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

/* ************************************************************************* */

// Import the main app component
import App from "./App";

// Import additional components for new routes
import CategoryDetail from "./pages/CategoryDetail";
import CategoryEdit from "./pages/CategoryEdit";
import CategoryIndex from "./pages/CategoryIndex";
import CategoryNew from "./pages/CategoryNew";
import Home from "./pages/Home";
import ProgramDetail from "./pages/ProgramDetail"; // Import the new component
import ProgramEdit from "./pages/ProgramEdit"; // Import the new component
import ProgramIndex from "./pages/ProgramIndex";
import ProgramNew from "./pages/ProgramNew"; // Import the new component

/* ************************************************************************* */

// Create router configuration with routes
const router = createBrowserRouter([
  {
    element: <App />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/categories",
        element: <CategoryIndex />,
      },
      {
        path: "/categories/new",
        element: <CategoryNew />,
      },
      {
        path: "/categories/:id",
        element: <CategoryDetail />,
      },
      {
        path: "/categories/:id/edit",
        element: <CategoryEdit />,
      },
      {
        path: "/programs",
        element: <ProgramIndex />,
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/api/programs`),
      },
      {
        path: "/programs/new",
        element: <ProgramNew />,
      },
      {
        path: "/programs/:id",
        element: <ProgramDetail />,
      },
      {
        path: "/programs/:id/edit",
        element: <ProgramEdit />,
      },
    ],
  },
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
