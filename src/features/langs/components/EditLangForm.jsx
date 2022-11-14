import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LangService from '../services/LangService'

const EditLangForm = ({update, languageId}) => {

    const [lang, setLang] = useState({
        id:"",
        shortName:"",
        fullName:""
    });

    const updateLanguage = (e) => {
        e.preventDefault();
        update(lang);
    }

    useEffect(() => {
        loadLanguage();
    }, []);

    const loadLanguage = async () => {
        const result = await LangService.getLanguageById(languageId);
        console.log(result.data);  
        setLang(result.data);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h5 className="text-center m-4">Edit Language</h5>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="shortName" className="form-label">Short Name</label>
                            <input type={"text"} 
                                className="form-control" 
                                placeholder="Enter short language name" 
                                name="shortName" 
                                value={lang.shortName}
                                onChange={e => setLang({...lang, shortName: e.target.value})}/>
                        </div>   
                        <div className="mb-3"> 
                            <label htmlFor="fullName" className="form-label">Full Name</label>
                            <input type={"text"} 
                                className="form-control" 
                                placeholder="Enter full language name"
                                name="fullName" 
                                value={lang.fullName}
                                onChange={e => setLang({...lang, fullName: e.target.value})}/>
                        </div>
                        <button type="submit" 
                                className="btn btn-outline-primary"
                                onClick={updateLanguage}> Submit </button>
                        <Link className="btn btn-outline-danger mx-2" to="/">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditLangForm;