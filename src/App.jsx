import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "./Pages/Detail";
import Homepage from "./Pages/Homepage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TopPage from "./Pages/TopPage";
import FormPage from "./Pages/FormPage";
import StoryList from "./Pages/StoryListPage";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import AlertModal from "./Pages/Alert";
import { socket, SocketContext } from "./utils/socket";
import {
  topPageUri,
  formPageUri,
  storyListUri,
} from "./utils/contentFilterHelper";

const App = () => {
  return (
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <Header />
        <AlertModal />
        <div id="main" className="pr-4 pl-4 m-auto">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path={topPageUri} element={<TopPage />} />
            <Route path={formPageUri} element={<FormPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/story/:id" element={<Detail />} />
            <Route path={storyListUri} element={<StoryList />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </SocketContext.Provider>
  );
};
export default App;
