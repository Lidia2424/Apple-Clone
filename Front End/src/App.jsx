import Alert from "./Components/Alert";
import FirstSection from "./Components/FirstSection";
import SecondSection from "./Components/SecondSection";
import ThirdSection from "./Components/ThirdSection";
import FourthSection from "./Components/FourthSection";
import FifthSection from "./Components/FifthSection";
import { Route, Routes } from "react-router-dom";
import Iphone from "./Components/Iphone";
import SingleAppleProduct from "./Components/SingleAppleProduct";
import Mac from "./Components/Pages/Mac";
import Ipad from "./Components/Pages/Ipad";
import Watch from "./Components/Pages/Watch";
import Tv from "./Components/Pages/Tv";
import Music from "./Components/Pages/Music";
import Support from "./Components/Pages/Support";
import Search from "./Components/Pages/Search";
import Cart from "./Components/Pages/Cart";
import Four04 from "./Components/Pages/Four04";
import SharedLayout from "./Components/SharedLayout";
import YoutubeVideos from "./Components/YoutubeVideos";

function Home() {
  return (
    <>
      <Alert />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <FifthSection />
      <YoutubeVideos />
    </>
  );
}

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/mac" element={<Mac />} />
          <Route path="/iphone" element={<Iphone />} />
          {/* <Route path="/iphone/:productID" element={<SingleAppleProduct />} /> */}
          <Route path="/iphone/:product_url" element={<SingleAppleProduct />} />
          <Route path="/ipad" element={<Ipad />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/Tv" element={<Tv />} />
          <Route path="/Music" element={<Music />} />
          <Route path="/Support" element={<Support />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Four04 />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
