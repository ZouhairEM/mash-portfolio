'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

function AnimatedImage({
  src,
  alt,
  width,
  height,
  className,
}: AnimatedImageProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 }); // Trigger when 20% visible

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

export default function Fashion() {
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
      <h2 className="text-center">Fashion</h2>
      <main className="container mb-0 flex min-h-screen flex-col items-center justify-between p-6 sm:mb-40 sm:p-0 mx-auto">
        <div className="flex flex-col items-center gap-4 my-10 justify-center">
          <p className="w-4/10 text-center">
            My participation of a fashion show where every designer was meant to
            capture the essence of a country, my designs were to capture the
            essence of Egypt through the daily used demotic hieroglyphics for
            the men attire.
          </p>
          <p className="w-4/10 text-center">
            As for the woman I captured the glory of the most powerful woman in
            history Kleopatra in a modern business outfit that shows power.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <AnimatedImage
            src={'/fashion/fashion-1.avif'}
            alt="Image of fashion piece 1"
            width={750}
            height={750}
            className="sm:col-span-12 md:col-span-6"
          />
          <AnimatedImage
            src={'/fashion/fashion-2.avif'}
            alt="Image of fashion piece 2"
            width={750}
            height={750}
            className="sm:col-span-12 md:col-span-6"
          />
          <AnimatedImage
            src={'/fashion/fashion-3.avif'}
            alt="Image of fashion piece 3"
            width={750}
            height={750}
            className="sm:col-span-12 md:col-span-6"
          />
          <AnimatedImage
            src={'/fashion/fashion-4.avif'}
            alt="Image of fashion piece 4"
            width={750}
            height={750}
            className="sm:col-span-12 md:col-span-6"
          />
          <AnimatedImage
            src={'/fashion/fashion-5.avif'}
            alt="Image of fashion piece 5"
            width={750}
            height={750}
            className="sm:col-span-12 md:col-span-6"
          />
          <AnimatedImage
            src={'/fashion/fashion-6.avif'}
            alt="Image of fashion piece 6"
            width={750}
            height={750}
            className="sm:col-span-12 md:col-span-6"
          />
        </div>
      </main>
    </>
  );
}
