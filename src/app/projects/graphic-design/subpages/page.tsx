'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

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

function SubPagesContent() {
  const router = useRouter();
  const currentSearchParams = useSearchParams();
  const pathname = usePathname();

  // --- Project Data Setup ---
  const projectNames = {
    1: 'bmw',
    2: 'illustrations',
    3: 'nike',
    4: 'hamdulilah',
    5: 'moodboards',
  };

  const projectHeader = currentSearchParams.get('projectHeader');
  const match = projectHeader ? projectHeader.match(/Project (\d+)/) : null;
  const currentProjectNumber = match ? parseInt(match[1], 10) : 1;
  const totalProjects = 5;
  const projectName = currentSearchParams.get('project');

  // Define content for each main project
  const bmw = [
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
  ];

  const illustrations = [
    {
      title: 'First Teaser',
      body: 'First teaser for the exhibition.',
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
  ];

  const nike = [
    {
      title: 'Concept Announcement',
      body: 'This is a concept announcement for Nike when they announced they are stopped using kangaroo skin in their leather shoes.',
      src: '/graphic-design/nike/graphic-design-1.avif',
    },
  ];

  const hamdulilah = [
    {
      title: 'Al Hamdulilah Typography',
      body: 'This typography piece has won in the Typography Day 2023 titled "Al Hamdulilah" which means "Thank God" in Arabic. This is one of the most powerful sayings in Arabic culture I wanted to highlight its importance. The red chain symbolizes the difficulties of life and how it\'s a never ending chain, the black \'Al Hamdulilah\' is showing its power to thank God even in the harshest of times making the difficulties smaller and appreciate the little things.',
      src: '/graphic-design/hamdulilah/graphic-design-1.avif',
    },
  ];

  const moodboards = [
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
  ];

  const projectMap = {
    bmw: { projectHeader: 'Concept Advertisements', project: bmw },
    illustrations: { projectHeader: 'AFC Campaign', project: illustrations },
    nike: { projectHeader: 'Nike Announcement', project: nike },
    hamdulilah: { projectHeader: 'Typography', project: hamdulilah },
    moodboards: { projectHeader: 'Moodboards', project: moodboards },
  };

  const selectedProjectInfo = projectMap[projectName] || projectMap['bmw'];
  const chosenProjectContent = selectedProjectInfo.project;
  const chosenProjectHeader = selectedProjectInfo.projectHeader;

  // --- Global Project Navigation Logic (Previous/Next Project) ---
  const isPreviousDisabled = currentProjectNumber === 1;
  const isNextDisabled = currentProjectNumber === totalProjects;

  const handleNavigation = (direction) => {
    let newProjectNumber = currentProjectNumber;

    if (direction === 'next') {
      if (currentProjectNumber < totalProjects) {
        newProjectNumber = currentProjectNumber + 1;
      } else {
        return;
      }
    } else if (direction === 'previous') {
      if (currentProjectNumber > 1) {
        newProjectNumber = currentProjectNumber - 1;
      } else {
        return;
      }
    } else {
      return;
    }

    const newProjectHeader = `Project ${newProjectNumber}`;
    const newProjectName = projectNames[newProjectNumber];

    const newSearchParams = new URLSearchParams(currentSearchParams.toString());
    newSearchParams.set('projectHeader', newProjectHeader);
    newSearchParams.set('project', newProjectName);

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  // --- Carousel Logic ---
  const allProjectContent = chosenProjectContent || [];
  const totalSlides = allProjectContent.length;

  // State to track the index of the currently visible slide
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Reset slide index to 0 whenever the overall project selection changes (e.g., from BMW to Nike)
  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [projectName]);

  const currentSlide = allProjectContent[currentSlideIndex];

  const handleSlideChange = (direction) => {
    if (direction === 'next' && currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else if (direction === 'prev' && currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  // --- Tailwind Classes for Styling ---
  const carouselNavButtonClasses =
    'absolute top-1/2 transform -translate-y-1/2 p-3 sm:p-4 bg-gray-800/70 text-white rounded-full transition-all duration-300 z-10 hover:bg-gray-700 active:scale-95 shadow-lg backdrop-blur-sm';
  const disabledNavClasses = 'hidden';

  return (
    <>
      <Link href="/">
        <button className="back flex items-center justify-around gap-2">
          <svg
            data-bbox="9.9 72 180.2 56"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 200 200"
            data-type="shape"
            fill="currentColor"
          >
            <g>
              <path d="M186.3 96H32.2l28-15.5 3.4-1.8-3.7-6.7-3.3 1.8-40.8 22.5-5.9 3.3 5.9 3.4 40.4 23.1 3.3 1.9 3.7-6.6-3.3-1.9-27.8-15.9h158V96h-3.8z"></path>
            </g>
          </svg>
          <span>Back</span>
        </button>
      </Link>

      <main className="flex flex-col gap-20 container mx-auto px-4 my-10">
        <h2 className="text-center mx-10">{chosenProjectHeader}</h2>

        {/* --- CAROUSEL COMPONENT --- */}
        <div className="relative w-full  mx-auto rounded-xl">
          {totalSlides > 0 && currentSlide ? (
            <div
              key={projectName} // Key forces re-render when main project changes
              className="relative p-6 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 min-h-[500px]"
            >
              {/* Carousel Content (Flex container for Text and Image) */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 transition-opacity duration-500 ease-in-out">
                {/* Image Content (Left on mobile, Right on desktop) */}
                <div className="w-full md:w-2/3 flex justify-center items-center order-1">
                  {/* Using a placeholder image if the original paths don't work */}
                  <Image
                    src={
                      currentSlide.src ||
                      `https://placehold.co/750x500/1f2937/ffffff?text=${currentSlide.title || 'Image'}`
                    }
                    alt={currentSlide.title || 'Project Image'}
                    width={750}
                    height={750}
                    // Layout adjustments for responsive image display
                    className="rounded-lg shadow-xl max-w-full h-auto object-contain"
                  />
                </div>

                {/* Text Content (Right on mobile, Left on desktop) */}
                <div className="w-full md:w-1/3 flex flex-col justify-center order-2">
                  {currentSlide.title && (
                    <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">
                      {currentSlide.title}
                    </h2>
                  )}
                  {currentSlide.body && (
                    <p
                      className="text-gray-700 dark:text-gray-300 leading-relaxed"
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
            </div>
          ) : (
            <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <p className="text-lg text-gray-500 dark:text-gray-400">
                No content found for this project.
              </p>
            </div>
          )}

          {/* Carousel Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              {/* Previous Button */}
              <button
                onClick={() => handleSlideChange('prev')}
                disabled={currentSlideIndex === 0}
                className={`left-0 ml-[-20px] ${carouselNavButtonClasses}
                ${currentSlideIndex === 0 ? 'hidden' : ''}
                  ${currentSlideIndex === 0 ? disabledNavClasses : ''}`}
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
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
        {/* --- END CAROUSEL COMPONENT --- */}

        {/* Global Project Navigation (Retained) */}
        <div className="flex justify-between flex-col sm:flex-row mx-auto w-full max-w-3xl pt-10 gap-4">
          <button
            className={`${isNextDisabled && 'invisible'} project-btn min-w-full sm:min-w-50`}
            onClick={() => handleNavigation('previous')}
            disabled={isPreviousDisabled}
          >
            Previous Project
          </button>

          <button
            className={`${isNextDisabled && 'invisible'} project-btn min-w-full sm:min-w-40`}
            onClick={() => handleNavigation('next')}
            disabled={isNextDisabled}
          >
            Next Project
          </button>
        </div>
      </main>
    </>
  );
}

export default function SubPages() {
  return (
    // The Suspense boundary is necessary because this component uses Next.js hooks like useSearchParams
    <Suspense fallback={<div>Loading project content...</div>}>
      <SubPagesContent />
    </Suspense>
  );
}
