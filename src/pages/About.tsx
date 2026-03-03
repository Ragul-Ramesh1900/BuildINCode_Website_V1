import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import TechStackSection from "@/components/TechStackSection";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AboutSection />
      <WhyChooseUsSection />
      <TechStackSection />
      <Footer />
    </div>
  );
};

export default About;
