import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gold/20">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Brand */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="font-berkshire text-xl font-bold">
              <span className="text-white">coimbatore</span> <span className="text-yellow-500">matrimony</span>
            </span>
          </Link>

          {/* Copyright */}
          <p className="text-white text-sm">
            © {currentYear} coimbatore matrimony. All rights reserved.
          </p>

          {/* Links */}
          <div className="flex space-x-6">
            <Link to="/about" className="text-white hover:text-gold transition-colors text-sm">
              About Us
            </Link>
            <Link to="/contact" className="text-white hover:text-gold transition-colors text-sm">
              Contact
            </Link>
            <Link to="/privacy" className="text-white hover:text-gold transition-colors text-sm">
              Privacy
            </Link>
            <Link to="/terms" className="text-white hover:text-gold transition-colors text-sm">
              Terms
            </Link>
            <Link to="/cookies" className="text-white hover:text-gold transition-colors text-sm">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;