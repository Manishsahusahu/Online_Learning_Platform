import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";

function App() {
    return (
        <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
