import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
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
              role="button"
              tabIndex={0}
              className="cursor-pointer text-tertiary transition-colors hover:text-white"
            >
              <Link href="/#projects">Projects</Link>
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
