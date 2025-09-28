import qs from "qs";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../utils/api";

import {
  formPageSlug,
  formPageTitle,
  titleSuffix,
} from "../utils/contentFilterHelper";

const ToastMsg = ({ item }) => {
  return (
    <React.Fragment>
      <div
        dangerouslySetInnerHTML={{
          __html: item?.confirmationMessage
            .map((m) => m.serialized.html)
            .join(""),
        }}
      ></div>
    </React.Fragment>
  );
};
export default function FormPage() {
  const [item, setItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [countries, setCountries] = useState([]);
  const [usStates, setUsStates] = useState([]);
  let { slug } = useParams();
  const [disabled, setDisabled] = useState(false);
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
  const handleSubmit = async (evt) => {
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
      form: item.id,
    });
    if (item?.confirmationType === "message") {
      toast.success(<ToastMsg item={item} />, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    } else if (item?.confirmationType === "redirect") {
      window.location.href = item?.redirect.url;
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.fetchBySlugAsJson(
          "forms",
          locale,
          slug || formPageSlug,
        );

        setItem(res);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [slug, locale]);

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
            {item.title || formPageTitle} | {titleSuffix}
          </title>
        </Helmet>
        <h1 className="text-5xl font-bold pt-8 pb-8">
          {item.title || formPageTitle}
        </h1>
        <form className="form" onSubmit={handleSubmit}>
          {item.fields.map((field) => {
            if (field.blockType === "message") {
              return (
                <div
                  key={field.id}
                  className="py-2 p-4 bg-blue-50 border-l-4 border-blue-400"
                >
                  <div className="text-blue-800">
                    {field.message?.map((m, i) => (
                      <p key={i}>{m.children?.map((c) => c.text).join("")}</p>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <React.Fragment key={field.id}>
                <label
                  className={
                    field.blockType === "checkbox" ? "flex py-2" : "block py-2"
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
                      className="mt-1 block w-full px-3 py-2"
                      {...(field.required ? { required: "required" } : {})}
                      rows={5}
                      onChange={handleInputChange}
                    ></textarea>
                  ) : field.blockType === "select" ? (
                    <select
                      id={field.name}
                      name={field.name}
                      {...(field.required ? { required: "required" } : {})}
                      className="mt-1 block w-full px-3 py-2"
                      onChange={handleInputChange}
                    >
                      <option value="">Select...</option>
                      {field.options.map((o) => {
                        return (
                          <option key={o.id} value={o.value}>
                            {o.label || o.value}
                          </option>
                        );
                      })}
                    </select>
                  ) : field.blockType === "country" ? (
                    <select
                      id={field.name}
                      name={field.name}
                      {...(field.required ? { required: "required" } : {})}
                      className="mt-1 block w-full px-3 py-2"
                      onChange={handleInputChange}
                    >
                      <option value="">
                        {getLocalizedText("selectCountry")}
                      </option>
                      {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  ) : field.blockType === "state" ? (
                    formData.country === "US" ? (
                      <select
                        id={field.name}
                        name={field.name}
                        {...(field.required ? { required: "required" } : {})}
                        className="mt-1 block w-full px-3 py-2"
                        onChange={handleInputChange}
                      >
                        <option value="">
                          {getLocalizedText("selectState")}
                        </option>
                        {usStates.map((state) => (
                          <option key={state.code} value={state.code}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        id={field.name}
                        name={field.name}
                        {...(field.required ? { required: "required" } : {})}
                        className="mt-1 block w-full px-3 py-2"
                        placeholder={getLocalizedText("selectState")}
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
                      {...(field.required ? { required: "required" } : {})}
                      className={
                        field.blockType === "checkbox"
                          ? "flex px-3 py-2"
                          : "mt-1 block w-full px-3 py-2"
                      }
                      onChange={handleInputChange}
                    />
                  )}
                </label>
              </React.Fragment>
            );
          })}
          <button
            type="submit"
            className={`rounded bg-${
              disabled ? "gray" : "blue"
            }-600 text-white px-10 mt-4 py-4 w-full hover:bg-${
              disabled ? "gray" : "blue"
            }-700`}
            disabled={disabled}
          >
            {item.submitButtonLabel}
          </button>
        </form>
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
}
