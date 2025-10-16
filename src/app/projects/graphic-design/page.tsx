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
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      ref={ref}
      className={`${className} overflow-hidden group`}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
      />
    </motion.div>
  );
}

export default function GraphicDesign() {
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
      <h2 className="project-header text-center">Graphic Design</h2>
      <main className="container mb-0 flex min-h-screen flex-col items-center justify-between p-6 sm:mb-40 sm:p-0 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 grid-auto-rows-[150px]">
          <Link
            href={{
              pathname: '/projects/graphic-design/subpages',
              query: {
                projectGenre: 'graphic-design',
                projectHeader: 'Project 1',
                project: '1',
              },
            }}
            className="col-span-2 row-span-1"
          >
            <AnimatedImage
              src={'/graphic-design/graphic-design-1.avif'}
              alt="Graphic Design Example 1"
              width={750}
              height={750}
              className="w-full h-full"
            />
          </Link>

          <Link
            href={{
              pathname: '/projects/graphic-design/subpages',
              query: {
                projectGenre: 'graphic-design',
                projectHeader: 'Project 2',
                project: '2',
              },
            }}
            className="col-span-2 row-span-2"
          >
            <AnimatedImage
              src={'/graphic-design/graphic-design-2.avif'}
              alt="Graphic Design Example 2"
              width={750}
              height={750}
              className="w-full h-full"
            />
          </Link>

          <Link
            href={{
              pathname: '/projects/graphic-design/subpages',
              query: {
                projectGenre: 'graphic-design',
                projectHeader: 'Project 3',
                project: '3',
              },
            }}
            className="col-span-2 row-span-3"
          >
            <AnimatedImage
              src={'/graphic-design/graphic-design-3.avif'}
              alt="Graphic Design Example 3"
              width={750}
              height={750}
              className="w-full h-full"
            />
          </Link>

          <Link
            href={{
              pathname: '/projects/graphic-design/subpages',
              query: {
                projectGenre: 'graphic-design',
                projectHeader: 'Project 4',
                project: '4',
              },
            }}
            className="col-span-2 row-span-4"
          >
            <AnimatedImage
              src={'/graphic-design/graphic-design-4.avif'}
              alt="Graphic Design Example 4"
              width={750}
              height={750}
              className="w-full h-full"
            />
          </Link>

          <Link
            href={{
              pathname: '/projects/graphic-design/subpages',
              query: {
                projectGenre: 'graphic-design',
                projectHeader: 'Project 4',
                project: '5',
              },
            }}
            className="col-span-2 row-span-3"
          >
            <AnimatedImage
              src={'/graphic-design/graphic-design-5.avif'}
              alt="Graphic Design Example 5"
              width={750}
              height={750}
              className="w-full h-full"
            />
          </Link>
        </div>
      </main>
    </>
  );
}
