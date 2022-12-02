import React from 'react';
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
          <Route exact path="/translate" element={ <Translates/>} />
          <Route exact path="/translate/edit/:id" element={ <AddEditTranslation/>} />
          <Route exact path="/translate/add"  element={ <AddEditTranslation/>} />
          <Route exact path="/wlesson" element={ <WordLessons/> }/>
          <Route exact path="/wlesson/add" element={ <AddEditWLesson/> }/>
          <Route exact path="/wlesson/edit/:id" element={ <AddEditWLesson/> }/>
          <Route exact path="/wlesson/translates/:id" element={ <WLessonTranslates/> }/>
          <Route exact path="/process/wlesson/:id" element={ <WLessonProcess/> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
