import { Routes, Route } from "react-router";

import Home from "./pages/Home";
import Create from "./pages/Create";
import Detail from "./pages/Detail";

function App() {
  return (
    <div className="relative min-h-screen w-full bg-white">
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div
          className="absolute inset-0 bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"
        />

        <div
          className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"
        />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/memory/:id" element={<Detail />} />

        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center px-6 text-center">
              <div>
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-6">Page not found</p>
                <a
                  href="/"
                  className="inline-block px-6 py-3 bg-fuchsia-600 text-white rounded-lg font-medium hover:bg-fuchsia-700 transition-colors"
                >
                  Back to Home
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;