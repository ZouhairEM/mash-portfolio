'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

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

interface FilmModalProps {
  videoSrc: string;
  onClose: () => void;
}

function FilmModal({ videoSrc, onClose }: FilmModalProps) {
  const isYouTube =
    videoSrc.includes('youtube.com') || videoSrc.includes('youtu.be');
  let content;

  if (isYouTube) {
    const url = new URL(videoSrc);
    const videoId = url.searchParams.get('v');
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&loop=1&playlist=${videoId}`;

    content = (
      <div className="relative w-full h-0 pb-[56.25%]">
        <iframe
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        ></iframe>
      </div>
    );
  } else {
    content = (
      <video
        src={videoSrc}
        controls
        autoPlay
        loop
        className="w-full h-auto max-h-full object-contain"
      >
        Your browser does not support the video tag.
      </video>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-4"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="back flex items-center justify-around gap-2 absolute top-4 left-4 z-50 text-white p-2 rounded"
          aria-label="Close video and go back"
        >
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

        <div
          className="relative w-full h-full max-w-4xl max-h-4xl flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {content}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Editing() {
  const [activeVideoSrc, setActiveVideoSrc] = useState<string | null>(null);

  const handleOpenModal = (videoPath: string) => setActiveVideoSrc(videoPath);
  const handleCloseModal = () => setActiveVideoSrc(null);

  const isModalOpen = !!activeVideoSrc;

  const STUDIO_JUMHOOR_YOUTUBE_URL =
    'https://www.youtube.com/watch?v=Ix8wp2Ks6Fk';

  const createClickHandlerForMp4 = (imageSrc: string) => {
    const videoPath = imageSrc.replace(/\.avif$/, '.mp4');
    return () => handleOpenModal(videoPath);
  };

  return (
    <>
      {!isModalOpen && (
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
      )}

      <div className={isModalOpen ? 'hidden' : ''}>
        <h2 className="project-header text-center">Editing</h2>
        <main className="container mb-0 flex min-h-screen flex-col items-center justify-between p-6 sm:mb-40 sm:p-0 mx-auto">
          <div className="flex flex-col items-center gap-4 justify-center">
            <p className="w-4/10 text-center">
              Editing is my specialty, what makes me stand outside of other
              editors is that my niche is the psychology of editing and
              understanding of social media algorithms, I know how to get the
              numbers through various psychological ways of the viewers
              attention and with the understanding of the algorithms I have
              accomplished more than 1,000,000+ views for multiple clients.
            </p>
          </div>

          <div className="grid md:grid-cols-12 my-10 gap-8">
            {/* Project 1: Ash Meppers (Local Video) */}
            <div
              className="flex justify-center cursor-pointer sm:col-span-12 md:col-span-6 project-hoverable p-2"
              role="button"
              tabIndex={0}
              onClick={createClickHandlerForMp4('/editing/editing-1.avif')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  createClickHandlerForMp4('/editing/editing-1.avif')();
                }
              }}
            >
              <div className="flex flex-col gap-8">
                <AnimatedImage
                  src={'/editing/editing-1.avif'}
                  alt="Screenshot of Ash Meppers' YouTube page"
                  width={500}
                  height={500}
                />
                <span className="text-white text-center font-bold">
                  View Now
                </span>
                <p className="text-center">
                  This page is the work on Youtube and TikTok for a client named
                  Ash Meppers.
                </p>
              </div>
            </div>

            {/* Project 2: StudioJumhoor (YouTube Video) */}
            <div
              className="flex justify-center cursor-pointer sm:col-span-12 md:col-span-6 project-hoverable p-2"
              role="button"
              tabIndex={0}
              onClick={() => handleOpenModal(STUDIO_JUMHOOR_YOUTUBE_URL)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleOpenModal(STUDIO_JUMHOOR_YOUTUBE_URL);
                }
              }}
            >
              <div className="flex flex-col gap-8">
                <AnimatedImage
                  src={'/editing/editing-2.avif'}
                  alt="Image of StudioJumhoor on YouTube"
                  width={500}
                  height={500}
                />
                <span className="text-white text-center font-bold">
                  View Now
                </span>
                <p className="text-center">
                  Editing for a sports studio called StudioJumhoor on Youtube.
                </p>
              </div>
            </div>

            {/* Project 3: JohnSims_ (Local Video) */}
            <div
              className="flex justify-center cursor-pointer sm:col-span-12 md:col-span-6 project-hoverable p-2"
              role="button"
              tabIndex={0}
              onClick={createClickHandlerForMp4('/editing/editing-3.avif')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  createClickHandlerForMp4('/editing/editing-3.avif')();
                }
              }}
            >
              <div className="flex flex-col gap-8">
                <AnimatedImage
                  className="mx-auto"
                  src={'/editing/editing-3.avif'}
                  alt="Image of Fifa player"
                  width={250}
                  height={250}
                />
                <span className="text-white text-center font-bold">
                  View Now
                </span>
                <p className="text-center">
                  TikTok and Youtube edits for a client called JohnSims_.
                </p>
              </div>
            </div>

            {/* Project 4: Mazaya New Years (Local Video) */}
            <div
              className="flex justify-center cursor-pointer sm:col-span-12 md:col-span-6 project-hoverable p-2"
              role="button"
              tabIndex={0}
              onClick={createClickHandlerForMp4('/editing/editing-4.avif')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  createClickHandlerForMp4('/editing/editing-4.avif')();
                }
              }}
            >
              <div className="flex flex-col gap-8">
                <AnimatedImage
                  className="mx-auto"
                  src={'/editing/editing-4.avif'}
                  alt="Edit for Mazaya's New Years campaign."
                  width={250}
                  height={250}
                />
                <span className="text-white text-center font-bold">
                  View Now
                </span>
                <p className="text-center">
                  Edit for Mazayas New Years campaign.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {activeVideoSrc && (
        <FilmModal videoSrc={activeVideoSrc} onClose={handleCloseModal} />
      )}
    </>
  );
}
