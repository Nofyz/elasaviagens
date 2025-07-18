import HeroSection from '@/components/HeroSection';
import PackagesSection from '@/components/PackagesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-inter">
      <HeroSection />
      <PackagesSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
