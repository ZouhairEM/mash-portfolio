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
    5: 'a2',
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
      title: 'BMW 323i 1981',
      body: 'The BMW E21 is the first generation of the BMW 3 Series compact executive cars. Initial models were produced with carburetted four-cylinder petrol engines of 1.6 L, 1.8 L, and 2.0 L. <br/> <br/>Fuel-injection was introduced in late 1975 on the 320i – but in 1977, a carburetted inline 6-cylinder engine replaced both the 320 and 320i models.',
      src: '/graphic-design/bmw/bmw-1.avif',
    },
    {
      title: 'BMW 430i 2024',
      body: 'Unmissable and undeniably sport. The updated design and consistently compelling power of the BMW 4 Gran Coupe make for an unforgettable experience.<br /><br /> Discover charismatic four-door coupe style and exhilarating performance. Start shopping for one of the 2024 BMW 4 Series Gran Coupes today, or contact your local BMW Center to experience one in person.',
      src: '/graphic-design/bmw/bmw-2.avif',
    },
    {
      title: 'BMW I VISION DEE - The First Ever Color Changing Car',
      body: "A machine whose intelligence is emotional rather than artificial. A vehicle with a voice, facial expressions, and true personality. A car that's more than a means of transportation, but an ultimate companion. <br /> <br/>Introducing Dee—the first BMW with a digital soul. Innovative E Ink technology lets you change Dee’s exterior color whenever your mood changes.",
      src: '/graphic-design/bmw/bmw-3.avif',
    },
  ];

  const illustrations = [
    {
      src: '/graphic-design/illustrations/graphic-design-1.avif',
    },
    {
      src: '/graphic-design/illustrations/graphic-design-2.avif',
    },
    {
      src: '/graphic-design/illustrations/graphic-design-3.avif',
    },
    {
      src: '/graphic-design/illustrations/graphic-design-3.avif',
    },
    {
      src: '/graphic-design/illustrations/graphic-design-3.avif',
    },
  ];

  const nike = [
    {
      src: '/graphic-design/nike/graphic-design-1.avif',
    },
  ];

  const hamdulilah = [
    {
      src: '/graphic-design/hamdulilah/graphic-design-1.avif',
    },
  ];

  const a2 = [
    {
      src: '/graphic-design/a2/a2-1.avif',
    },
    {
      src: '/graphic-design/a2/a2-2.avif',
    },
  ];

  const projectMap = {
    bmw: {
      projectHeader: 'BMW designs',
      project: bmw,
    },
    illustrations: {
      projectHeader: 'Art Festival Designs',
      project: illustrations,
    },
    nike: {
      projectHeader: 'Nike - Just Save It',
      project: nike,
    },
    hamdulilah: {
      projectHeader: 'Mohammad Mashouka Hamdulilah',
      project: hamdulilah,
    },
    a2: {
      projectHeader: 'A2 final packaging',
      project: a2,
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
