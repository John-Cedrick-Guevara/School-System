'use client'
import Nav from "./_Components/Nav";
import Hero from "./_Components/Hero";
import About from "./_Components/About";
import Features from "./_Components/Features";
import GetStarted from "./_Components/GetStarted";
import Footer from "./_Components/Footer";

export default function Home() {
  return (
    <main >
      <Nav />
      <Hero/>
      <About/>
      <Features/>
      <GetStarted/>
      <Footer/>
    </main>
  );
}
