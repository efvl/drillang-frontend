import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddLangForm = ({create}) => {

    const [lang, setLang] = useState({
        id:"",
        shortName:"",
        fullName:""
    });

    const addNewLanguage = (e) => {
        e.preventDefault();
        create(lang);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h5 className="text-center m-4">Add Language</h5>
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
                                onClick={addNewLanguage}> Submit </button>
                        <Link className="btn btn-outline-danger mx-2" to="/">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddLangForm;