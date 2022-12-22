import React, { useEffect, useState } from 'react';
import Langs from './pages/lang/Langs';
import WordCards from './pages/wcard/WordCards';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import AddEditLang from './pages/lang/AddEditLang';
import AddEditWCard from './pages/wcard/AddEditWCard';
import Home from './pages/Home';
import Translates from './pages/translate/Translates';
import AddEditTranslation from './pages/translate/AddEditTranslation';
import WordLessons from './pages/lesson/WordLessons';
import AddEditWLesson from './pages/lesson/AddEditWLesson';
import WLessonTranslates from './pages/lesson/WLessonTranslates';
import WLessonProcess from './pages/lesson/WLessonProcess';
import { AppUserContextProvider } from './models/AppUserContextProvider';
import Tags from './pages/tags/Tags';
import AddEditTag from './pages/tags/AddEditTag';


const App = () => {

  return (
    <AppUserContextProvider>
      <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={ <Home/> }/>
              <Route path="/lang" element={ <Langs/> }/>
              <Route path="/lang/add" element={ <AddEditLang/> }/>
              <Route path="/lang/edit/:id" element={ <AddEditLang/> }/>
              <Route path="/wcard" element={ <WordCards/> }/>
              <Route path="/wcard/add" element={ <AddEditWCard/> }/>
              <Route path="/wcard/edit/:id" element={ <AddEditWCard/> }/>
              <Route path="/translate" element={ <Translates/>} />
              <Route path="/translate/edit/:id" element={ <AddEditTranslation/>} />
              <Route path="/translate/add"  element={ <AddEditTranslation/>} />
              <Route path="/wlesson" element={ <WordLessons/> }/>
              <Route path="/wlesson/add" element={ <AddEditWLesson/> }/>
              <Route path="/wlesson/edit/:id" element={ <AddEditWLesson/> }/>
              <Route path="/wlesson/translates/:id" element={ <WLessonTranslates/> }/>
              <Route path="/process/wlesson/:id" element={ <WLessonProcess/> }/>
              <Route path="/tags" element={ <Tags/> }/>
              <Route path="/tags/add" element={ <AddEditTag/> }/>
              <Route path="/tags/edit/:id" element={ <AddEditTag/> }/>
            </Routes>
          </BrowserRouter>
      </div>
    </AppUserContextProvider>
  );
}

export default App;
