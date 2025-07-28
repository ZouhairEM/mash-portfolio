import Image from 'next/image';

export default function Home() {
  return (
    <>
      <header className="flex justify-center p-10">
        <div className="w-1/2 flex justify-between">
          <div className="logo flex items-center">MASH</div>
          <nav className="flex">
            <ul
              className={`container flex h-screen flex-col items-center justify-center gap-8 py-2 text-center sm:flex sm:h-auto sm:flex-row`}
            >
              <li className="active cursor-pointer text-tertiary transition-colors hover:text-white">
                Home
              </li>
              <li className="cursor-pointer text-tertiary transition-colors hover:text-white">
                Info
              </li>
              <li className="cursor-pointer text-tertiary transition-colors hover:text-white sm:mr-auto">
                Projects
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mb-0 flex min-h-screen flex-col items-center justify-between p-6 sm:mb-40 sm:p-0 mx-auto">
        <section className="backdrop">
          <h1>PORTFOLIO</h1>
          <span className="flex justify-center items-center flex-col">
            <span>MOHAMMAD MASHOUKA</span>
            <span>DESIGNER - ARTIST</span>
          </span>
        </section>
      </main>
    </>
  );
}
