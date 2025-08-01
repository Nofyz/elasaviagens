import HeroSection from '@/components/HeroSection';
import DestinationsSection from '@/components/DestinationsSection';
import PackagesSection from '@/components/PackagesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-inter">
      <HeroSection />
      <DestinationsSection />
      <PackagesSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
