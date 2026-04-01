import { Button } from "@/components/ui/button";
import { Star, Video, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

export interface Counselor {
  id: string;
  name: string;
  specialty: string;
  rating: number | null;
  sessions: number | null;
  avatar_url: string | null;
  available: boolean | null;
  bio: string | null;
}

const CounselorCard = ({ counselor }: { counselor: Counselor }) => (
  <div className="bg-card rounded-xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 p-6 group">
    <div className="flex items-start gap-4">
      <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xl font-bold shrink-0">
        {counselor.name.split(' ').map(n => n[0]).join('')}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-card-foreground truncate">{counselor.name}</h3>
          {counselor.available && (
            <span className="w-2.5 h-2.5 rounded-full bg-success shrink-0" title="Available" />
          )}
        </div>
        <p className="text-sm text-muted-foreground">{counselor.specialty}</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="flex items-center gap-1 text-sm text-accent">
            <Star className="h-3.5 w-3.5 fill-current" /> {counselor.rating ?? 0}
          </span>
          <span className="text-sm text-muted-foreground">{counselor.sessions ?? 0}+ sessions</span>
        </div>
      </div>
    </div>
    <p className="text-sm text-muted-foreground mt-4 line-clamp-2">{counselor.bio}</p>
    <div className="flex gap-2 mt-4">
      <Link to="/book" className="flex-1">
        <Button variant="hero" size="sm" className="w-full gap-1.5">
          <Video className="h-3.5 w-3.5" /> Book
        </Button>
      </Link>
      <Button variant="outline" size="sm" className="gap-1.5">
        <MessageSquare className="h-3.5 w-3.5" /> Message
      </Button>
    </div>
  </div>
);

export default CounselorCard;
