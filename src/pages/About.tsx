import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import DevelopmentProcess from "@/components/DevelopmentProcess";
import TeamSection from "@/components/TeamSection";
import CoreValuesSection from "@/components/CoreValuesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AboutSection />
      <DevelopmentProcess />
      <TeamSection />
      <CoreValuesSection />
      <WhyChooseUsSection />
      <Footer />
    </div>
  );
};

export default About;
