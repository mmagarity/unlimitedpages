import React from 'react';
import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { MetricsSection } from '../components/MetricsSection';
import { ApproachSection } from '../components/ApproachSection';
import { OptimizationSection } from '../components/OptimizationSection';
import { PricingSection } from '../components/PricingSection';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <MetricsSection />
      <ApproachSection />
      <OptimizationSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
}