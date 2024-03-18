import React, { useEffect, useState } from "react";
import qs from "qs";
import API from "../utils/api";
import pictureHelper from "../utils/pictureHelper";
import ReactHtmlParser from "react-html-parser";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import dayjs from "dayjs";
import Picture from "../components/Picture";
import { titleSuffix } from "../utils/contentFilterHelper";

import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Detail = () => {
  const [item, setItem] = useState(null);
  const [media, setMedia] = useState(false);
  let { id } = useParams();
  const locale = (qs.parse(window.location.search) || {}).locale || "en";
  // fetch data when page load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.fetchSingleAsJson("stories", id, locale);
        if (res.body.length > 1 && res.body[1]?.media) {
          setMedia(res.body[1]?.media);
        } else if (res.thumb) {
          setMedia(res.thumb);
        }
        setItem(res);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [id, locale]);

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
          {/* img section  */}
          <div className="h-[25rem] md:h-[35rem] col-span-12 lg:col-span-4">
            {media ? (
              <Picture thumb={media} />
            ) : (
              <img
                src="/Image_Placeholder.png"
                alt={item.title}
                className="rounded-xl"
              />
            )}
          </div>

          {/* summary section  */}
          <div className="col-span-12 lg:col-span-8 max-w-[50rem]">
            <div className="border-b pb-2 border-sky-400">
              <p className="text-para_text italic">{item.summary}</p>
            </div>
            <div className="pt-2">
              {item.body.map((b) => {
                return (
                  b.columns &&
                  b.columns.map((c) => {
                    return (
                      <div key={c.id} className="body-cols">
                        {ReactHtmlParser(c.serialized.html, true)}
                      </div>
                    );
                  })
                );
              })}
            </div>
            <div className="text-para_text pt-16 text-right text-sky-400">
              <p>Published {dayjs().to(item.publishDate)}</p>
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  );
};

export default Detail;
