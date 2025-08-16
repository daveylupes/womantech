import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/ui/stat-card';
import { Users, Target, Award, Zap, ArrowRight, Heart, Shield, Globe } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import heroImage from '@/assets/hero-image.jpg';

const stats = [
  { title: 'Active Mentors', value: '150+', icon: Users, description: 'Verified industry professionals' },
  { title: 'Mentees Served', value: '500+', icon: Target, description: 'Women starting their tech journey' },
  { title: 'Sessions Completed', value: '1,200+', icon: Award, description: 'Successful mentorship connections' },
  { title: 'Reputation Points', value: '25,000+', icon: Zap, description: 'Earned through contributions' },
];

const features = [
  {
    icon: Shield,
    title: 'On-Chain Reputation',
    description: 'Build verifiable credibility through blockchain-based reputation tracking and transparent mentorship records.'
  },
  {
    icon: Heart,
    title: 'Meaningful Connections',
    description: 'Connect with industry professionals who are committed to supporting women in technology.'
  },
  {
    icon: Globe,
    title: 'Global Community',
    description: 'Join a worldwide network of women in tech, accessible from anywhere, anytime.'
  }
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-20" />
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Women in tech mentorship" 
            className="w-full h-full object-cover mix-blend-overlay opacity-30"
          />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            >
              Empowering Women in Tech Through{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Blockchain Mentorship
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl lg:text-2xl max-w-3xl mx-auto"
            >
              Connect, Learn, Grow - Build your on-chain reputation while fostering meaningful 
              mentorship relationships in the technology industry.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <ConnectButton.Custom>
                {({ account, chain, openConnectModal, mounted }) => (
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={openConnectModal}
                    className="text-lg px-8 py-4"
                  >
                    Join the Community
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                )}
              </ConnectButton.Custom>
              
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Learn More
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Building the Future Together
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Real impact through blockchain-verified mentorship relationships
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <StatCard {...stat} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why Choose WomanTech Connect?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Powered by BlockDAG technology for transparent, verifiable mentorship
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl p-8 shadow-soft hover:shadow-medium transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-hero rounded-2xl p-12 text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4 sm:text-4xl">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of women building their careers in technology through 
              meaningful mentorship connections.
            </p>
            <ConnectButton.Custom>
              {({ account, chain, openConnectModal, mounted }) => (
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={openConnectModal}
                  className="text-lg px-8 py-4"
                >
                  Connect Wallet & Begin
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
            </ConnectButton.Custom>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
