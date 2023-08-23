import React from "react";
import Nav from "./Nav";
export default function Header() {
  return (
    <header className="grid grid-cols-1 lg:grid-cols-12 gap-4 border-b-2 border-sky-400 pb-4">
      <div className="2xl:col-start-3 lg:col-start-2 2xl:col-span-8 lg:col-span-10 grid lg:grid-cols-12">
        <div className="lg:col-span-3 px-2 sm:px-0">
          <div id="banner" className="flex items-start">
            <a href="/">
              <img
                src="/Logo_Newesis_ok_BN_Nero.png"
                alt="newesis"
                className="center"
              />
            </a>
          </div>
        </div>
        <div className="lg:col-span-9 self-center">
          <Nav />
        </div>
      </div>
    </header>
  );
}
