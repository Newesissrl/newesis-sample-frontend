import React, { useContext, useEffect } from "react";
import qs from "qs";
import ReactHtmlParser from "react-html-parser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SocketContext } from "../utils/socket";
import API from "../utils/api";

const ToastMsg = ({ msg, locale }) => {
  return (
    <>
      <h2 className="text-xl font-bold pt-2 pb-4">{msg.title}</h2>
      <section className="grid grid-cols-12 pt-4 gap-4 pb-10">
        <div className="col-span-12 lg:col-span-4">
          {msg.thumb && (
            <img
              src={API.getUploadsUrl(msg.thumb, "thumbnail")}
              className="roundex-xl"
            />
          )}
        </div>
        <div className="col-span-12 lg:col-span-8 max-w-[50rem]">
          <div className="pb-4">
            {ReactHtmlParser(
              msg.content[locale] ||
                msg.content.en ||
                msg.content.it ||
                "Sorry, missing locale and default language message",
              true,
            )}
          </div>
          {msg.destinationURL && (
            <a
              className="underline underline-offset-2"
              href={msg.destinationURL}
            >
              {msg.destinationURL}
            </a>
          )}
        </div>
      </section>
    </>
  );
};
function AlertModal() {
  const socket = useContext(SocketContext);
  const locale = (qs.parse(window.location.search) || {}).locale || "en";

  useEffect(() => {
    socket.on("alert message", (msg) => {
      if (!msg.isPrivate) {
        const type = (msg.alertType?.type || "default").toLowerCase();
        toast.dismiss();

        toast(<ToastMsg msg={msg} locale={locale} />, {
          type,
          position: "top-center",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      }
    });
  }, [socket, locale]);

  return (
    <React.Fragment>
      <ToastContainer
        position="top-center"
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

export default AlertModal;
