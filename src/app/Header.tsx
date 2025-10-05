export default function Header() {
  return (
    <header className="flex justify-center p-4 sm:p-10">
      <div className="container w-full flex justify-between items-center">
        <div className="logo flex items-center text-xl font-bold">
          <a href="/">MASH</a>
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
              <a href="/#projects">Projects</a>
            </li>
            <li
              role="button"
              tabIndex={0}
              className="cursor-pointer text-tertiary transition-colors hover:text-white"
            >
              <a href="/#info">Info</a>
            </li>
          </ul>
        </nav>

        <div className="sm:hidden text-2xl">{/* ☰ */}</div>
      </div>
    </header>
  );
}
