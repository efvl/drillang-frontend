import React from "react";
import { Link } from "react-router-dom";

const LangNavbar = () => {
    return (
        <div>
            <nav className="navbar navbar-light">
                <Link className="btn btn-outline-success" to="/lang/add">Add Lang</Link>
            </nav>
        </div>
    );

};

export default LangNavbar;