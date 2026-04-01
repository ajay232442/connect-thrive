import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="text-xl font-bold font-serif text-gradient">
          GuidePath
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <Link to="/counselors" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Counselors</Link>
          <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
          <Link to="/book" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Book Session</Link>
          <Button variant="hero" size="sm">Get Started</Button>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 flex flex-col gap-3">
          <Link to="/" className="text-sm font-medium py-2" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/counselors" className="text-sm font-medium py-2" onClick={() => setOpen(false)}>Counselors</Link>
          <Link to="/dashboard" className="text-sm font-medium py-2" onClick={() => setOpen(false)}>Dashboard</Link>
          <Link to="/book" className="text-sm font-medium py-2" onClick={() => setOpen(false)}>Book Session</Link>
          <Button variant="hero" size="sm">Get Started</Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
