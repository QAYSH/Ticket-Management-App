import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import { CheckCircle2, Zap, Shield, Users } from 'lucide-react';
import waveBackground from '@/assets/wave-background.jpg';

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5">
        {/* Wave background */}
        <div
          className="absolute inset-0 opacity-20 z-0"
          style={{
            backgroundImage: `url(${waveBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Decorative circles */}
        {/* Show both circles on md+ screens, only one (top-right) on smaller */}
        <div className="absolute top-20 right-10 w-48 h-48 sm:w-64 sm:h-64 bg-primary/30 rounded-full z-10 animate-float-slow" />
        <div className=" md:block absolute bottom-20 left-10 w-72 h-72 sm:w-48 sm:h-48 bg-accent/40 rounded-full z-10 animate-float" />

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TickBase
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8">
              Streamline your workflow with powerful, intuitive ticket management
            </p>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto">
              Organize, track, and resolve issues faster. Perfect for teams of all sizes looking to boost productivity and collaboration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-base sm:text-lg px-6 sm:px-8">
                <Link to="/auth/signup">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8">
                <Link to="/auth/login">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Why Choose TickBase?</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage tickets efficiently and effectively
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Create and manage tickets in seconds with our intuitive interface',
              },
              {
                icon: Shield,
                title: 'Secure & Reliable',
                description: 'Your data is protected with industry-standard security measures',
              },
              {
                icon: Users,
                title: 'Team Collaboration',
                description: 'Work together seamlessly with real-time updates and notifications',
              },
              {
                icon: CheckCircle2,
                title: 'Track Progress',
                description: 'Monitor ticket status from creation to resolution with ease',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-border text-center sm:text-left"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto sm:mx-0">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 sm:p-12 text-center text-white shadow-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of teams already using TickBase to manage their tickets efficiently
            </p>
            <Button asChild size="lg" variant="secondary" className="text-base sm:text-lg px-6 sm:px-8">
              <Link to="/auth/signup">Start Free Today</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
