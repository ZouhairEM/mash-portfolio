'use client';

export default function GraphicDesign() {
  return (
    <>
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
      <main className="mb-0 flex min-h-screen flex-col items-center justify-between p-6 sm:mb-40 sm:p-0 mx-auto">
        <h2 className="project-header">Graphic Design</h2>
      </main>
    </>
  );
}
