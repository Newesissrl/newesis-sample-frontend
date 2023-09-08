import React from "react";
export default function Footer() {
  return (
    <footer className="grid lg:grid-cols-12 gap-4 border-t-2 border-sky-400 mt-8 lg:mt-20 pt-2 pb-8 bg-white text-black">
      <div className="lg:col-start-3 lg:col-span-8 grid lg:grid-cols-12">
        <h3 className="text-xl px-4 lg:px-0 col-span-12 font-bold pt-4 pb-4">
          Newesis Srl
        </h3>
        <div className="col-span-12 my-4 lg:my-0 px-4 lg:px-0 lg:col-span-4">
          Via Principi d'Acaja, 44
          <br />
          10138 Torino Italy <br />
          +39 335 13 40 00
        </div>
        <div className="col-span-12 my-4 lg:my-0 px-4 lg:px-0 lg:col-span-4 lg:text-center">
          PIVA 12028300015
          <br />
          capitale sociale 10.000 euro I.V.
          <br />
          pec:{" "}
          <a
            className="underline underline-offset-2"
            href="mailto:newesis@messaggipec.it"
          >
            newesis@messaggipec.it
          </a>
        </div>
        <div className="col-span-12 my-4 lg:my-0 px-4 lg:px-0 lg:col-span-4 lg:text-right">
          &copy; {new Date().getFullYear()} Newesis Srl
          <br />
          <a className="underline underline-offset-2" href="/privacy-policy">
            Privacy policy
          </a>
        </div>
      </div>
    </footer>
  );
}
