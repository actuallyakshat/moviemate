import { Contact } from "./Contact";
import { Faq } from "./Faq";
import { Features } from "./Features";
import { Footer } from "./Footer";
import { Hero } from "./Hero";

const Landing = () => {
  return (
    <div>
      <Hero />
      <Features />
      <Faq />
      <Contact />
      <Footer />
    </div>
  );
};

export default Landing;
