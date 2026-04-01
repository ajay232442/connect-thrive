import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Video, Calendar, Users, Shield, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CounselorCard from "@/components/CounselorCard";
import { counselors } from "@/data/counselors";
import heroImage from "@/assets/hero-counseling.jpg";

const features = [
  { icon: Video, title: "Video Sessions", description: "Face-to-face virtual sessions with certified counselors from the comfort of your home." },
  { icon: Calendar, title: "Easy Scheduling", description: "Book appointments that fit your schedule with flexible time slots and reminders." },
  { icon: Users, title: "Expert Counselors", description: "Access a network of verified professionals specializing in academic and career guidance." },
  { icon: Shield, title: "Private & Secure", description: "End-to-end encrypted sessions ensuring your conversations remain confidential." },
];

const Index = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />

    {/* Hero */}
    <section className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Virtual Guidance Counseling
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground">
              Your Path to <span className="text-gradient">Success</span> Starts Here
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Connect with certified guidance counselors from anywhere. Get personalized academic, career, and personal development support remotely.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/counselors">
                <Button variant="hero" size="lg" className="gap-2">
                  Find a Counselor <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="lg">View Dashboard</Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImage}
              alt="Virtual counseling session illustration"
              width={1280}
              height={720}
              className="rounded-2xl shadow-card-hover"
            />
          </div>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-foreground">Why Choose GuidePath?</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          We make professional guidance accessible, convenient, and effective for every student.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                <f.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-card-foreground mb-2 font-sans text-base">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Featured Counselors */}
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Top Counselors</h2>
            <p className="text-muted-foreground mt-1">Connect with our highest-rated professionals</p>
          </div>
          <Link to="/counselors">
            <Button variant="outline" className="gap-1">View All <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {counselors.slice(0, 3).map((c) => (
            <CounselorCard key={c.id} counselor={c} />
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="gradient-primary rounded-2xl p-8 md:p-12 text-center shadow-hero">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Join thousands of students who've already found their path with GuidePath.
          </p>
          <Link to="/book">
            <Button variant="secondary" size="lg" className="font-semibold">
              Book Your First Session
            </Button>
          </Link>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Index;
