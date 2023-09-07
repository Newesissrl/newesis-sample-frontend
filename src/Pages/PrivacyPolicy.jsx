import React, { useEffect, useState } from "react";
import qs from "qs";
import API from "../utils/api";
import ReactHtmlParser from "react-html-parser";
import { Helmet } from "react-helmet";
import { titleSuffix } from "../utils/contentFilterHelper";

export default function PrivacyPolicy() {
  const [item, setItem] = useState(null);
  const locale = (qs.parse(window.location.search) || {}).locale || "en";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.fetchBySlugAsJson(
          "stories",
          locale,
          "newesis-srl-privacy-policy",
        );
        if (!res) {
          return;
        }
        setItem(res);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [locale]);
  return (
    item && (
      <React.Fragment>
        <Helmet>
          <title>Privacy Policy | {titleSuffix}</title>
        </Helmet>
        <h1 className="text-5xl font-bold pt-8 pb-8">Privacy policy</h1>
        <section className="pt-4 pb-10">
          {/* summary section  */}
          <div>
            {item.body.map((b) => {
              let render = [];

              if (b.columns) {
                render = [].concat(
                  b.columns.map((c) => {
                    return (
                      <div key={c.id} className="body-cols">
                        {ReactHtmlParser(c.serialized.html, true)}
                      </div>
                    );
                  }),
                );
              }
              if (b.video) {
                render.push(
                  <div key={b.id} className="body-medias">
                    <div className="text-xl">
                      {ReactHtmlParser(b.video.excerpt, true)}
                    </div>
                    <video controls>
                      <source src={b.video.url} type={b.video.mimeType} />
                    </video>
                  </div>,
                );
              }
              return render;
            })}
          </div>
        </section>
      </React.Fragment>
    )
  );
}
