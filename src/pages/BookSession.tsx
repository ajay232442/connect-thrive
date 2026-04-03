import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCounselors } from "@/hooks/useCounselors";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Clock, CheckCircle, LogIn } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

const BookSession = () => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [counselorId, setCounselorId] = useState("");
  const [sessionType, setSessionType] = useState("");
  const [sessionDate, setSessionDate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: counselors = [] } = useCounselors();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please sign in to book a session.");
      navigate("/auth");
      return;
    }

    if (!selectedTime) {
      toast.error("Please select a time slot.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("appointments").insert({
      user_id: user.id,
      counselor_id: counselorId,
      session_date: sessionDate,
      session_time: selectedTime,
      session_type: sessionType,
      notes: notes || null,
    });

    if (error) {
      toast.error("Failed to book session: " + error.message);
    } else {
      setSubmitted(true);
      toast.success("Session booked successfully!");
    }
    setLoading(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <LogIn className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4 text-foreground">Sign In Required</h1>
            <p className="text-muted-foreground mb-6">You need to sign in to book a counseling session.</p>
            <Link to="/auth">
              <Button variant="hero">Sign In</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-foreground">Session Booked!</h1>
            <p className="text-muted-foreground mb-6">Your counseling session has been scheduled. You'll receive a confirmation email with the meeting link.</p>
            <div className="flex gap-3 justify-center">
              <Button variant="hero" onClick={() => setSubmitted(false)}>Book Another</Button>
              <Link to="/dashboard">
                <Button variant="outline">View Dashboard</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Book a Session</h1>
          <p className="text-muted-foreground mb-8">Schedule a virtual counseling session at your convenience</p>

          <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border shadow-card p-6 md:p-8 space-y-6">
            <div className="space-y-2">
              <Label>Select Counselor</Label>
              <Select required value={counselorId} onValueChange={setCounselorId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a counselor" />
                </SelectTrigger>
                <SelectContent>
                  {counselors.filter(c => c.available).map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name} — {c.specialty}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Session Type</Label>
              <Select required value={sessionType} onValueChange={setSessionType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select session type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video Call</SelectItem>
                  <SelectItem value="audio">Audio Call</SelectItem>
                  <SelectItem value="chat">Chat Session</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Preferred Date</Label>
              <Input type="date" required className="block" value={sessionDate} onChange={(e) => setSessionDate(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Preferred Time</Label>
              <div className="flex flex-wrap gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                      selectedTime === slot
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    <Clock className="h-3.5 w-3.5" /> {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Notes (optional)</Label>
              <Textarea placeholder="Briefly describe what you'd like to discuss..." rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>

            <Button variant="hero" size="lg" type="submit" className="w-full gap-2" disabled={loading}>
              <Calendar className="h-4 w-4" /> {loading ? "Booking..." : "Confirm Booking"}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookSession;
