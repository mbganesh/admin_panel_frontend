import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SubjectPage from "./Components/SubjectPage";
import VideoPage from "./Components/VideoPage";
import TwoMark from "./Components/TwoMark";
import OneMark from "./Components/OneMark";
import LoginPanel from "./Components/LoginPanel";
import BoardSelection from "./Components/BoardSelectionPage";
import UnitPage from "./Components/UnitPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginPanel />} />
          <Route exact path="/boardselection" element={<BoardSelection />} />
          <Route exact path="/subjectpage" element={<SubjectPage />} />
          <Route exact path="/unitpage" element={<UnitPage />} />
          <Route exact path="/videos" element={<VideoPage />} />
          <Route exact path="/onemarks" element={<OneMark />} />
          <Route exact path="/twomarks" element={<TwoMark />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
