import {Route, Routes} from "react-router-dom"

import { useState, useEffect } from 'react';

import Detail from "./views/detail/detail";
import Form from "./views/form/form";
import Home from "./views/home/home";
import Landing from "./views/landing/landing";
import Loading from "./components/loading/loading";


function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Aquí puedes simular una carga de datos
    setTimeout(() => {
      setLoading(false); // Cuando termina la carga
    }, 1500); // Simulamos una carga de 3 segundos
  }, []);


  return (
    <div>
       {loading ? <Loading /> : 
       <div>
      <Routes>
        <Route path="/" exact element={<Landing />}/>
        <Route path="/countries" element={<Home />}/>
        <Route path="/countries/:id" element={<Detail />}/>
        <Route path="/countries/form" element={<Form />}/>
      </Routes>
      </div>}
    </div>
  );
}

export default App;
