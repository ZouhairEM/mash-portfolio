'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

function AnimatedImage({ src, alt, width, height, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Image src={src} alt={alt} width={width} height={height} />
    </motion.div>
  );
}

export default function Editing() {
  return (
    <>
      <Link href="/">
        <button className="back flex items-center justify-around gap-2">
          <svg
            data-bbox="9.9 72 180.2 56"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 200 200"
            data-type="shape"
            fill="#FFFFFF"
          >
            <g>
              <path d="M186.3 96H32.2l28-15.5 3.4-1.8-3.7-6.7-3.3 1.8-40.8 22.5-5.9 3.3 5.9 3.4 40.4 23.1 3.3 1.9 3.7-6.6-3.3-1.9-27.8-15.9h158V96h-3.8z"></path>
            </g>
          </svg>
          <span>Back</span>
        </button>
      </Link>
      <h2 className="project-header text-center">Editing</h2>
      <main className="container mb-0 flex min-h-screen flex-col items-center justify-between p-6 sm:mb-40 sm:p-0 mx-auto">
        <div className="flex flex-col items-center gap-4 justify-center">
          <p className="w-4/10 text-center">
            Editing is my specialty, what makes me stand outside of other
            editors is that my niche is the psychology of editing and
            understanding of social media algorithms, I know how to get the
            numbers through various psychological ways of the viewers attention
            and with the understanding of the algorithms I have accomplished
            more than 1,000,000+ views for multiple clients.
          </p>
        </div>

        <div className="grid md:grid-cols-12 my-10 gap-8">
          <div
            className="flex justify-center cursor-pointer sm:col-span-12 md:col-span-6 project-hoverable p-2"
            role="button"
            tabIndex={0}
          >
            <Link href="/" className="flex flex-col gap-8">
              <AnimatedImage
                src={'/editing/editing-1.avif'}
                alt="Screenshot of Ash Meppers' YouTube page"
                width={500}
                height={500}
              />
              <span className="text-white text-center font-bold">View Now</span>
              <p className="text-center">
                This page is the work on Youtube and TikTok for a client named
                Ash Meppers.
              </p>
            </Link>
          </div>

          <div
            className="flex justify-center cursor-pointer sm:col-span-12 md:col-span-6 project-hoverable p-2"
            role="button"
            tabIndex={0}
          >
            <Link href="/" className="flex flex-col gap-8">
              <AnimatedImage
                src={'/editing/editing-2.avif'}
                alt="Image of StudioJumhoor on YouTube"
                width={500}
                height={500}
              />
              <span className="text-white text-center font-bold">View Now</span>
              <p className="text-center">
                Editing for a sports studio called StudioJumhoor on Youtube.
              </p>
            </Link>
          </div>

          <div
            className="flex justify-center cursor-pointer sm:col-span-12 md:col-span-6 project-hoverable p-2"
            role="button"
            tabIndex={0}
          >
            <Link href="/" className="flex flex-col gap-8">
              <AnimatedImage
                className="mx-auto"
                src={'/editing/editing-3.avif'}
                alt="Image of Fifa player"
                width={250}
                height={250}
              />
              <span className="text-white text-center font-bold">View Now</span>
              <p className="text-center">
                TikTok and Youtube edits for a client called JohnSims_.
              </p>
            </Link>
          </div>

          <div
            className="flex justify-center cursor-pointer sm:col-span-12 md:col-span-6 project-hoverable p-2"
            role="button"
            tabIndex={0}
          >
            <Link href="/" className="flex flex-col gap-8">
              <AnimatedImage
                className="mx-auto"
                src={'/editing/editing-4.avif'}
                alt="Edit for Mazaya's New Years campaign."
                width={250}
                height={250}
              />
              <span className="text-white text-center font-bold">View Now</span>
              <p className="text-center">
                Edit for Mazaya's New Years campaign.
              </p>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
