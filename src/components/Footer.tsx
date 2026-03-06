import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border py-10 px-4">
    <div className="container mx-auto max-w-6xl">
      <div className="grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="text-gradient font-bold text-lg mb-4">DevForge</div>
          <p className="text-sm text-muted-foreground">
            Building the future, one product at a time.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-foreground mb-4">Company</h4>
          <div className="flex flex-col gap-2">
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</Link>
            <Link to="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Services</Link>
            <Link to="/portfolio" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Portfolio</Link>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-foreground mb-4">Resources</h4>
          <div className="flex flex-col gap-2">
            <Link to="/testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Testimonials</Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-foreground mb-4">Legal</h4>
          <div className="flex flex-col gap-2">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
      
      <div className="pt-8 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} DevForge. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
