export default function Header() {
  return (
    <header className="flex justify-center p-10">
      <div className="container w-full flex justify-between">
        <div className="logo flex items-center">
          <a href="/">MASH</a>
        </div>
        <nav className="flex">
          <ul
            className={`container flex h-screen flex-col items-center justify-center gap-8 py-2 text-center sm:flex sm:h-auto sm:flex-row`}
          >
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
              className="cursor-pointer text-tertiary transition-colors hover:text-white sm:mr-auto"
            >
              <a href="#projects">Projects</a>
            </li>
            <li
              role="button"
              tabIndex={0}
              className="cursor-pointer text-tertiary transition-colors hover:text-white"
            >
              <a href="#info">Info</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
