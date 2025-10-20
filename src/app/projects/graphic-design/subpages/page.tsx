'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

function SubPagesContent() {
  const router = useRouter();
  const currentSearchParams = useSearchParams();
  const pathname = usePathname();

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

  const projectName = currentSearchParams.get('project');

  const bmw = [
    {
      title: 'Vintage',
      body: 'This concept advertisement campaign called "choose your style" for BMW is for the launch of the BMW I Vision. The first poster is showing the trending "vintage" style that never dies to target the audience that likes the vintage style.',
      src: '/graphic-design/bmw/bmw-1.avif',
    },
    {
      title: 'Vintage',
      body: 'The second poster is targeted to modern owners with the new BMW 430i',
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
      title: 'Final poster',
      body: 'This is the poster with all info.',
      src: '/graphic-design/illustrations/graphic-design-3.avif',
    },
    {
      title: 'Tickets at door.',
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
      title: 'Al Hamdulilah',
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
    bmw: {
      projectHeader: 'BMW designs',
      project: bmw,
    },
    illustrations: {
      projectHeader: 'AFC Campaign',
      project: illustrations,
    },
    nike: {
      projectHeader: 'Nike Announcement',
      project: nike,
    },
    hamdulilah: {
      projectHeader: 'Al Hamdulilah',
      project: hamdulilah,
    },
    moodboards: {
      projectHeader: 'Moodboards',
      project: moodboards,
    },
  };

  const isPreviousDisabled = currentProjectNumber === 1;
  const isNextDisabled = currentProjectNumber === totalProjects;

  const selectedProjectInfo = projectMap[projectName] || projectMap['bmw'];
  const chosenProjectContent = selectedProjectInfo.project;
  const chosenProjectHeader = selectedProjectInfo.projectHeader;

  const { textAndImageProjects, imageOnlyProjects } = useMemo(() => {
    const textAndImage = [];
    const imageOnly = [];

    chosenProjectContent?.forEach((project) => {
      if (project.title || project.body) {
        textAndImage.push(project);
      } else {
        imageOnly.push(project);
      }
    });

    return { textAndImageProjects: textAndImage, imageOnlyProjects: imageOnly };
  }, [chosenProjectContent]);

  const areMultipleImageOnly = imageOnlyProjects.length >= 2;
  const isImageOnlyCountOdd = imageOnlyProjects.length % 2 !== 0;

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
      <main className="flex flex-col gap-30 container px-6 my-10">
        <h2 className="text-center mx-10">{chosenProjectHeader}</h2>
        {/* Render Image and Text Projects */}
        {textAndImageProjects?.map((project, index) => {
          const isProjectNumberEven = (index + 1) % 2 === 0;

          const textContent = (
            <div
              className={`col-span-12 md:col-span-4 ${
                isProjectNumberEven ? 'md:order-last' : 'md:order-first'
              }`}
            >
              {project.title && <h2 className="mb-4">{project.title}</h2>}
              {project.body && (
                <p dangerouslySetInnerHTML={{ __html: project.body }} />
              )}
            </div>
          );

          const imageContent = (
            <div
              className={`col-span-12 md:col-span-8 group ${
                isProjectNumberEven
                  ? 'md:order-first'
                  : 'md:order-last flex justify-end'
              }`}
            >
              <Image
                src={project.src}
                alt={`Project Image ${index + 1}`}
                width={750}
                height={750}
              />
            </div>
          );

          return (
            <div
              className="grid grid-cols-12 gap-4"
              key={`text-image-${index}`}
            >
              {textContent}
              {imageContent}
            </div>
          );
        })}

        {/* Render Image Only Projects */}
        {imageOnlyProjects.length > 0 && (
          <div
            className={`grid gap-4 py-8 ${
              areMultipleImageOnly ? 'grid-cols-12' : 'grid-cols-1'
            }`}
          >
            {imageOnlyProjects.map((project, index) => {
              const isLastOddItem =
                areMultipleImageOnly &&
                isImageOnlyCountOdd &&
                index === imageOnlyProjects.length - 1;

              const columnClass = isLastOddItem
                ? 'col-span-12 flex justify-center'
                : areMultipleImageOnly
                  ? 'col-span-12 sm:col-span-6'
                  : 'col-span-12 flex justify-center'; // This covers the single item case (N=1)

              return (
                <div className={columnClass} key={`image-only-${index}`}>
                  <Image
                    src={project.src}
                    alt={`Image Only Project ${index + 1}`}
                    width={750}
                    height={750}
                  />
                </div>
              );
            })}
          </div>
        )}

        <div className="flex justify-between flex-col sm:flex-row">
          <button
            className={`${isPreviousDisabled && 'invisible'} project-btn  min-w-full sm:min-w-40`}
            onClick={() => handleNavigation('previous')}
            disabled={isPreviousDisabled}
          >
            <span>Previous project</span>
          </button>

          <button
            className={`${isNextDisabled && 'invisible'} project-btn min-w-full sm:min-w-40`}
            onClick={() => handleNavigation('next')}
            disabled={isNextDisabled}
          >
            <span>Next project {isNextDisabled}</span>
          </button>
        </div>
      </main>
    </>
  );
}

export default function SubPages() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubPagesContent />
    </Suspense>
  );
}
