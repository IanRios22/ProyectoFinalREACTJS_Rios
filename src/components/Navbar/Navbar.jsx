import CartWidget from "../CartWidget/CartWidget";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-700 p-4">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        <Link to="/">
          <img
            src="https://i.pinimg.com/originals/1c/54/f7/1c54f7b06d7723c21afc5035bf88a5ef.png"
            alt="Logo"
            className="w-10 h-10 mx-auto rounded-lg border-green-50"
          />
          <h1 className="text-white text-2xl font-bold">Tienda Virtual</h1>
        </Link>
        <div className="justify-center space-x-4">
          <NavLink
            to={`/category/celular`}
            className={({ isActive }) =>
              isActive
                ? "ActiveOption bg-green-500 p-2 rounded-xl text-white hover:text-gray-300 hover:bg-sky-600"
                : "Option bg-green-500 p-2 rounded-xl text-white hover:text-gray-300 hover:bg-sky-600"
            }
          >
            Celular
          </NavLink>
          <NavLink
            to={`/category/tablet`}
            className={({ isActive }) =>
              isActive
                ? "ActiveOption bg-green-500 p-2 rounded-xl text-white hover:text-gray-300 hover:bg-sky-600 "
                : "Option bg-green-500 p-2 rounded-xl text-white hover:text-gray-300 hover:bg-sky-600"
            }
          >
            Tablet
          </NavLink>
          <NavLink
            to={`/category/notebook`}
            className={({ isActive }) =>
              isActive
                ? "ActiveOption bg-green-500 p-2 rounded-xl text-white hover:text-gray-300 hover:bg-sky-600"
                : "Option bg-green-500 p-2 rounded-xl text-white hover:text-gray-300 hover:bg-sky-600"
            }
          >
            Notebook
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "ActiveOption bg-blue-400 p-2 rounded-xl text-white hover:text-gray-300 hover:bg-blue-600"
                : "Option bg-orange-400 p-2 rounded-xl font-bold text-black hover:text-gray-300 hover:bg-blue-500"
            }
          >
            Iniciar sesión
          </NavLink>
        </div>

        <CartWidget size="2" />
      </div>
    </nav>
  );
};

export default Navbar;
