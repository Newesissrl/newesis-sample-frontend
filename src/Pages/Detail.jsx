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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const linkifyText = (html) => {
  // Skip if HTML already contains anchor tags
  if (html.includes("<a ")) {
    return html;
  }
  // Only linkify URLs in plain text
  const urlRegex = /(https?:\/\/[^\s<>"]+)/g;
  return html.replace(
    urlRegex,
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">$1</a>',
  );
};

const Detail = () => {
  const [item, setItem] = useState(null);
  const [media, setMedia] = useState(false);
  const [formData, setFormData] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [countries, setCountries] = useState([]);
  const [usStates, setUsStates] = useState([]);
  let { id } = useParams();
  const locale = (qs.parse(window.location.search) || {}).locale || "en";

  const getLocalizedText = (key) => {
    const texts = {
      selectCountry:
        locale === "it" ? "Seleziona Paese..." : "Select Country...",
      selectState: locale === "it" ? "Seleziona Stato..." : "Select State...",
    };
    return texts[key];
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Fetch US states when US is selected
    if (name === "country" && value === "US") {
      fetchUsStates();
    } else if (name === "country") {
      setUsStates([]);
    }
  };

  const handleSubmit = async (evt, form) => {
    evt.preventDefault();
    setDisabled(true);
    const submissionData = [];
    for (const key in formData) {
      submissionData.push({
        field: key,
        value: formData[key],
      });
    }

    await API.post("form-submissions", locale, {
      submissionData,
      form: form.id,
    });
    if (form?.confirmationType === "message") {
      toast.success(
        <div
          dangerouslySetInnerHTML={{
            __html: form?.confirmationMessage
              .map((m) => m.serialized.html)
              .join(""),
          }}
        />,
        {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        },
      );
    } else if (form?.confirmationType === "redirect") {
      window.location.href = form?.redirect.url;
    }
    setDisabled(false);
  };
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

  const fetchUsStates = async () => {
    try {
      const response = await fetch(
        "https://api.census.gov/data/2019/pep/charagegroups?get=NAME&for=state:*",
      );
      const data = await response.json();
      const states = data
        .slice(1)
        .map(([name, code]) => ({
          code,
          name: name.replace(" ", ""),
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
      setUsStates(states);
    } catch (e) {
      console.log("Failed to fetch US states, using fallback");
      setUsStates([
        { code: "AL", name: "Alabama" },
        { code: "AK", name: "Alaska" },
        { code: "AZ", name: "Arizona" },
        { code: "AR", name: "Arkansas" },
        { code: "CA", name: "California" },
        { code: "CO", name: "Colorado" },
        { code: "CT", name: "Connecticut" },
        { code: "DE", name: "Delaware" },
        { code: "FL", name: "Florida" },
        { code: "GA", name: "Georgia" },
        { code: "HI", name: "Hawaii" },
        { code: "ID", name: "Idaho" },
        { code: "IL", name: "Illinois" },
        { code: "IN", name: "Indiana" },
        { code: "IA", name: "Iowa" },
        { code: "KS", name: "Kansas" },
        { code: "KY", name: "Kentucky" },
        { code: "LA", name: "Louisiana" },
        { code: "ME", name: "Maine" },
        { code: "MD", name: "Maryland" },
        { code: "MA", name: "Massachusetts" },
        { code: "MI", name: "Michigan" },
        { code: "MN", name: "Minnesota" },
        { code: "MS", name: "Mississippi" },
        { code: "MO", name: "Missouri" },
        { code: "MT", name: "Montana" },
        { code: "NE", name: "Nebraska" },
        { code: "NV", name: "Nevada" },
        { code: "NH", name: "New Hampshire" },
        { code: "NJ", name: "New Jersey" },
        { code: "NM", name: "New Mexico" },
        { code: "NY", name: "New York" },
        { code: "NC", name: "North Carolina" },
        { code: "ND", name: "North Dakota" },
        { code: "OH", name: "Ohio" },
        { code: "OK", name: "Oklahoma" },
        { code: "OR", name: "Oregon" },
        { code: "PA", name: "Pennsylvania" },
        { code: "RI", name: "Rhode Island" },
        { code: "SC", name: "South Carolina" },
        { code: "SD", name: "South Dakota" },
        { code: "TN", name: "Tennessee" },
        { code: "TX", name: "Texas" },
        { code: "UT", name: "Utah" },
        { code: "VT", name: "Vermont" },
        { code: "VA", name: "Virginia" },
        { code: "WA", name: "Washington" },
        { code: "WV", name: "West Virginia" },
        { code: "WI", name: "Wisconsin" },
        { code: "WY", name: "Wyoming" },
      ]);
    }
  };

  // fetch countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2",
        );
        const data = await response.json();
        const sortedCountries = data
          .map((country) => ({
            code: country.cca2,
            name: country.name.common,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(sortedCountries);
      } catch (e) {
        console.log("Failed to fetch countries:", e);
      }
    };
    fetchCountries();
  }, []);

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
                if (b.blockType === "oembed" && b.oEmbedURL) {
                  // Handle YouTube URLs
                  if (
                    b.oEmbedURL.includes("youtube.com/watch") ||
                    b.oEmbedURL.includes("youtu.be/")
                  ) {
                    const videoId = b.oEmbedURL.match(
                      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
                    );
                    if (videoId) {
                      return (
                        <div key={b.id} className="mb-6">
                          <iframe
                            width="100%"
                            height="315"
                            src={`https://www.youtube.com/embed/${videoId[1]}`}
                            title="YouTube video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded-lg"
                          ></iframe>
                        </div>
                      );
                    }
                  }
                  // Handle X.com (Twitter) URLs
                  if (
                    b.oEmbedURL.includes("x.com/") ||
                    b.oEmbedURL.includes("twitter.com/")
                  ) {
                    return (
                      <div key={b.id} className="mb-6">
                        <blockquote className="twitter-tweet">
                          <a
                            href={b.oEmbedURL}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View on X
                          </a>
                        </blockquote>
                        <script
                          async
                          src="https://platform.twitter.com/widgets.js"
                          charSet="utf-8"
                        ></script>
                      </div>
                    );
                  }
                  // Fallback for other oembed URLs
                  return (
                    <div key={b.id} className="mb-6 p-4 bg-gray-100 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">
                        Embedded content:
                      </p>
                      <a
                        href={b.oEmbedURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {b.oEmbedURL}
                      </a>
                    </div>
                  );
                }
                if (b.blockType === "embeddedForm" && b.form) {
                  return (
                    <div key={b.id} className="mb-6">
                      {b.richText && (
                        <div className="mb-4">
                          {ReactHtmlParser(
                            b.richText
                              .map((r) =>
                                r.children.map((c) => c.text).join(""),
                              )
                              .join(""),
                          )}
                        </div>
                      )}
                      <form
                        className="form"
                        onSubmit={(evt) => handleSubmit(evt, b.form)}
                      >
                        {b.form.fields.map((field) => {
                          if (field.blockType === "message") {
                            return (
                              <div
                                key={field.id}
                                className="py-2 p-4 bg-blue-50 border-l-4 border-blue-400"
                              >
                                <div className="text-blue-800">
                                  {field.message?.map((m, i) => (
                                    <p key={i}>
                                      {m.children?.map((c) => c.text).join("")}
                                    </p>
                                  ))}
                                </div>
                              </div>
                            );
                          }
                          return (
                            <div key={field.id} className="py-2">
                              <label
                                className={
                                  field.blockType === "checkbox"
                                    ? "flex py-2"
                                    : "block py-2"
                                }
                                htmlFor={field.name}
                              >
                                <span
                                  className={
                                    field.blockType === "checkbox"
                                      ? "flex basis-full"
                                      : "block"
                                  }
                                >
                                  {field.label || field.name}
                                </span>
                                {field.blockType === "textarea" ? (
                                  <textarea
                                    id={field.name}
                                    name={field.name}
                                    className="mt-1 block w-full px-3 py-2 border rounded"
                                    required={field.required}
                                    rows={5}
                                    onChange={handleInputChange}
                                  />
                                ) : field.blockType === "select" ? (
                                  <select
                                    id={field.name}
                                    name={field.name}
                                    required={field.required}
                                    className="mt-1 block w-full px-3 py-2 border rounded"
                                    onChange={handleInputChange}
                                  >
                                    <option value="">Select...</option>
                                    {field.options?.map((o) => (
                                      <option key={o.id} value={o.value}>
                                        {o.label || o.value}
                                      </option>
                                    ))}
                                  </select>
                                ) : field.blockType === "country" ? (
                                  <select
                                    id={field.name}
                                    name={field.name}
                                    required={field.required}
                                    className="mt-1 block w-full px-3 py-2 border rounded"
                                    onChange={handleInputChange}
                                  >
                                    <option value="">
                                      {getLocalizedText("selectCountry")}
                                    </option>
                                    {countries.map((country) => (
                                      <option
                                        key={country.code}
                                        value={country.code}
                                      >
                                        {country.name}
                                      </option>
                                    ))}
                                  </select>
                                ) : field.blockType === "state" ? (
                                  formData.country === "US" ? (
                                    <select
                                      id={field.name}
                                      name={field.name}
                                      required={field.required}
                                      className="mt-1 block w-full px-3 py-2 border rounded"
                                      onChange={handleInputChange}
                                    >
                                      <option value="">
                                        {getLocalizedText("selectState")}
                                      </option>
                                      {usStates.map((state) => (
                                        <option
                                          key={state.code}
                                          value={state.code}
                                        >
                                          {state.name}
                                        </option>
                                      ))}
                                    </select>
                                  ) : (
                                    <input
                                      type="text"
                                      id={field.name}
                                      name={field.name}
                                      required={field.required}
                                      className="mt-1 block w-full px-3 py-2 border rounded"
                                      placeholder={getLocalizedText(
                                        "selectState",
                                      )}
                                      onChange={handleInputChange}
                                    />
                                  )
                                ) : (
                                  <input
                                    type={
                                      field.blockType === "number"
                                        ? "number"
                                        : field.blockType
                                    }
                                    id={field.name}
                                    name={field.name}
                                    required={field.required}
                                    className={
                                      field.blockType === "checkbox"
                                        ? "flex px-3 py-2"
                                        : "mt-1 block w-full px-3 py-2 border rounded"
                                    }
                                    onChange={handleInputChange}
                                  />
                                )}
                              </label>
                            </div>
                          );
                        })}
                        <button
                          type="submit"
                          className={`rounded bg-${disabled ? "gray" : "blue"}-600 text-white px-10 mt-4 py-4 w-full hover:bg-${disabled ? "gray" : "blue"}-700`}
                          disabled={disabled}
                        >
                          {b.form.submitButtonLabel}
                        </button>
                      </form>
                    </div>
                  );
                }
                if (b.blockType === "media") {
                  return (
                    <div key={b.id} className="mb-6">
                      {b.media && (
                        <div className="mb-4">
                          <Picture thumb={b.media} />
                        </div>
                      )}
                      {b.video && (
                        <div className="mb-4">
                          <video controls className="w-full rounded-lg">
                            <source src={b.video.url} type={b.video.mimeType} />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      )}
                      {b.mediaGallery && (
                        <div>
                          <h3 className="text-2xl font-bold mb-4">
                            {b.mediaGallery.title}
                          </h3>
                          {b.mediaGallery.summary && (
                            <p className="text-gray-600 mb-4">
                              {b.mediaGallery.summary}
                            </p>
                          )}
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {b.mediaGallery.relatedMedia?.map((media) => (
                              <div
                                key={media.value.id}
                                className="aspect-square"
                              >
                                <Picture thumb={media.value} />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  b.columns &&
                  b.columns.map((c) => {
                    return (
                      <div key={c.id} className="body-cols">
                        {ReactHtmlParser(linkifyText(c.serialized.html), true)}
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
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="light"
        />
      </React.Fragment>
    )
  );
};

export default Detail;
