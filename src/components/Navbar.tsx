import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="text-xl font-bold text-gradient">BuildINCode</Link>
        
        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link 
              key={l.href} 
              to={l.href} 
              className={`text-sm transition-colors ${
                isActive(l.href) 
                  ? 'text-primary font-semibold' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/contact" className="px-5 py-2 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border"
          >
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map((l) => (
                <Link 
                  key={l.href} 
                  to={l.href} 
                  onClick={() => setOpen(false)} 
                  className={`transition-colors ${
                    isActive(l.href)
                      ? 'text-primary font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <Link to="/contact" onClick={() => setOpen(false)} className="px-5 py-2 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-medium text-center">
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
