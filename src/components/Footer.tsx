import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-secondary border-t border-border py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-serif font-bold text-gradient mb-3">GuidePath</h3>
          <p className="text-sm text-muted-foreground">Virtual guidance counseling for students, anytime, anywhere.</p>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3 text-foreground">Quick Links</h4>
          <div className="flex flex-col gap-2">
            <Link to="/counselors" className="text-sm text-muted-foreground hover:text-primary transition-colors">Find a Counselor</Link>
            <Link to="/book" className="text-sm text-muted-foreground hover:text-primary transition-colors">Book Session</Link>
            <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">My Dashboard</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3 text-foreground">Support</h4>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">FAQ</span>
            <span className="text-sm text-muted-foreground">Contact Us</span>
            <span className="text-sm text-muted-foreground">Privacy Policy</span>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3 text-foreground">Contact</h4>
          <p className="text-sm text-muted-foreground">support@guidepath.com</p>
          <p className="text-sm text-muted-foreground">1-800-GUIDE</p>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
        © 2026 GuidePath. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
