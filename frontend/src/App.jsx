import { BrowserRouter, Routes, Route } from "react-router-dom";

import RootLayout from "./components/RootLayout.component";
import News from "./pages/News.page";
import Ads from "./pages/Ads.page";
import Community from "./pages/Community.page";
import AboutUs from "./pages/AboutUs.page";
import Payments from "./pages/Payments.page";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<News />} />
            <Route path="ads/" element={<Ads />} />
            <Route path="community/" element={<Community />} />
            <Route path="about-us/" element={<AboutUs />} />
            <Route path="payments/" element={<Payments />} />
          </Route>
        </Routes>

      </div>
    </BrowserRouter >

  );
}

export default App;
