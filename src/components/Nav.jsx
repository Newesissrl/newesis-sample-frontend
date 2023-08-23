import React from "react";
export default function Nav() {
  const setLocale = (locale) => {
    window.localStorage.setItem("locale", locale);
    window.location.reload();
  };
  return (
    <nav id="navigation">
      <ul className="mt-4 flex lg:justify-end px-4 sm:px-0">
        <li className="pr-8">
          <a href="/about-us">About Us</a>
        </li>
        <li>
          <a href="/contact-us">Contact Us</a>
        </li>
      </ul>
      <ul className="mt-4 flex lg:justify-end px-4 sm:px-0">
        <li className="border-r pr-4">
          <a
            href="?locale=it"
            onClick={() => {
              setLocale("it");
            }}
          >
            it
          </a>
        </li>
        <li className="pl-4">
          <a
            href="?locale=en"
            onClick={() => {
              setLocale("en");
            }}
          >
            en
          </a>
        </li>
      </ul>
    </nav>
  );
}
