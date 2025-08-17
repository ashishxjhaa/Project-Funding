import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

function LandingPage() {
  return (
    <div className='bg-black min-h-screen w-full'>
      <Navbar />
      <div className='mt-42'>
        <Image src="/background.svg" alt="hero-image" className="h-10 md:h-15 object-cover w-full" width={10} height={10}/>
        <Image src="/background.svg" alt="hero-image" className="rotate-180 h-10 md:h-15 object-cover w-full" width={10} height={10}/>
      </div>
      <Hero />
      <div className='mt-18'>
        <Image src="/background.svg" alt="hero-image" className="h-10 md:h-15 object-cover w-full" width={10} height={10}/>
        <Image src="/background.svg" alt="hero-image" className="rotate-180 h-10 md:h-15 object-cover w-full" width={10} height={10}/>
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage