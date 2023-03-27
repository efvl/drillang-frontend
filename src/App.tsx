import React, { useContext, useEffect, useState } from 'react';
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
import { AppContext, AppUserContextProvider } from './models/AppUserContextProvider';
import Tags from './pages/tags/Tags';
import AddEditTag from './pages/tags/AddEditTag';
import RegisterPage from './pages/login/RegisterPage';
import { AppUserContext } from './models/AppUserContext';
import { observer } from 'mobx-react-lite';
import SourceInfos from './pages/srcinfo/SourceInfos';
import AddEditSourceInfo from './pages/srcinfo/AddEditSourceInfo';
import TestCards from './pages/tcard/TestCards';
import AddEditTCard from './pages/tcard/AddEditTCard';
import AddEditLTag from './pages/lessontag/AddEditLTag';
import LTags from './pages/lessontag/LTags';
import TestLessons from './pages/testlesson/TestLessons';
import AddEditTestLesson from './pages/testlesson/AddEditTestLesson';


const App = () => {

  const appUserContext = useContext(AppContext) as AppUserContext;

  useEffect(() => {
    if(localStorage.getItem('token')){
      console.log('has token');
    } else {
      console.log('no token');
    }
  }, [])

  return (
    <AppUserContextProvider>
      <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={ <Home/> }/>
              <Route path="/login" element={ <RegisterPage/> }/>
              <Route path="/lang" element={ <Langs/> }/>
              <Route path="/lang/add" element={ <AddEditLang/> }/>
              <Route path="/lang/edit/:id" element={ <AddEditLang/> }/>
              <Route path="/wcard" element={ <WordCards/> }/>
              <Route path="/wcard/add" element={ <AddEditWCard/> }/>
              <Route path="/wcard/edit/:id" element={ <AddEditWCard/> }/>
              <Route path="/tcard" element={ <TestCards/> }/>
              <Route path="/tcard/add" element={ <AddEditTCard/> }/>
              <Route path="/tcard/edit/:id" element={ <AddEditTCard/> }/>
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
              <Route path="/srcinfo" element={ <SourceInfos/> }/>
              <Route path="/srcinfo/add" element={ <AddEditSourceInfo/> }/>
              <Route path="/srcinfo/edit/:id" element={ <AddEditSourceInfo/> }/>
              <Route path="/ltags" element={ <LTags/> }/>
              <Route path="/ltags/add" element={ <AddEditLTag/> }/>
              <Route path="/ltags/edit/:id" element={ <AddEditLTag/> }/>
              <Route path="/testlesson" element={ <TestLessons/> }/>
              <Route path="/testlesson/add" element={ <AddEditTestLesson/> }/>
              <Route path="/testlesson/edit/:id" element={ <AddEditTestLesson/> }/>
            </Routes>
          </BrowserRouter>
      </div>
    </AppUserContextProvider>
  );
}

export default observer(App);
