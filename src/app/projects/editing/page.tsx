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
      src: `/editing/ash-meppers-3.png`,
    },
    {
      src: `/editing/ash-meppers-1.mp4`,
      thumbnailSrc: `/editing/ash-meppers-thumbnail.png`,
    },
    {
      src: `/editing/editing-5.mp4`,
      thumbnailSrc: `/editing/editing-nunez.png`,
    },
    {
      src: `/editing/editing-6.mov`,
      thumbnailSrc: `editing-6.png`,
    },
  ];

  const imageProjects = projects.slice(0, 2);
  const videoProject = projects[2];

  const secondVideoProject = {
    src: 'https://www.youtube.com/watch?v=DrM89nnNqlU',
    thumbnailSrc: `/editing/maxresdefault.jpg`,
  };

  const fifthVideo = {
    src: 'https://www.youtube.com/watch?v=Ix8wp2Ks6Fk',
    thumbnailSrc: `/editing/editing-5.jpg`,
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
        className={`flex flex-col container my-10  p-4 md:p-0 ${isModalOpen ? 'hidden' : ''}`}
      >
        <h2 className="project-header text-center">Editing</h2>
        <div className="flex flex-col items-center gap-4 my-10 justify-center">
          <p className="w-full md:w-6/10 text-center">
            Editing is my specialty, what makes me stand outside of other
            editors is that my niche is the psychology of editing and
            understanding of social media algorithms, I know how to get the
            numbers through various psychological ways of the viewers attention
            and with the understanding of algorithms I have accomplished more
            than 1,000,000+ views and 100K+ followers for multiple clients
          </p>
        </div>
        {videoProject && (
          <section className="grid grid-cols-12 gap-4 mb-12 mb:4">
            <div className="col-span-12 md:col-span-6 ">
              <div
                className="group cursor-pointer project-hoverable p-2 relative flex justify-center"
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
                  width={500}
                  height={500}
                  className="mx-auto ash-meppers"
                />
              </div>
              <p className="text-center">View video</p>
            </div>

            <div className="col-span-12 md:col-span-6 ">
              <div
                className="group cursor-pointer project-hoverable p-2 relative flex justify-center"
                role="button"
                tabIndex={0}
                onClick={() => handleOpenModal(fifthVideo.src)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleOpenModal(fifthVideo.src);
                  }
                }}
              >
                <AnimatedImage
                  src={fifthVideo.thumbnailSrc}
                  alt={`YouTube Video Thumbnail`}
                  width={500}
                  height={500}
                  className="mx-auto ash-meppers"
                />
              </div>
              <p className="text-center">View video</p>
            </div>
          </section>
        )}

        <section className="grid grid-cols-12 gap-4 mb-4">
          <div className="col-span-12 md:col-span-4 w-1/2 md:w-3/4 mx-auto mb-15 md:mb-0">
            <div
              className="group cursor-pointer project-hoverable h-full md:h-10/12 my-auto p-2 relative flex justify-center"
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
            </div>
            <p className="text-center">View video</p>
          </div>

          <div className="col-span-12 md:col-span-4 w-1/2 md:w-3/4 mx-auto mb-15 md:mb-0">
            <div
              className="group cursor-pointer project-hoverable h-full md:h-10/12 my-auto p-2 relative flex justify-center"
              role="button"
              tabIndex={0}
              onClick={() => handleOpenModal(projects[1].src)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleOpenModal(videoProject.src);
                }
              }}
            >
              <AnimatedImage
                src="/editing/editing-nunez.png"
                alt={`Video Project Thumbnail`}
                width={375}
                height={375}
                className="mx-auto"
              />
            </div>
            <p className="text-center">View video</p>
          </div>

          <div className="col-span-12 md:col-span-4 w-1/2 md:w-3/4 mx-auto mb-15 md:mb-0">
            <div
              className="group cursor-pointer project-hoverable h-full md:h-10/12 my-auto relative flex justify-center"
              role="button"
              tabIndex={0}
              onClick={() => handleOpenModal(projects[4].src)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleOpenModal(projects[4].src);
                }
              }}
            >
              <AnimatedImage
                src="/editing/editing-6.png"
                alt={`Video Project Thumbnail`}
                width={375}
                height={375}
                className="mx-auto"
              />
            </div>
            <p className="text-center">View video</p>
          </div>
        </section>

        <section className="grid grid-cols-12 gap-4">
          {imageProjects.map((project, index) => {
            const isVideo = project.src.endsWith('.mp4');

            const imageContent = (
              <div
                className={`ash-youtube col-span-12 md:col-span-6 group ${isVideo ? 'cursor-pointer project-hoverable p-2' : ''}`}
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
        </section>
      </main>

      {activeVideoSrc && (
        <FilmModal videoSrc={activeVideoSrc} onClose={handleCloseModal} />
      )}
    </>
  );
}
