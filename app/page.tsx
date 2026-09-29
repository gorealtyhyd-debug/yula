import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Overview from '@/components/Overview';
import Marquee from '@/components/Marquee';
import Residences from '@/components/Residences';
import MasterPlan from '@/components/MasterPlan';
import Amenities from '@/components/Amenities';
import Gallery from '@/components/Gallery';
import Location from '@/components/Location';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Overview />
        <Marquee />
        <Residences />
        <MasterPlan />
        <Amenities />
        <Gallery />
        <FAQ />
        <Location />
      </main>
      <Footer />
    </>
  );
}
