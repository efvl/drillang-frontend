import React from 'react';
import Lang from './pages/Lang';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import AddLang from './pages/AddLang';
import EditLang from './pages/EditLang';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <Lang/> }/>
          <Route exact path="/lang/add" element={ <AddLang/> }/>
          <Route exact path="/lang/edit/:id" element={ <EditLang/> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
