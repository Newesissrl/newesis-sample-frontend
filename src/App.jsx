import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AlertModal from "./Pages/Alert";
import Detail from "./Pages/Detail";
import FormPage from "./Pages/FormPage";
import Homepage from "./Pages/Homepage";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import StoryList from "./Pages/StoryListPage";
import TopPage from "./Pages/TopPage";
import {
  formPageUri,
  storyListUri,
  topPageUri,
} from "./utils/contentFilterHelper";
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
            <Route path={topPageUri} element={<TopPage />} />
            <Route path={formPageUri} element={<FormPage />} />
            <Route path="/forms/:slug" element={<FormPage />} />
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
