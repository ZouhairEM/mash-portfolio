'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Home() {
  const infoRef = useRef(null);
  const isInfoInView = useInView(infoRef, { once: true, amount: 0.3 });

  const infoVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const portfolioVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <>
      <main className="container mb-0 flex min-h-screen flex-col items-center justify-between p-6 sm:mb-40 sm:p-0 mx-auto">
        <section className="backdrop pt-10">
          <div className="credit-roll">
            <motion.div
              id="portfolio"
              initial="hidden"
              animate="visible"
              variants={portfolioVariants}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <h1>PORTFOLIO</h1>
              <span className="flex justify-center items-center flex-col">
                <span>MOHAMMAD MASHOUKA</span>
                <span>DESIGNER - ARTIST</span>
              </span>
            </motion.div>
          </div>
        </section>

        <section
          id="projects"
          className="flex flex-col items-center justify-center"
        >
          <div>
            <h2 className="pt-20 uppercase">Projects</h2>
            <div className="w-full h-px bg-white mb-10"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/projects/graphic-design">
              <div
                className="project-card cursor-pointer"
                role="button"
                tabIndex={0}
              >
                <span>Graphic Design</span>
                <Image
                  src={'/projects-1.avif'}
                  alt="Image of the BMW project"
                  width={600}
                  height={600}
                />
              </div>
            </Link>
            <Link href="/projects/editing">
              <div
                className="project-card cursor-pointer"
                role="button"
                tabIndex={0}
              >
                <span className="">Editing</span>
                <Image
                  src={'/projects-2.avif'}
                  alt="Image of the Editing project"
                  width={600}
                  height={600}
                />
              </div>
            </Link>
            <Link href="/projects/fashion">
              <div
                className="project-card cursor-pointer"
                role="button"
                tabIndex={0}
              >
                <span className="">Fashion</span>
                <Image
                  src={'/projects-3.avif'}
                  alt="Image of the Fashion project"
                  width={600}
                  height={600}
                />
              </div>
            </Link>
            <Link href="/projects/film-making">
              <div
                className="project-card cursor-pointer"
                role="button"
                tabIndex={0}
              >
                <span className="">Film Making</span>
                <Image
                  src={'/projects-4.avif'}
                  alt="Image of the Film making project"
                  width={500}
                  height={500}
                />
              </div>
            </Link>
          </div>
        </section>

        <motion.section
          id="info"
          ref={infoRef}
          className="flex flex-col items-center justify-center"
          initial="hidden"
          animate={isInfoInView ? 'visible' : 'hidden'}
          variants={infoVariants}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="pt-20 uppercase">Info</h2>
          <div className="flex justify-center items-center gap-4 mb-10">
            <svg
              preserveAspectRatio="xMidYMid meet"
              data-bbox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 200 200"
              role="presentation"
              aria-hidden="true"
            >
              <g>
                <path
                  fill="white"
                  d="M200 100c0 55.228-44.772 100-100 100S0 155.228 0 100 44.772 0 100 0s100 44.772 100 100z"
                ></path>
              </g>
            </svg>
            <svg
              preserveAspectRatio="xMidYMid meet"
              data-bbox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 200 200"
              role="presentation"
              aria-hidden="true"
            >
              <g>
                <path
                  fill="white"
                  d="M200 100c0 55.228-44.772 100-100 100S0 155.228 0 100 44.772 0 100 0s100 44.772 100 100z"
                ></path>
              </g>
            </svg>
            <svg
              preserveAspectRatio="xMidYMid meet"
              data-bbox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 200 200"
              role="presentation"
              aria-hidden="true"
            >
              <g>
                <path
                  fill="white"
                  d="M200 100c0 55.228-44.772 100-100 100S0 155.228 0 100 44.772 0 100 0s100 44.772 100 100z"
                ></path>
              </g>
            </svg>
          </div>

          <p className="text-center w-3/4">
            A jack of all trades in design and art, based in Amman, Jordan. I am
            available for design collaborations and projects. Reach out to
            discuss your creative needs.
          </p>
          <p className="mt-10 text-center">
            <a href="mailto:mohammadmashouka@gmail.com">
              Email: mohammadmashouka@gmail.com
            </a>
            <br />
            <span>Tel: +962792944744</span>
          </p>
          <a
            href="https://www.instagram.com/mohammadmashoukaa/"
            target="_blank"
          >
            <Image
              className="my-10"
              src={'/instagram.avif'}
              alt="Mash's Avatar"
              width={40}
              height={40}
            />
          </a>
        </motion.section>
        <svg
          preserveAspectRatio="xMidYMid meet"
          data-bbox="19 56 162 89"
          version="1.1"
          width={30}
          height={30}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="19 56 162 89"
          className="chevron-up cursor-pointer"
          tabIndex={0}
          role="button"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <g>
            <polygon
              fill="white"
              points="181,64 173,56 100,128 27,56 19,64 100,145 "
            ></polygon>
          </g>
        </svg>
      </main>
    </>
  );
}
