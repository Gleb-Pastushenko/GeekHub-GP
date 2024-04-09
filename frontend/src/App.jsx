import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import RootLayout from "./components/RootLayout.component";
import News from "./pages/News.page";
import Ads from "./pages/Ads.page";
import Community from "./pages/Community.page";
import AboutUs from "./pages/AboutUs.page";
import Payments from "./pages/Payments.page";
import UserProfile from "./pages/UserProfile.page";
import AdsLayout from "./components/AdsLayout.component";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<News />} />
            <Route path="ads" element={<AdsLayout />}>
              <Route index element={<Navigate to="sell" />} />
              <Route path="sell" element={<Ads />} />
              <Route path="services" element={<Ads />} />
              <Route path="vacancies" element={<Ads />} />
            </Route>
            <Route path="community" element={<Community />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="payments" element={<Payments />} />
            <Route path="user-profile" element={<UserProfile />}></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter >

  );
}

export default App;
