import React, { useEffect, useState } from "react";
import qs from "qs";
import API from "../utils/api";
import ReactHtmlParser from "react-html-parser";
import { Helmet } from "react-helmet";
import pictureHelper from "../utils/pictureHelper";
import { titleSuffix, topPageSlug } from "../utils/contentFilterHelper";

export default function AboutUs() {
  const [item, setItem] = useState(null);
  const [media, setMedia] = useState(false);
  const locale = (qs.parse(window.location.search) || {}).locale || "en";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.fetchBySlugAsJson("stories", locale, topPageSlug);
        if (!res) {
          return;
        }

        if (res.body.length > 1 && res.body[1]?.media) {
          setMedia(
            res.body[1]?.media.url.replace(
              res.body[1]?.media.url,
              pictureHelper.TransformMedia(res.thumb, "original"),
            ),
          );
        } else if (res.thumb) {
          setMedia(
            res.thumb.url.replace(
              res.thumb.url,
              pictureHelper.TransformMedia(res.thumb, "thumbnail"),
            ),
          );
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
          <title>
            {item.title} | {titleSuffix}
          </title>
          {item.meta.description && (
            <meta name="description" content={item.meta.description} />
          )}
          {item.meta.image && (
            <meta
              property="og:image"
              content={pictureHelper.TransformMedia(
                item.meta.image,
                "thumbnail",
              )}
            />
          )}
        </Helmet>
        <h1 className="text-5xl font-bold pt-8 pb-8">{item.title}</h1>
        <section className="grid grid-cols-12 pt-4 gap-4 pb-10">
          <div className="h-[25rem] md:h-[35rem] col-span-12 lg:col-span-4">
            <img
              src={media || "/Image_Placeholder.png"}
              alt={item.title}
              className="rounded-xl"
            />
          </div>

          {/* summary section  */}
          <div className="col-span-12 lg:col-span-8 max-w-[50rem]">
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
