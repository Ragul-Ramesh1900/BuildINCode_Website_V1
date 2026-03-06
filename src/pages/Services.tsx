import Navbar from "@/components/Navbar";
import DetailedServices from "@/components/DetailedServices";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import Footer from "@/components/Footer";

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <DetailedServices />
        <WhyChooseUsSection />
      </div>
      <Footer />
    </div>
  );
};

export default Services;
