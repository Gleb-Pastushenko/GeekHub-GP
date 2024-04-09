import { BrowserRouter, Routes, Route } from "react-router-dom";

import RootLayout from "./components/RootLayout.component";
import News from "./pages/News.page";
import Ads from "./pages/Ads.page";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<News />} />
            <Route path="ads/" element={<Ads />} />
          </Route>
        </Routes>

      </div>
    </BrowserRouter>

  );
}

export default App;
