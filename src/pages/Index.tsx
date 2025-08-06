import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PackagesSection from '@/components/PackagesSection';
import CustomPackagesSection from '@/components/CustomPackagesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-inter">
      <Header />
      <HeroSection />
      <PackagesSection />
      <CustomPackagesSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;