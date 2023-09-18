import React, { useEffect, useState } from "react";
import qs from "qs";
import API from "../utils/api";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  titleSuffix,
  contactUsTitle,
  contactUsSlug,
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
export default function ContactUs() {
  const [item, setItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [disabled, setDisabled] = useState(false);
  const locale = (qs.parse(window.location.search) || {}).locale || "en";
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setFormData({
      ...formData,
      [name]: value,
    });
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
        const res = await API.fetchBySlugAsJson("forms", locale, contactUsSlug);

        setItem(res);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [locale]);
  return (
    <React.Fragment>
      <Helmet>
        <title>
          {contactUsTitle} | {titleSuffix}
        </title>
      </Helmet>
      <h1 className="text-5xl font-bold pt-8 pb-8">{contactUsTitle}</h1>
      {item && (
        <form className="form" onSubmit={handleSubmit}>
          {item.fields.map((field) => {
            return (
              <React.Fragment key={field.id}>
                <label className="block py-2" htmlFor={field.name}>
                  <span className="block">{field.label || field.name}</span>
                  {field.blockType === "textarea" ? (
                    <textarea
                      name={field.name}
                      className="mt-1 block w-full px-3 py-2"
                      {...(field.required ? { required: "required" } : {})}
                      rows={5}
                      onChange={handleInputChange}
                    ></textarea>
                  ) : (
                    <input
                      type={field.blockType}
                      name={field.name}
                      {...(field.required ? { required: "required" } : {})}
                      className="mt-1 block w-full px-3 py-2"
                      onChange={handleInputChange}
                    />
                  )}
                </label>
              </React.Fragment>
            );
          })}
          <button
            type="submit"
            className={`rounded-none bg-${
              disabled ? "gray" : "blue"
            } px-10 mt-4 py-4 w-full`}
            {...(disabled ? { disabled: "disabled" } : {})}
          >
            {item.submitButtonLabel}
          </button>
        </form>
      )}
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
  );
}
