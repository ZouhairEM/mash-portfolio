'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  return (
    <header className="flex justify-center p-4 sm:p-10">
      <div className="container w-full flex justify-between items-center">
        <div className="flex items-center text-xl font-bold">
          <Link href="/">
            <Image
              src={'/mash-logo.png'}
              alt="Mash's logo"
              width={130}
              height={130}
            />
          </Link>
        </div>

        <nav className="hidden sm:flex">
          <ul className={`flex items-center gap-6 md:gap-8`}>
            <li
              role="button"
              tabIndex={0}
              className="active cursor-pointer text-tertiary transition-colors hover:text-white"
            >
              Home
            </li>

            <li
              onMouseEnter={() => setIsProjectsOpen(true)}
              onMouseLeave={() => setIsProjectsOpen(false)}
              className="relative"
            >
              <div
                role="button"
                tabIndex={0}
                className="cursor-pointer text-tertiary transition-colors hover:text-white flex items-center py-2"
              >
                Projects
              </div>

              {isProjectsOpen && (
                <div className="absolute left-0 top-full w-48 bg-gray-800 rounded-md shadow-lg z-10 p-2">
                  <Link
                    href="/projects/graphic-design"
                    className="block px-4 py-2 text-sm text-tertiary hover:bg-gray-700 hover:text-white rounded-md"
                    onClick={() => setIsProjectsOpen(false)}
                  >
                    Graphic Design
                  </Link>
                  <Link
                    href="/projects/editing"
                    className="block px-4 py-2 text-sm text-tertiary hover:bg-gray-700 hover:text-white rounded-md"
                    onClick={() => setIsProjectsOpen(false)}
                  >
                    Editing
                  </Link>
                  <Link
                    href="/projects/fashion"
                    className="block px-4 py-2 text-sm text-tertiary hover:bg-gray-700 hover:text-white rounded-md"
                    onClick={() => setIsProjectsOpen(false)}
                  >
                    Fashion
                  </Link>
                  <Link
                    href="/projects/film-making"
                    className="block px-4 py-2 text-sm text-tertiary hover:bg-gray-700 hover:text-white rounded-md"
                    onClick={() => setIsProjectsOpen(false)}
                  >
                    Film Making
                  </Link>
                </div>
              )}
            </li>

            <li
              role="button"
              tabIndex={0}
              className="cursor-pointer text-tertiary transition-colors hover:text-white"
            >
              <Link href="/#info">Info</Link>
            </li>
          </ul>
        </nav>

        <div className="sm:hidden text-2xl">{/* ☰ */}</div>
      </div>
    </header>
  );
}
