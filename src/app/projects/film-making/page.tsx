'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface FilmProjectEntry {
  projectHeader: string;
  videoSrc: string;
  description: string;
  thumbnailSrc: string;
}

const FILM_PROJECT_CONTENT_MAP: Record<string, FilmProjectEntry> = {
  crown_prince: {
    projectHeader: 'Crown Prince Foundation',
    videoSrc: '/filmmaking/film-making-1.mp4',
    description:
      'An advertisement for the Crown Prince Foundation where I was assistant producer.',
    thumbnailSrc: '/filmmaking/film-making-1.avif',
  },
  ingot_brokers: {
    projectHeader: 'Ingot Brokers',
    videoSrc: '/filmmaking/film-making-2.mp4',
    description:
      'An advertisement for Ingot brokers with Raphael Varane where I was assistant producer.',
    thumbnailSrc: '/filmmaking/film-making-2.avif',
  },
  dana_salah: {
    projectHeader: 'Dana Salah Music Video',
    videoSrc: 'https://www.youtube.com/watch?v=iftQMSMMb0w',
    description: 'Art department for Dana Salah music video',
    thumbnailSrc: '/filmmaking/film-making-3.avif',
  },
  mazaya: {
    projectHeader: 'Mazaya',
    videoSrc: '/filmmaking/film-making-4.mp4',
    description: 'Assistant Producer and extra for Mazaya',
    thumbnailSrc: '/filmmaking/film-making-4.avif',
  },
  world_cup: {
    projectHeader: 'World Cup Campaign',
    videoSrc: '/filmmaking/film-making-5.mp4',
    description: 'World Cup campaign.',
    thumbnailSrc: '/filmmaking/film-making-5.avif',
  },
};

const FILM_PROJECT_CONFIG = [
  { project: 'crown_prince', className: 'col-span-12 md:col-span-6' },
  { project: 'ingot_brokers', className: 'col-span-12 md:col-span-6' },
  { project: 'dana_salah', className: 'col-span-12' },
  { project: 'mazaya', className: 'col-span-12 md:col-span-6' },
  { project: 'world_cup', className: 'col-span-12 md:col-span-6' },
] as const;

const ChevronLeft = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRight = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

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
        className="w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-100"
      />
    </motion.div>
  );
}

interface FilmProjectModalProps {
  initialProjectName: keyof typeof FILM_PROJECT_CONTENT_MAP;
  onClose: () => void;
}

function FilmProjectModal({
  initialProjectName,
  onClose,
}: FilmProjectModalProps) {
  const [currentProjectName, setCurrentProjectName] =
    useState(initialProjectName);

  const selectedProjectInfo = FILM_PROJECT_CONTENT_MAP[currentProjectName];
  const chosenProjectHeader = selectedProjectInfo.projectHeader;
  const chosenVideoSrc = selectedProjectInfo.videoSrc;
  const chosenDescription = selectedProjectInfo.description;

  const projectNamesArray = Object.keys(FILM_PROJECT_CONTENT_MAP) as Array<
    keyof typeof FILM_PROJECT_CONTENT_MAP
  >;
  const currentProjectIndex = projectNamesArray.indexOf(currentProjectName);
  const totalProjects = projectNamesArray.length;

  const handleProjectNavigation = (direction: 'next' | 'previous') => {
    let newIndex = currentProjectIndex;

    if (direction === 'next') {
      newIndex = (currentProjectIndex + 1) % totalProjects;
    } else if (direction === 'previous') {
      newIndex = (currentProjectIndex - 1 + totalProjects) % totalProjects;
    }

    const newProjectName = projectNamesArray[newIndex];

    setCurrentProjectName(newProjectName);
  };

  const isPreviousDisabled = currentProjectIndex === 0;
  const isNextDisabled = currentProjectIndex === totalProjects - 1;

  const isYouTube =
    chosenVideoSrc.includes('youtube.com') ||
    chosenVideoSrc.includes('youtu.be');
  let videoContent;

  if (isYouTube) {
    const url = new URL(chosenVideoSrc);
    const videoId = url.searchParams.get('v');
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&loop=1&playlist=${videoId}`;

    videoContent = (
      <div className="relative w-full h-0 pb-[56.25%] rounded-lg shadow-xl">
        <iframe
          key={currentProjectName}
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full rounded-lg"
        ></iframe>
      </div>
    );
  } else {
    videoContent = (
      <video
        key={currentProjectName}
        src={chosenVideoSrc}
        controls
        autoPlay
        loop
        className="w-full h-[500px] object-contain rounded-lg shadow-xl"
      >
        Your browser does not support the video tag.
      </video>
    );
  }

  const modalContentClasses = `relative p-6 bg-white flex flex-col rounded-xl shadow-2xl border border-gray-200 min-h-[50vh]`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-start p-4 pt-20 pb-4 overflow-y-auto"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="back flex items-center justify-around gap-2 absolute top-4 left-4 z-50 text-white p-2 rounded w-50"
          aria-label="Close project modal and go back"
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
          <span>Back to Projects</span>
        </button>

        <div
          className="w-full max-w-6xl overlay"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-center text-white mb-8">{chosenProjectHeader}</h2>

          <div className="relative w-full mx-auto rounded-xl">
            <motion.div
              key={currentProjectName}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={modalContentClasses}
            >
              <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
                {videoContent}

                <div className="w-full flex flex-col justify-center">
                  <h3 className="text-3xl font-bold mb-4 text-gray-900 border-b pb-2 border-gray-200">
                    {chosenProjectHeader}
                  </h3>
                  <p
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: chosenDescription }}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-between flex-col sm:flex-row mx-auto w-full max-w-3xl pt-10 gap-4">
            <button
              className={`project-btn min-w-full sm:min-w-50 ${
                isPreviousDisabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={() => handleProjectNavigation('previous')}
              disabled={isPreviousDisabled}
            >
              Previous Project
            </button>

            <button
              className={`project-btn min-w-full sm:min-w-40 ${
                isNextDisabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={() => handleProjectNavigation('next')}
              disabled={isNextDisabled}
            >
              Next Project
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function FilmMaking() {
  const [activeProjectName, setActiveProjectName] = useState<
    keyof typeof FILM_PROJECT_CONTENT_MAP | null
  >(null);

  const handleOpenModal = (
    projectName: keyof typeof FILM_PROJECT_CONTENT_MAP
  ) => {
    setActiveProjectName(projectName);
  };

  const handleCloseModal = () => {
    setActiveProjectName(null);
  };

  const isModalOpen = activeProjectName !== null;

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
        <h2 className="project-header text-center">Filmmaking</h2>
        <main className="container mb-0 flex min-h-screen flex-col items-center justify-between p-6 sm:mb-40 sm:p-0 mx-auto">
          <div className="grid grid-cols-12 my-10 gap-8">
            {FILM_PROJECT_CONFIG.map(({ project, className }) => {
              const projectData = FILM_PROJECT_CONTENT_MAP[project];
              const thumbnailSrc = projectData.thumbnailSrc;

              return (
                <div
                  key={project}
                  className={`${className} flex justify-center cursor-pointer project-hoverable p-2`}
                  role="button"
                  tabIndex={isModalOpen ? -1 : 0}
                  onClick={() => handleOpenModal(project)}
                  onKeyDown={(e) => {
                    if (!isModalOpen && (e.key === 'Enter' || e.key === ' ')) {
                      handleOpenModal(project);
                    }
                  }}
                >
                  <div className="flex flex-col gap-4">
                    <AnimatedImage
                      src={thumbnailSrc}
                      alt={projectData.projectHeader}
                      width={500}
                      height={500}
                    />
                    <p className="text-center mb-2">View now</p>
                    <p className="text-center">{projectData.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {activeProjectName && (
        <FilmProjectModal
          initialProjectName={activeProjectName}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
