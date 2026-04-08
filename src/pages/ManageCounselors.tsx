import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useCounselors } from "@/hooks/useCounselors";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Trash2, Plus, UserPlus, ShieldAlert } from "lucide-react";
import { Navigate } from "react-router-dom";

const ManageCounselors = () => {
  const { user, loading: authLoading } = useAuth();
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();
  const { data: counselors = [], isLoading } = useCounselors();
  const queryClient = useQueryClient();

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [bio, setBio] = useState("");
  const [available, setAvailable] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  if (!authLoading && !user) return <Navigate to="/auth" replace />;

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16 flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16 flex flex-col items-center justify-center gap-4">
          <ShieldAlert className="h-16 w-16 text-destructive" />
          <h1 className="text-2xl font-bold text-foreground">Access Denied</h1>
          <p className="text-muted-foreground">Only administrators can manage counselors.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !specialty.trim()) {
      toast.error("Name and specialty are required");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("counselors").insert({
      name: name.trim(),
      specialty: specialty.trim(),
      bio: bio.trim() || null,
      available,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Failed to add counselor");
    } else {
      toast.success("Counselor added successfully");
      setName("");
      setSpecialty("");
      setBio("");
      setAvailable(true);
      setShowForm(false);
      queryClient.invalidateQueries({ queryKey: ["counselors"] });
    }
  };

  const handleDelete = async (id: string, counselorName: string) => {
    if (!confirm(`Remove ${counselorName}?`)) return;
    const { error } = await supabase.from("counselors").delete().eq("id", id);
    if (error) {
      toast.error("Failed to remove counselor");
    } else {
      toast.success(`${counselorName} removed`);
      queryClient.invalidateQueries({ queryKey: ["counselors"] });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Manage Counselors</h1>
              <p className="text-muted-foreground">Add or remove counselors from the system</p>
            </div>
            <Button onClick={() => setShowForm(!showForm)} className="gap-2">
              {showForm ? "Cancel" : <><UserPlus className="h-4 w-4" /> Add Counselor</>}
            </Button>
          </div>

          {showForm && (
            <form onSubmit={handleAdd} className="bg-card border border-border rounded-xl p-6 mb-8 space-y-4">
              <h2 className="text-lg font-semibold text-card-foreground">New Counselor</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Dr. Jane Smith" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialty">Specialty *</Label>
                  <Input id="specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)} placeholder="Anxiety & Stress" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Brief description..." rows={3} />
              </div>
              <div className="flex items-center gap-2">
                <Switch id="available" checked={available} onCheckedChange={setAvailable} />
                <Label htmlFor="available">Available for sessions</Label>
              </div>
              <Button type="submit" disabled={submitting} className="gap-2">
                <Plus className="h-4 w-4" /> {submitting ? "Adding..." : "Add Counselor"}
              </Button>
            </form>
          )}

          {isLoading ? (
            <p className="text-center text-muted-foreground py-12">Loading...</p>
          ) : counselors.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No counselors yet. Add one above.</p>
          ) : (
            <div className="space-y-3">
              {counselors.map((c) => (
                <div key={c.id} className="flex items-center justify-between bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold shrink-0">
                      {c.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-medium text-card-foreground">{c.name}</p>
                      <p className="text-sm text-muted-foreground">{c.specialty}</p>
                    </div>
                  </div>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(c.id, c.name)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ManageCounselors;
