import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { About } from './components/sections/About';
import { Process } from './components/sections/Process';
import { ProjectBuilder } from './components/sections/ProjectBuilder';
import { Contact } from './components/sections/Contact';

function App() {
  return (
    <div className="min-h-screen bg-abyss">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Process />
        <ProjectBuilder />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
