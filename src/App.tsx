import { Routes, Route } from "react-router";
import Layout from "./Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ZodTutorial from "./pages/ZodTutorial";
import ZodTutorialTwo from "./pages/ZodTutorialTwo";
import ZodTutorialThree from "./pages/ZodTutorialThree";
import ZodFormik from "./pages/ZodFormik";
import ZodFormikTwo from "./pages/ZodFormikTwo";

const App = () => {
  return (
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/zodtutorial" element={<ZodTutorial />} />
          <Route path="/zodtutorialtwo" element={<ZodTutorialTwo />} />
          <Route path="/zodtutorialthree" element={<ZodTutorialThree />} />
          <Route path="/zodformik" element={<ZodFormik />} />
          <Route path="/zodformiktwo" element={<ZodFormikTwo />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
  );
};

export default App;
