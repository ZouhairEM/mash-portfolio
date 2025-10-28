'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

const FASHION_IMAGE_SRCS = [
  '/fashion/fashion-1.avif',
  '/fashion/fashion-2.avif',
  '/fashion/fashion-3.avif',
  '/fashion/fashion-4.avif',
  '/fashion/fashion-5.avif',
  '/fashion/fashion-6.avif',
];

interface AnimatedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  // Prop to control the animation trigger
  animateOnView?: boolean;
}

function AnimatedImage({
  src,
  alt,
  width,
  height,
  className,
  animateOnView = true, // Default to true
}: AnimatedImageProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 }); // Trigger when 20% visible

  const variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // Determine animation state
  const animateState = animateOnView
    ? isInView
      ? 'visible'
      : 'hidden'
    : 'visible';

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={animateOnView ? 'hidden' : 'visible'} // Only initial "hidden" if animating on view
      animate={animateState}
      variants={variants}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Image src={src} alt={alt} width={width} height={height} />
    </motion.div>
  );
}

// --- New ImageModal Component (Carousel) ---

interface ImageModalProps {
  images: string[];
  initialImageIndex: number;
  onClose: () => void;
}

function ImageModal({ images, initialImageIndex, onClose }: ImageModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(initialImageIndex);

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentSrc = images[currentImageIndex];
  const currentImageAlt = `Fashion piece ${currentImageIndex + 1}`;

  const imageVariants = {
    enter: { opacity: 0, scale: 0.95 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} // Changed from 1 to 0 for initial
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }} // Changed from 1 to 0 for exit
        className="fixed inset-0 z-50 bg-black/60 flex flex-col items-center justify-center p-4"
        onClick={onClose} // Close on click outside the content area
      >
        <button
          onClick={onClose}
          className="back flex items-center justify-around gap-2 absolute top-4 left-4 z-50 text-white p-2 rounded"
          aria-label="Close image and go back"
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
          className="relative w-full h-full max-w-4xl max-h-[90vh] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking on content
        >
          {/* Previous Button (Desktop/Tablet) */}
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 text-white p-4 text-3xl opacity-70 hover:opacity-100 transition-opacity hidden sm:block"
            aria-label="Previous image"
          >
            &#10094;
          </button>

          {/* Next Button (Desktop/Tablet) */}
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 text-white p-4 text-3xl opacity-70 hover:opacity-100 transition-opacity hidden sm:block"
            aria-label="Next image"
          >
            &#10095;
          </button>

          {/* Image Display with AnimatePresence for transitions */}
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentSrc} // Key changes on image switch to trigger transition
              initial="enter"
              animate="center"
              exit="exit"
              variants={imageVariants}
              transition={{ duration: 0.05 }}
              className="relative w-full h-full flex items-center justify-center max-w-full max-h-full"
            >
              <Image
                src={currentSrc}
                alt={currentImageAlt}
                width={1000}
                height={1000}
                className="w-auto h-auto max-w-full max-h-full object-contain"
              />
              <p className="absolute bottom-4 text-white text-sm">
                {currentImageIndex + 1} / {images.length}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Navigation */}
        <div className="absolute bottom-0 w-full flex justify-center gap-10 p-4 sm:hidden">
          <button
            onClick={goToPrev}
            className="text-white p-2 text-xl opacity-80 hover:opacity-100"
            aria-label="Previous image"
          >
            &#10094; Previous
          </button>
          <button
            onClick={goToNext}
            className="text-white p-2 text-xl opacity-80 hover:opacity-100"
            aria-label="Next image"
          >
            Next &#10095;
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// --- Fashion Component (Updated) ---

export default function Fashion() {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const handleOpenModal = (index: number) => setActiveImageIndex(index);
  const handleCloseModal = () => setActiveImageIndex(null);

  const isModalOpen = activeImageIndex !== null;

  return (
    <>
      <div className={isModalOpen ? 'pointer-events-none' : ''}>
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
      </div>

      <div
        className={
          isModalOpen ? 'opacity-50 transition-opacity duration-300' : ''
        }
      >
        <h2 className="project-header text-center">Fashion</h2>
        <main className="container mb-0 flex min-h-screen flex-col items-center justify-between p-6 sm:mb-40 sm:p-0 mx-auto">
          <div className="flex flex-col items-center gap-4 my-10 justify-center">
            <p className="w-6/10 text-center">
              My participation of a fashion show where every designer was meant
              to capture the essence of a country, my designs were to capture
              the essence of Egypt through the daily used demotic hieroglyphics
              for the men attire.
            </p>
            <p className="w-6/10 text-center">
              As for the woman I captured the glory of the most powerful woman
              in history Kleopatra in a modern business outfit that shows power.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {FASHION_IMAGE_SRCS.map((src, index) => (
              <div
                key={index}
                className={`col-span-12 md:col-span-6 ${
                  isModalOpen
                    ? 'cursor-default'
                    : 'cursor-pointer project-hoverable'
                }`}
                role="button"
                tabIndex={isModalOpen ? -1 : 0}
                onClick={isModalOpen ? undefined : () => handleOpenModal(index)}
                onKeyDown={(e) => {
                  if (!isModalOpen && (e.key === 'Enter' || e.key === ' ')) {
                    handleOpenModal(index);
                  }
                }}
              >
                <AnimatedImage
                  src={src}
                  alt={`Image of fashion piece ${index + 1}`}
                  width={750}
                  height={750}
                  className="w-full h-full"
                  // Disable the in-view animation when the modal is open
                  animateOnView={!isModalOpen}
                />
              </div>
            ))}
          </div>
        </main>
      </div>

      {activeImageIndex !== null && (
        <ImageModal
          images={FASHION_IMAGE_SRCS}
          initialImageIndex={activeImageIndex}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
