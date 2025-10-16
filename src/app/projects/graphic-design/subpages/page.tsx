'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function SubPages({ searchParams }) {
  const projectGenre = searchParams.projectGenre;

  const projects = [
    {
      title: 'Project Info 1',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, eos rem alias totam assumenda quis deleniti facilis porro atque provident vitae aperiam placeat tenetur consectetur id explicabo odio est expedita?',
      src: `/${projectGenre}/${projectGenre}-1.avif`,
    },
    {
      title: 'Project Info 2',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, eos rem alias totam assumenda quis deleniti facilis porro atque provident vitae aperiam placeat tenetur consectetur id explicabo odio est expedita?',
      src: `/${projectGenre}/${projectGenre}-2.avif`,
    },
    {
      title: 'Project Info 3',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, eos rem alias totam assumenda quis deleniti facilis porro atque provident vitae aperiam placeat tenetur consectetur id explicabo odio est expedita?',
      src: `/${projectGenre}/${projectGenre}-3.avif`,
    },
  ];

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
      <main className="flex flex-col gap-30 container my-10">
        {projects.map((project, index) => {
          const isProjectNumberEven = (index + 1) % 2 === 0;

          const textContent = (
            <div
              className={`col-span-12 md:col-span-4 ${
                isProjectNumberEven ? 'md:order-last' : 'md:order-first'
              }`}
            >
              <h2 className="mb-4">{project.title}</h2>
              <p>{project.body}</p>
            </div>
          );

          const imageContent = (
            <div
              className={`col-span-12 md:col-span-8 group ${
                isProjectNumberEven ? 'md:order-first' : 'md:order-last'
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
            <div className="grid grid-cols-12 gap-4" key={project.title}>
              {textContent}
              {imageContent}
            </div>
          );
        })}
      </main>
    </>
  );
}
