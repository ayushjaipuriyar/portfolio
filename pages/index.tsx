import LeftSide from "@/components/LeftSide";
import { Navbar } from "@/components/Navbar";
import RightSide from "@/components/RightSide";
import Banner from "@/components/Banner";
import Head from "next/head";
import { motion } from "framer-motion";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Archive from "@/components/Archive";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <>
      <Head>
        <title>Ayush Jaipuriyar</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <main className="w-full h-screen font-bodyFont bg-bodyColor text-textLight overflow-x-hidden overflow-y-scroll scrollbar scrollbar-track-textDark/200 scrollbar-thumb-textDark/60">
        <Navbar />
        <div className="w-full h-[88hvh] xl:flex items-center gap-20 justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="hidden xl:inline-flex w-32 h-full fixed left-0 bottom-10"
          >
            <LeftSide />
          </motion.div>
          <motion.div className="h-[88vh] mx-auto p-4">
            <Banner />
            <About />
            <Experience />
            <Projects />
            <Archive />
            <Contact />
            <Footer text="og" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="hidden xl:inline-flex w-32 h-full fixed right-0 bottom-20"
          >
            <RightSide />
          </motion.div>
        </div>
      </main>
    </>
  );
}
