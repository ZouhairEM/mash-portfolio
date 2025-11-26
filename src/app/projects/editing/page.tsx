'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import React from 'react';

interface EditingProjectEntry {
  projectHeader: string;
  videoSrc: string;
  description: string;
  thumbnailSrc: string;
}

const EDITING_PROJECT_CONTENT_MAP: Record<string, EditingProjectEntry> = {
  youtube_1: {
    projectHeader: 'Ash Meppers - YouTube',
    videoSrc: 'https://www.youtube.com/watch?v=DrM89nnNqlU',
    description:
      'One of the projects accomplished for a client, demonstrating expertise in editing and social media psychology.',
    thumbnailSrc: '/editing/maxresdefault.jpg',
  },
  youtube_2: {
    projectHeader: 'Editing Nunez',
    videoSrc: 'https://www.youtube.com/watch?v=Ix8wp2Ks6Fk',
    description:
      'Another high-view count project, focusing on maximizing viewer retention and algorithm performance.',
    thumbnailSrc: '/editing/editing-5.jpg',
  },
  ash_meppers_1: {
    projectHeader: 'Ash Meppers',
    videoSrc: '/editing/ash-meppers-1.mp4',
    description:
      'A short-form video edit, part of a campaign that achieved significant organic growth.',
    thumbnailSrc: '/editing/ash-meppers-thumbnail.png',
  },
  editing_5: {
    projectHeader: 'Nunez',
    videoSrc: '/editing/editing-5.mp4',
    description:
      'An edit featuring a football player, showcasing dynamic sports editing.',
    thumbnailSrc: '/editing/editing-nunez.png',
  },
  editing_6: {
    projectHeader: 'Project 2',
    videoSrc: '/editing/editing-6.mov',
    description:
      'A dynamic edit showcasing fast-paced content creation and narrative flow.',
    thumbnailSrc: '/editing/editing-6.png',
  },
};

const EDITING_PROJECT_CONFIG = [
  { project: 'youtube_1', className: 'col-span-12 md:col-span-6' },
  { project: 'youtube_2', className: 'col-span-12 md:col-span-6' },
  { project: 'ash_meppers_1', className: 'col-span-12 md:col-span-4' },
  { project: 'editing_5', className: 'col-span-12 md:col-span-4' },
  { project: 'editing_6', className: 'col-span-12 md:col-span-4' },
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

interface EditingProjectModalProps {
  initialProjectName: keyof typeof EDITING_PROJECT_CONTENT_MAP;
  onClose: () => void;
}

function EditingProjectModal({
  initialProjectName,
  onClose,
}: EditingProjectModalProps) {
  const [currentProjectName, setCurrentProjectName] =
    useState(initialProjectName);

  const selectedProjectInfo = EDITING_PROJECT_CONTENT_MAP[currentProjectName];
  const chosenProjectHeader = selectedProjectInfo.projectHeader;
  const chosenVideoSrc = selectedProjectInfo.videoSrc;
  const chosenDescription = selectedProjectInfo.description;

  const projectNamesArray = Object.keys(EDITING_PROJECT_CONTENT_MAP) as Array<
    keyof typeof EDITING_PROJECT_CONTENT_MAP
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
        className="w-full h-auto max-h-full object-contain rounded-lg shadow-xl"
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
          className="w-full max-w-3xl overlay" // Reduced from max-w-6xl
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
              <div className="flex flex-col gap-8 w-full h-[500px] max-w-2xl mx-auto">
                {' '}
                {/* Reduced from max-w-4xl */}
                {videoContent}
              </div>
            </motion.div>
          </div>

          <div className="flex justify-between flex-col sm:flex-row mx-auto w-full max-w-xl pt-10 gap-4">
            {' '}
            {/* Reduced from max-w-3xl */}
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

export default function SubPages() {
  const [activeProjectName, setActiveProjectName] = useState<
    keyof typeof EDITING_PROJECT_CONTENT_MAP | null
  >(null);

  const handleOpenModal = (
    projectName: keyof typeof EDITING_PROJECT_CONTENT_MAP
  ) => {
    setActiveProjectName(projectName);
  };

  const handleCloseModal = () => {
    setActiveProjectName(null);
  };

  const isModalOpen = activeProjectName !== null;

  const imageProjects = [
    { src: `/editing/ash-meppers-1.png` },
    { src: `/editing/ash-meppers-3.png` },
  ];

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

      <main
        className={`flex flex-col container my-10 p-4 md:p-0 mx-auto ${
          isModalOpen ? 'opacity-50 transition-opacity duration-300' : ''
        }`}
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

        {/* Video Projects Grid */}
        <section className="grid grid-cols-12 gap-4 mb-4">
          {EDITING_PROJECT_CONFIG.map(({ project, className }) => {
            const projectData = EDITING_PROJECT_CONTENT_MAP[project];
            const isWide = className.includes('col-span-12');
            const imageWidth = isWide ? 500 : 375;
            const imageHeight = isWide ? 500 : 375;

            return (
              <div
                key={project}
                className={`${className} flex justify-center cursor-pointer project-hoverable p-2 ${
                  !isWide ? 'w-1/2 md:w-3/4 mx-auto mb-15 md:mb-0' : ''
                }`}
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
                    src={projectData.thumbnailSrc}
                    alt={projectData.projectHeader}
                    width={imageWidth}
                    height={imageHeight}
                    className="mx-auto"
                  />
                  <p className="text-center mb-2">View video</p>
                  {/* Removed the description snippet text here */}
                </div>
              </div>
            );
          })}
        </section>

        {/* Static Image Projects Grid */}
        <section className="grid grid-cols-12 gap-4 mt-12">
          {imageProjects.map((project, index) => (
            <div
              className={`ash-youtube col-span-12 md:col-span-6 group`}
              key={project.src}
            >
              <Image
                src={project.src}
                alt={`Project Image ${index + 1}`}
                width={750}
                height={750}
              />
            </div>
          ))}
        </section>
      </main>

      {activeProjectName && (
        <EditingProjectModal
          initialProjectName={activeProjectName}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
