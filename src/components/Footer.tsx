const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container-constrained py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold text-foreground">TickBase</p>
            <p className="text-xs text-muted-foreground">Modern ticket management made simple</p>
          </div>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
            <a href="#" className="transition-colors hover:text-foreground">Terms</a>
            <a href="#" className="transition-colors hover:text-foreground">Contact</a>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} TickBase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
