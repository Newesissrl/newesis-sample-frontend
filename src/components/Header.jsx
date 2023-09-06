import React from "react";
import Nav from "./Nav";
export default function Header() {
  return (
    <header className="grid grid-cols-2 lg:grid-cols-12 gap-4 border-b-2 border-sky-400 pb-4">
      <div className="2xl:col-start-3 lg:col-start-2 2xl:col-span-8 lg:col-span-10 col-span-2 grid grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-3 px-2 sm:px-0">
          <div id="banner" className="flex items-center">
            <a href="/">
              <img
                src="/Site_Logo.png"
                alt="Mzinga.io - powered by Newesis Srl"
                className="center"
              />
            </a>
          </div>
        </div>
        <div className="lg:col-span-9 col-span-1 self-center">
          <Nav />
        </div>
      </div>
    </header>
  );
}
