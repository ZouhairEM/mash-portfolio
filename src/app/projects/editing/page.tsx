'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import React from 'react';

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

function FilmModal({ videoSrc, onClose }) {
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

export default function SubPages() {
  const [activeVideoSrc, setActiveVideoSrc] = useState(null);

  const handleOpenModal = (videoPath) => setActiveVideoSrc(videoPath);
  const handleCloseModal = () => setActiveVideoSrc(null);

  const isModalOpen = !!activeVideoSrc;

  const projects = [
    {
      src: `/editing/ash-meppers-1.png`,
    },
    {
      src: `/editing/ash-meppers-2.png`,
    },
    {
      src: `/editing/ash-meppers-1.mp4`,
      thumbnailSrc: `/editing/ash-meppers-thumbnail.png`,
    },
  ];

  const imageProjects = projects.slice(0, 2);
  const videoProject = projects[2];

  const secondVideoProject = {
    src: 'https://www.youtube.com/watch?v=DrM89nnNqlU',
    thumbnailSrc: `/editing/maxresdefault.jpg`, // Placeholder, replace with actual thumbnail if needed
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

      <main
        className={`flex flex-col gap-10 container my-10 ${isModalOpen ? 'hidden' : ''}`}
      >
        <h2 className="text-center">Editing</h2>
        <p className="my-10 text-center">
          I have been editing videos for YouTuber Ash Meppers including his
          TikTok accounts.
        </p>
        <div className="grid grid-cols-12 gap-4">
          {imageProjects.map((project, index) => {
            const isVideo = project.src.endsWith('.mp4');

            const imageContent = (
              <div
                className={`col-span-12 md:col-span-6 group mx-4 ${isVideo ? 'cursor-pointer project-hoverable p-2' : ''}`}
                key={project.src}
                {...(isVideo && {
                  role: 'button',
                  tabIndex: 0,
                  onClick: () => handleOpenModal(project.src),
                  onKeyDown: (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleOpenModal(project.src);
                    }
                  },
                })}
              >
                <Image
                  src={project.src}
                  alt={`Project Image ${index + 1}`}
                  width={750}
                  height={750}
                />
              </div>
            );

            return imageContent;
          })}
        </div>

        {videoProject && (
          <div className="grid grid-cols-12 gap-4">
            <div
              className="col-span-12 md:col-span-6 group cursor-pointer project-hoverable h-4/5 p-2 relative flex justify-center"
              role="button"
              tabIndex={0}
              onClick={() => handleOpenModal(videoProject.src)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleOpenModal(videoProject.src);
                }
              }}
            >
              <AnimatedImage
                src={videoProject.thumbnailSrc}
                alt={`Video Project Thumbnail`}
                width={375}
                height={375}
                className="mx-auto"
              />
              <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full max-w-[375px] text-center">
                {' '}
                Play video
              </div>
            </div>
            <div
              className="col-span-12 md:col-span-6 group cursor-pointer project-hoverable h-3/5 p-2 relative flex justify-center"
              role="button"
              tabIndex={0}
              onClick={() => handleOpenModal(secondVideoProject.src)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleOpenModal(secondVideoProject.src);
                }
              }}
            >
              <AnimatedImage
                src={secondVideoProject.thumbnailSrc}
                alt={`YouTube Video Thumbnail`}
                width={375}
                height={375}
                className="mx-auto"
              />
              <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full max-w-[375px] text-center">
                {' '}
                Play video
              </div>
            </div>
          </div>
        )}
      </main>

      {activeVideoSrc && (
        <FilmModal videoSrc={activeVideoSrc} onClose={handleCloseModal} />
      )}
    </>
  );
}
