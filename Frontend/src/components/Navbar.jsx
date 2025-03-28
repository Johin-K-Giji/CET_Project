import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <nav className="bg-white shadow-md border-b border-gray-200 fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-extrabold text-orange-500">
            PetNest
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            <NavLink to="/home" label="Home" location={location.pathname} />
            <NavLink to="/vetlist" label="Veterinary Clinics" location={location.pathname} />
            <NavLink to="/products" label="Marketplace" location={location.pathname} />
            <NavLink to="/adoptionhome" label="Adoptions" location={location.pathname} />
            <NavLink to="/serviceprovidershome" label="Service Providers" location={location.pathname} />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-md border-t border-gray-200 absolute top-full left-0 w-full py-4">
            <div className="flex flex-col items-center gap-6">
              <NavLink to="/" label="Home" location={location.pathname} onClick={() => setIsOpen(false)} />
              <NavLink to="/veterinary-clinics" label="Veterinary Clinics" location={location.pathname} onClick={() => setIsOpen(false)} />
              <NavLink to="/marketplace" label="Marketplace" location={location.pathname} onClick={() => setIsOpen(false)} />
              <NavLink to="/adoptions" label="Adoptions" location={location.pathname} onClick={() => setIsOpen(false)} />
            </div>
          </div>
        )}
      </nav>

      {/* Bottom Padding to Prevent Overlap */}
      <div className="pb-20"></div>
    </>
  );
};

const NavLink = ({ to, label, location, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`text-gray-700 font-medium transition duration-300 hover:text-orange-500 ${
      location === to ? "border-b-2 border-orange-500" : ""
    }`}
  >
    {label}
  </Link>
);

export default Navbar;
