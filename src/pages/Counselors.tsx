import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CounselorCard from "@/components/CounselorCard";
import { counselors } from "@/data/counselors";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Counselors = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "available">("all");

  const filtered = counselors.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.specialty.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || c.available;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Our Counselors</h1>
          <p className="text-muted-foreground mb-8">Find the perfect counselor for your needs</p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or specialty..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === "all" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("available")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === "available" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
              >
                Available Now
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c) => (
              <CounselorCard key={c.id} counselor={c} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No counselors found matching your criteria.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Counselors;
