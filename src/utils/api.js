import qs from "qs";

const apiBaseUrl =
  process.env.REACT_APP_API_BASE_URL ||
  (window._env_ || {}).REACT_APP_API_BASE_URL ||
  "https://api-newesiscorporate.mzinga.io";
const getLocale = (locale = "en") => {
  return window.localStorage.getItem("locale") || locale;
};
const API = {
  fetchSingleAsJson: async function (endpoint, locale = "en", id) {
    const req = await fetch(
      `${apiBaseUrl}/api/${endpoint}/${id}?locale=${getLocale(locale)}`,
    );
    return await req.json();
  },
  fetchAsJson: async function (endpoint, locale = "en", query, otherQs) {
    const stringifiedQuery = qs.stringify(
      {
        where: query,
        ...(otherQs || {}),
      },
      { addQueryPrefix: true },
    );
    const req = await fetch(
      `${apiBaseUrl}/api/${endpoint}${stringifiedQuery}&sort=-updatedAt&locale=${getLocale(
        locale,
      )}`,
    );
    return await req.json();
  },
  fetchBySlugAsJson: async function (endpoint, locale = "en", slug) {
    const req = await fetch(
      `${apiBaseUrl}/api/${endpoint}/byslug/${slug}?locale=${getLocale(
        locale,
      )}`,
    );
    return await req.json();
  },
  post: async function (endpoint, locale = "en", data) {
    const req = await fetch(
      `${apiBaseUrl}/api/${endpoint}?locale=${getLocale(locale)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    return await req.json();
  },
  getUploadsUrl: function (thumb, size) {
    if (size && thumb.sizes[size]) {
      return `${apiBaseUrl}/uploads/media/${thumb.sizes[size].filename}`;
    }
    return `${apiBaseUrl}/uploads/media/${thumb.filename}`;
  },
};
export default API;
