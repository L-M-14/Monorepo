import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full flex text-white sm:justify-between items-center bg-primary p-2">
        <Link to="/">
          <h1 className="text-logo-sm sm:text-logo">Wild Series</h1>
        </Link>

        <button
          type="button"
          onClick={toggleMenu}
          className="absolute right-2.5 sm:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          &#9776;
        </button>

        <nav
          ref={navRef}
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } sm:flex sm:static sm:items-center`}
        >
          <ul
            className="sm:flex sm:static bg-primary sm:top-auto sm:w-auto sm:flex-row sm:left-auto absolute left-0 top-10 flex flex-col
           w-full justify-center items-center"
          >
            <li className="p-4 cursor-pointer">
              <NavLink to="/categories" onClick={() => setIsMenuOpen(false)}>
                Catégories
              </NavLink>
            </li>
            <li className="p-4">
              <NavLink to="/programs" onClick={() => setIsMenuOpen(false)}>
                Séries
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center w-full">
        <Outlet />
      </main>

      <footer className="text-white text-center bg-primary p-4">
        <p>© Copyright 2025</p>
      </footer>
    </div>
  );
}

export default App;
