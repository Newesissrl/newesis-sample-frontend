import React from "react";
import { aboutUsTitle, contactUsTitle } from "../utils/contentFilterHelper";
export default function Nav() {
  const setLocale = (locale) => {
    window.localStorage.setItem("locale", locale);
    window.location.reload();
  };
  return (
    <nav id="navigation">
      <ul className="mt-4 flex justify-end px-4">
        <li className="pl-4">
          <a href="/about-us">{aboutUsTitle}</a>
        </li>
      </ul>
      <ul className="mt-4 flex justify-end px-4">
        <li className="pl-4">
          <a href="/contact-us">{contactUsTitle}</a>
        </li>
      </ul>
      <ul className="mt-4 flex justify-end px-4">
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
