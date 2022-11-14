import React from 'react';
import Lang from './pages/Lang';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import AddEditLang from './pages/AddEditLang';
import Home from './pages/Home';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <Home/> }/>
          <Route exact path="/lang" element={ <Lang/> }/>
          <Route exact path="/lang/add" element={ <AddEditLang/> }/>
          <Route exact path="/lang/edit/:id" element={ <AddEditLang/> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
