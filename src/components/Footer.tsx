const Footer = () => (
  <footer className="border-t border-border py-10 px-4">
    <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-gradient font-bold text-lg">DevForge</div>
      <p className="text-sm text-muted-foreground text-center">
        © {new Date().getFullYear()} DevForge. All rights reserved. Building the future, one product at a time.
      </p>
      <div className="flex gap-6">
        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
      </div>
    </div>
  </footer>
);

export default Footer;
