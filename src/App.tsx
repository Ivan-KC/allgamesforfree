import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./Home";
import Contacto from "./Contacto";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>

          <Route index element={<Home />} />

          <Route path="contacto" element={<Contacto />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;