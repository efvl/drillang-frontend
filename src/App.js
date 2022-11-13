import React from 'react';
import Lang from './pages/Lang';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import AddLang from './pages/AddLang';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <Lang/> }/>
          <Route exact path="/lang/add" element={ <AddLang/> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
