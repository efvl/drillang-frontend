import React from 'react';
import Langs from './pages/Langs';
import WordCards from './pages/WordCards';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import AddEditLang from './pages/AddEditLang';
import AddEditWCard from './pages/AddEditWCard';
import Home from './pages/Home';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <Home/> }/>
          <Route exact path="/lang" element={ <Langs/> }/>
          <Route exact path="/lang/add" element={ <AddEditLang/> }/>
          <Route exact path="/lang/edit/:id" element={ <AddEditLang/> }/>
          <Route exact path="/wcard" element={ <WordCards/> }/>
          <Route exact path="/wcard/add" element={ <AddEditWCard/> }/>
          <Route exact path="/wcard/edit/:id" element={ <AddEditWCard/> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
