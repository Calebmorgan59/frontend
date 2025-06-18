import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, GraduationCap } from 'lucide-react';

interface NavbarProps {
  onRegister: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onRegister }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-green-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <GraduationCap className="h-8 w-8 text-yellow-400" />
              <span className="ml-2 text-xl font-bold">NEXUS</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 hover:text-yellow-400 transition-colors">Home</Link>
            <Link to="/about" className="px-3 py-2 hover:text-yellow-400 transition-colors">About</Link>
            <Link to="/events" className="px-3 py-2 hover:text-yellow-400 transition-colors">Events</Link>
            <Link to="/success-stories" className="px-3 py-2 hover:text-yellow-400 transition-colors">Success Stories</Link>
            <Link to="/jobs" className="px-3 py-2 hover:text-yellow-400 transition-colors">Jobs</Link>
            <Link to="/membership" className="px-3 py-2 hover:text-yellow-400 transition-colors">Membership</Link>
            <Link to="/connecting-with-alumni" className="px-3 py-2 hover:text-yellow-400 transition-colors">Connect with Alumni</Link>
            <Link to="/contact" className="px-3 py-2 hover:text-yellow-400 transition-colors">Contact</Link>
            <button
              onClick={onRegister}
              className="ml-4 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold rounded-md transition-colors"
            >
              Join Now
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-green-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 hover:bg-green-700 hover:text-yellow-400 transition-colors" onClick={toggleMenu}>Home</Link>
            <Link to="/about" className="block px-3 py-2 hover:bg-green-700 hover:text-yellow-400 transition-colors" onClick={toggleMenu}>About</Link>
            <Link to="/events" className="block px-3 py-2 hover:bg-green-700 hover:text-yellow-400 transition-colors" onClick={toggleMenu}>Events</Link>
            <Link to="/success-stories" className="block px-3 py-2 hover:bg-green-700 hover:text-yellow-400 transition-colors" onClick={toggleMenu}>Success Stories</Link>
            <Link to="/jobs" className="block px-3 py-2 hover:bg-green-700 hover:text-yellow-400 transition-colors" onClick={toggleMenu}>Jobs</Link>
            <Link to="/membership" className="block px-3 py-2 hover:bg-green-700 hover:text-yellow-400 transition-colors" onClick={toggleMenu}>Membership</Link>
            <Link to="/connecting-with-alumni" className="block px-3 py-2 hover:bg-green-700 hover:text-yellow-400 transition-colors" onClick={toggleMenu}>Connect with Alumni</Link>
            <Link to="/contact" className="block px-3 py-2 hover:bg-green-700 hover:text-yellow-400 transition-colors" onClick={toggleMenu}>Contact</Link>
            <button
              onClick={() => {
                onRegister();
                toggleMenu();
              }}
              className="block w-full px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold rounded-md transition-colors mt-4"
            >
              Join Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;