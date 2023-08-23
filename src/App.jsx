import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "./Pages/Detail";
import Homepage from "./Pages/Homepage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import AlertModal from "./Pages/Alert";
import { socket, SocketContext } from "./utils/socket";

const App = () => {
  return (
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <Header />
        <AlertModal />
        <div id="main" className="pr-4 pl-4 m-auto">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/story/:id" element={<Detail />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </SocketContext.Provider>
  );
};
export default App;
