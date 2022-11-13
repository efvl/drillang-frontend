import React from "react";

const AddLangForm = () => {

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h5 className="text-center m-4">Add Language</h5>
                    <div className="mb-3">
                        <label htmlFor="shortName" className="form-label">Short Name</label>
                        <input type={"text"} className="form-control" placeholder="Enter short language name" name="shortName"/>
                    </div>   
                    <div className="mb-3"> 
                        <label htmlFor="fullName" className="form-label">Full Name</label>
                        <input type={"text"} className="form-control" placeholder="Enter full language name" name="fullName"/>
                    </div>
                    <button type="submit" className="btn btn-outline-primary">Submit</button>
                    <button type="submit" className="btn btn-outline-danger mx-2">Cancel</button>
                </div>
            </div>
        </div>
    );

};

export default AddLangForm;