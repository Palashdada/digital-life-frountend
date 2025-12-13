import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          Digital Life Lessons
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/lessons"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700"
            }
          >
            Public Lessons
          </NavLink>
          {user && (
            <>
              <NavLink
                to="/dashboard/add-lesson"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                }
              >
                Add Lesson
              </NavLink>
              <NavLink
                to="/dashboard/my-lessons"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                }
              >
                My Lessons
              </NavLink>
              <NavLink
                to="/dashboard/upgrade"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                }
              >
                Pricing / Upgrade
              </NavLink>
            </>
          )}
        </nav>

        {/* User Section */}
        <div className="relative">
          {user ? (
            <div className="flex items-center gap-2">
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt={user.displayName}
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={toggleDropdown}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg py-2 z-50">
                  <p className="px-4 py-2 text-gray-700 font-medium">
                    {user.displayName || "User"}
                  </p>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
