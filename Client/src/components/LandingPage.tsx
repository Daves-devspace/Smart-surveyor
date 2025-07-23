import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Layers, 
  FileCheck, 
  Users, 
  Download, 
  Search,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import heroImage from "@/assets/hero-surveying.jpg";

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  const features = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Smart Land Input",
      description: "Upload boundaries via KML/GeoJSON or draw directly on interactive maps"
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "AI-Powered Layouts",
      description: "Automatically generate optimized plot subdivisions with road networks"
    },
    {
      icon: <FileCheck className="h-6 w-6" />,
      title: "Compliance Checks",
      description: "Real-time validation against zoning laws and registry requirements"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Client Collaboration",
      description: "Share layouts instantly with clients and planning departments"
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Multi-Format Export",
      description: "Generate PDFs, CAD files, and GIS formats for any workflow"
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "National Plot Registry",
      description: "Search and verify any plot in the comprehensive database"
    }
  ];

  const benefits = [
    "Reduce subdivision time from weeks to hours",
    "Eliminate manual calculation errors",
    "Ensure 100% regulatory compliance",
    "Streamline client approval process",
    "Access comprehensive plot database",
    "Professional documentation export"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Layers className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">SurveyPro</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </a>
            <a href="#benefits" className="text-sm font-medium hover:text-primary transition-colors">
              Benefits
            </a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onGetStarted}>
              Sign In
            </Button>
            <Button variant="hero" size="sm" onClick={onGetStarted}>
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="text-sm">
                  <Zap className="h-3 w-3 mr-1" />
                  AI-Powered Land Subdivision
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Professional Land
                  <span className="text-primary block">Subdivision</span>
                  <span className="text-accent">Made Simple</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-[600px]">
                  Transform complex land surveying into streamlined workflows. Generate compliant 
                  subdivisions, collaborate with clients, and access the national plot registry—all 
                  in one powerful platform.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="xl" className="animate-fade-in" onClick={onGetStarted}>
                  Start Free Trial
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="xl" className="animate-fade-in">
                  <MapPin className="h-5 w-5" />
                  View Demo
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>30-day free trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-success" />
                  <span>Secure & compliant</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-strong">
                <img 
                  src={heroImage} 
                  alt="Professional land surveying and subdivision"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-card border rounded-xl p-4 shadow-soft animate-scale-in">
                <div className="text-2xl font-bold text-primary">2,500+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-card border rounded-xl p-4 shadow-soft animate-scale-in">
                <div className="text-2xl font-bold text-accent">98%</div>
                <div className="text-sm text-muted-foreground">Compliance Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Everything You Need for Professional Surveying
            </h2>
            <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
              From boundary input to final documentation, our platform handles every step 
              of the subdivision process with precision and efficiency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 bg-card/50 backdrop-blur hover:shadow-soft transition-all duration-300 group">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary">Benefits</Badge>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Transform Your Surveying Workflow
                </h2>
                <p className="text-xl text-muted-foreground">
                  Join hundreds of professional surveyors who have revolutionized their 
                  practice with our AI-powered platform.
                </p>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-foreground font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button variant="default" size="lg">
                See How It Works
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">75%</div>
                <div className="text-sm text-muted-foreground">Time Savings</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Export Formats</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container text-center">
          <div className="max-w-[600px] mx-auto space-y-8 text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Revolutionize Your Surveying Practice?
            </h2>
            <p className="text-xl opacity-90">
              Join thousands of professional surveyors who trust SurveyPro for their 
              land subdivision needs. Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="xl" onClick={onGetStarted}>
                Start Free Trial
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="xl" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Layers className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">SurveyPro</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Professional land subdivision platform for modern surveyors.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Product</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Features</div>
                <div>Pricing</div>
                <div>API</div>
                <div>Integrations</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Resources</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Documentation</div>
                <div>Support</div>
                <div>Training</div>
                <div>Community</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>About</div>
                <div>Blog</div>
                <div>Careers</div>
                <div>Contact</div>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 SurveyPro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};