import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex justify-center p-4 sm:p-10">
      <div className="container w-full flex justify-between items-center">
        <div className="logo flex items-center text-xl font-bold">
          <Link href="/">MASH</Link>
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
