import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Video, Clock, MessageSquare, FileText, TrendingUp } from "lucide-react";

const upcomingSessions = [
  { id: 1, counselor: "Dr. Sarah Chen", date: "Apr 5, 2026", time: "10:00 AM", type: "Video Call", status: "confirmed" },
  { id: 2, counselor: "Dr. Michael Torres", date: "Apr 8, 2026", time: "2:00 PM", type: "Audio Call", status: "pending" },
];

const pastSessions = [
  { id: 3, counselor: "Dr. Sarah Chen", date: "Mar 28, 2026", time: "11:00 AM", type: "Video Call", notes: "Discussed college application timeline" },
  { id: 4, counselor: "Dr. Amara Okafor", date: "Mar 20, 2026", time: "3:00 PM", type: "Chat", notes: "Reviewed scholarship essay draft" },
  { id: 5, counselor: "Dr. James Park", date: "Mar 12, 2026", time: "1:00 PM", type: "Video Call", notes: "Leadership skills assessment" },
];

const stats = [
  { label: "Total Sessions", value: "12", icon: Video, color: "gradient-primary" },
  { label: "Hours Counseled", value: "9.5", icon: Clock, color: "gradient-warm" },
  { label: "Counselors Seen", value: "4", icon: MessageSquare, color: "gradient-primary" },
  { label: "Goals Achieved", value: "7", icon: TrendingUp, color: "gradient-warm" },
];

const Dashboard = () => (
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-card rounded-xl border border-border shadow-card p-5">
              <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center mb-3`}>
                <s.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <p className="text-2xl font-bold text-card-foreground">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-card rounded-xl border border-border shadow-card p-6 mb-8">
          <h2 className="text-xl font-bold font-sans text-card-foreground mb-4">Upcoming Sessions</h2>
          {upcomingSessions.length === 0 ? (
            <p className="text-muted-foreground">No upcoming sessions.</p>
          ) : (
            <div className="space-y-3">
              {upcomingSessions.map((s) => (
                <div key={s.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                      {s.counselor.split(' ').slice(1).map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-card-foreground">{s.counselor}</p>
                      <p className="text-sm text-muted-foreground">{s.date} at {s.time} · {s.type}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    s.status === "confirmed" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                  }`}>
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Past Sessions */}
        <div className="bg-card rounded-xl border border-border shadow-card p-6">
          <h2 className="text-xl font-bold font-sans text-card-foreground mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" /> Session History
          </h2>
          <div className="space-y-3">
            {pastSessions.map((s) => (
              <div key={s.id} className="flex items-start justify-between p-4 rounded-lg bg-secondary/50">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-bold">
                    {s.counselor.split(' ').slice(1).map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">{s.counselor}</p>
                    <p className="text-sm text-muted-foreground">{s.date} at {s.time} · {s.type}</p>
                    <p className="text-sm text-muted-foreground mt-1 italic">"{s.notes}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Dashboard;
