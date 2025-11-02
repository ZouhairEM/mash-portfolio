'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const PROJECT_CONTENT_MAP = {
  bmw: {
    projectHeader: 'Concept Advertisements',
    content: [
      {
        title: 'Vintage',
        body: 'This concept advertisement campaign called "choose your style" for BMW is for the launch of the BMW I Vision. The first poster is showing the trending "vintage" style that never dies to target the audience that likes the vintage style.',
        src: '/graphic-design/bmw/bmw-1.avif',
      },
      {
        title: 'Modern',
        body: 'The second poster is targeted to modern owners with the new BMW 430i.',
        src: '/graphic-design/bmw/bmw-2.avif',
      },
      {
        title: 'I Vision Dee',
        body: 'The third poster is the launch of the new minimalistic electric vision dee, titled YOUR STYLE because you can change the cars entire color automatically with a remote.',
        src: '/graphic-design/bmw/bmw-3.avif',
      },
    ],
  },
  illustrations: {
    projectHeader: 'AFC Campaign',
    content: [
      {
        title: 'First Teaser',
        body: 'This is a campaign made for an art charity exhibition called “Art for a cause” and this the first poster that would be put out around town as a teaser.',
        src: '/graphic-design/illustrations/graphic-design-1.avif',
      },
      {
        title: 'Second Teaser',
        body: 'Second teaser around the city where it starts to reveal parts of the exhibition.',
        src: '/graphic-design/illustrations/graphic-design-2.avif',
      },
      {
        title: 'Invitation',
        body: 'Invitations that have canvas in the middle for people to draw on and share images of.',
        src: '/graphic-design/illustrations/graphic-design-4.avif',
      },
      {
        title: 'Final Poster',
        body: 'This is the poster with all info.',
        src: '/graphic-design/illustrations/graphic-design-3.avif',
      },
      {
        title: 'Tickets at Door',
        body: 'At door tickets for people to buy.',
        src: '/graphic-design/illustrations/graphic-design-5.avif',
      },
    ],
  },
  nike: {
    projectHeader: 'Nike Announcement',
    content: [
      {
        title: 'Concept Announcement',
        body: 'This is a concept announcement for Nike when they announced they are stopped using kangaroo skin in their leather shoes.',
        src: '/graphic-design/nike/graphic-design-1.avif',
      },
    ],
  },
  hamdulilah: {
    projectHeader: 'Typography',
    content: [
      {
        title: 'Al Hamdulilah Typography',
        body: 'This typography piece has won in the Typography Day 2023 titled "Al Hamdulilah" which means "Thank God" in Arabic. This is one of the most powerful sayings in Arabic culture I wanted to highlight its importance. The red chain symbolizes the difficulties of life and how it\'s a never ending chain, the black \'Al Hamdulilah\' is showing its power to thank God even in the harshest of times making the difficulties smaller and appreciate the little things.',
        src: '/graphic-design/hamdulilah/graphic-design-1.avif',
      },
    ],
  },
  moodboards: {
    projectHeader: 'Packaging and Product',
    content: [
      {
        title: 'Disposable Matte',
        body: 'This is an instant cup of matte drink where you pour hot water in it and drink straight out of the cup, it is made of bambo so it is biodegradable.',
        src: '/graphic-design/moodboards/moodboards-1.avif',
      },
      {
        title: 'Cereal Box Packaging',
        body: 'This is a concept package for a cereal which makes it easier to pour cereal as well as the box itself is reusable.',
        src: '/graphic-design/moodboards/moodboards-2.avif',
      },
    ],
  },
};

const PROJECT_GRID_CONFIG = [
  { project: 'bmw', className: 'col-span-2 row-span-1' },
  { project: 'nike', className: 'col-span-2 row-span-2' },
  { project: 'hamdulilah', className: 'col-span-2 row-span-3' },
  { project: 'illustrations', className: 'col-span-2 row-span-4' },
  { project: 'moodboards', className: 'col-span-2 row-span-1' },
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
        className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-100"
      />
    </motion.div>
  );
}

interface ProjectModalProps {
  initialProjectName: keyof typeof PROJECT_CONTENT_MAP;
  onClose: () => void;
}

function ProjectModal({ initialProjectName, onClose }: ProjectModalProps) {
  const [currentProjectName, setCurrentProjectName] =
    useState(initialProjectName);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [currentProjectName]);

  const selectedProjectInfo = PROJECT_CONTENT_MAP[currentProjectName];
  const chosenProjectContent = selectedProjectInfo.content;
  const chosenProjectHeader = selectedProjectInfo.projectHeader;
  const totalSlides = chosenProjectContent.length;
  const currentSlide = chosenProjectContent[currentSlideIndex];

  const projectNamesArray = Object.keys(PROJECT_CONTENT_MAP) as Array<
    keyof typeof PROJECT_CONTENT_MAP
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

  const handleSlideChange = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else if (direction === 'prev' && currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const carouselNavButtonClasses =
    'absolute top-1/2 transform -translate-y-1/2 p-3 sm:p-4 bg-gray-800/70 text-white rounded-full transition-all duration-300 z-10 hover:bg-gray-700 active:scale-95 shadow-lg backdrop-blur-sm';
  const disabledNavClasses = 'opacity-0 pointer-events-none';

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
          className="w-full max-w-5xl overlay"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-center text-white mb-8">{chosenProjectHeader}</h2>

          <div className="relative w-full mx-auto rounded-xl">
            {totalSlides > 0 && currentSlide ? (
              <motion.div
                key={currentProjectName + currentSlideIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="relative p-6 bg-white flex flex-col justify-center rounded-xl shadow-2xl border border-gray-200 min-h-[50vh]"
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="w-full md:w-2/3 flex justify-center items-center order-1">
                    <Image
                      src={
                        currentSlide.src ||
                        `https://placehold.co/750x750/1f2937/ffffff?text=${currentSlide.title || 'Image'}`
                      }
                      alt={currentSlide.title || 'Project Image'}
                      width={750}
                      height={750}
                      className="rounded-lg shadow-xl max-w-full h-auto object-contain"
                    />
                  </div>

                  <div className="w-full md:w-1/3 flex flex-col justify-center order-2">
                    {currentSlide.title && (
                      <h3 className="text-3xl font-bold mb-4 text-gray-900 border-b pb-2 border-gray-200">
                        {currentSlide.title}
                      </h3>
                    )}
                    {currentSlide.body && (
                      <p
                        className="text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: currentSlide.body }}
                      />
                    )}
                    {!currentSlide.title && !currentSlide.body && (
                      <p className="text-gray-400 italic">
                        This item is purely a visual showcase.
                      </p>
                    )}
                  </div>
                </div>
                <p className="absolute bottom-2 right-4 text-gray-500 text-sm">
                  {currentSlideIndex + 1} / {totalSlides}
                </p>
              </motion.div>
            ) : (
              <div className="text-center p-12 bg-white rounded-xl shadow-lg">
                <p className="text-lg text-gray-500">
                  No content found for this project.
                </p>
              </div>
            )}

            {totalSlides > 1 && (
              <>
                <button
                  onClick={() => handleSlideChange('prev')}
                  disabled={currentSlideIndex === 0}
                  className={`left-0 ml-[-20px] ${carouselNavButtonClasses} ${
                    currentSlideIndex === 0 ? disabledNavClasses : ''
                  }`}
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={() => handleSlideChange('next')}
                  disabled={currentSlideIndex === totalSlides - 1}
                  className={`right-0 mr-[-20px] ${carouselNavButtonClasses} ${
                    currentSlideIndex === totalSlides - 1
                      ? disabledNavClasses
                      : ''
                  }`}
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          <div className="flex justify-between flex-col sm:flex-row mx-auto w-full max-w-3xl pt-10 gap-4">
            <button
              className={`project-btn min-w-full sm:min-w-50 ${isPreviousDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => handleProjectNavigation('previous')}
              disabled={isPreviousDisabled}
            >
              Previous Project
            </button>

            <button
              className={`project-btn min-w-full sm:min-w-40 ${isNextDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
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

export default function GraphicDesign() {
  const [activeProjectName, setActiveProjectName] = useState<
    keyof typeof PROJECT_CONTENT_MAP | null
  >(null);

  const handleOpenModal = (projectName: keyof typeof PROJECT_CONTENT_MAP) => {
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
        <h2 className="project-header text-center">Graphic Design</h2>
        <main className="container mb-0 flex min-h-screen flex-col items-center justify-between p-6 sm:mb-40 sm:p-0 mx-auto">
          <div className="grid grid-cols-4 md:grid-cols-6 gap-8 md:grid-rows-3 p-6 project-thumbnail">
            {PROJECT_GRID_CONFIG.map(({ project, className }, index) => {
              const projectData = PROJECT_CONTENT_MAP[project];
              const firstImageSrc = projectData.content[0]?.src || '';

              return (
                <div
                  key={project}
                  className={`${className} cursor-pointer project-hoverable mb-4`}
                  role="button"
                  tabIndex={isModalOpen ? -1 : 0}
                  onClick={() => handleOpenModal(project)}
                  onKeyDown={(e) => {
                    if (!isModalOpen && (e.key === 'Enter' || e.key === ' ')) {
                      handleOpenModal(project);
                    }
                  }}
                >
                  <AnimatedImage
                    src={firstImageSrc}
                    alt={`Graphic Design Example ${index + 1}`}
                    width={750}
                    height={750}
                    className="w-full h-full"
                  />
                  <p className="text-center">View project</p>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {activeProjectName && (
        <ProjectModal
          initialProjectName={activeProjectName}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
