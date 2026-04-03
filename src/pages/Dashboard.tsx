import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Video, Clock, FileText, Loader2 } from "lucide-react";

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [authLoading, user, navigate]);

  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ["appointments", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("appointments")
        .select("*, counselors(name, specialty)")
        .eq("user_id", user!.id)
        .order("session_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const now = new Date();
  const upcoming = appointments.filter(a => new Date(a.session_date) >= now && a.status !== "cancelled");
  const past = appointments.filter(a => new Date(a.session_date) < now || a.status === "completed");

  const sessionTypeLabel = (t: string) => {
    if (t === "video") return "Video Call";
    if (t === "audio") return "Audio Call";
    return "Chat Session";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground">My Dashboard</h1>
              <p className="text-muted-foreground mt-1">Welcome back! Here's your counseling overview.</p>
            </div>
            <Link to="/book">
              <Button variant="hero" className="gap-2">
                <Calendar className="h-4 w-4" /> Book New Session
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="bg-card rounded-xl border border-border shadow-card p-5">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center mb-3">
                <Video className="h-5 w-5 text-primary-foreground" />
              </div>
              <p className="text-2xl font-bold text-card-foreground">{appointments.length}</p>
              <p className="text-sm text-muted-foreground">Total Sessions</p>
            </div>
            <div className="bg-card rounded-xl border border-border shadow-card p-5">
              <div className="w-10 h-10 rounded-lg gradient-warm flex items-center justify-center mb-3">
                <Calendar className="h-5 w-5 text-primary-foreground" />
              </div>
              <p className="text-2xl font-bold text-card-foreground">{upcoming.length}</p>
              <p className="text-sm text-muted-foreground">Upcoming</p>
            </div>
            <div className="bg-card rounded-xl border border-border shadow-card p-5">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center mb-3">
                <Clock className="h-5 w-5 text-primary-foreground" />
              </div>
              <p className="text-2xl font-bold text-card-foreground">{past.length}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {/* Upcoming Sessions */}
              <div className="bg-card rounded-xl border border-border shadow-card p-6 mb-8">
                <h2 className="text-xl font-bold font-sans text-card-foreground mb-4">Upcoming Sessions</h2>
                {upcoming.length === 0 ? (
                  <p className="text-muted-foreground">No upcoming sessions. <Link to="/book" className="text-primary hover:underline">Book one now!</Link></p>
                ) : (
                  <div className="space-y-3">
                    {upcoming.map((a) => (
                      <div key={a.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                            {(a.counselors as any)?.name?.split(' ').slice(1).map((n: string) => n[0]).join('') || '?'}
                          </div>
                          <div>
                            <p className="font-medium text-card-foreground">{(a.counselors as any)?.name || 'Counselor'}</p>
                            <p className="text-sm text-muted-foreground">{a.session_date} at {a.session_time} · {sessionTypeLabel(a.session_type)}</p>
                          </div>
                        </div>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          a.status === "confirmed" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                        }`}>
                          {a.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Past Sessions */}
              {past.length > 0 && (
                <div className="bg-card rounded-xl border border-border shadow-card p-6">
                  <h2 className="text-xl font-bold font-sans text-card-foreground mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" /> Session History
                  </h2>
                  <div className="space-y-3">
                    {past.map((a) => (
                      <div key={a.id} className="flex items-start justify-between p-4 rounded-lg bg-secondary/50">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-bold">
                            {(a.counselors as any)?.name?.split(' ').slice(1).map((n: string) => n[0]).join('') || '?'}
                          </div>
                          <div>
                            <p className="font-medium text-card-foreground">{(a.counselors as any)?.name || 'Counselor'}</p>
                            <p className="text-sm text-muted-foreground">{a.session_date} at {a.session_time} · {sessionTypeLabel(a.session_type)}</p>
                            {a.notes && <p className="text-sm text-muted-foreground mt-1 italic">"{a.notes}"</p>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
