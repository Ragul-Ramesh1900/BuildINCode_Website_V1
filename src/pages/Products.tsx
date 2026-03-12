import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Products = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20 container mx-auto px-4 min-h-[70vh]">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Our <span className="text-gradient">Products</span></h1>
        <p className="text-muted-foreground text-center text-lg max-w-2xl mx-auto mb-16">
          Explore our range of powerful digital products designed to scale with your business. We are currently updating our product catalog. Check back soon for more updates.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
