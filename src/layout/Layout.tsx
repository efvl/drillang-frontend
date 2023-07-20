import React from "react";
import { Link } from "react-router-dom";
import TopNavbar from "./TopNavbar"

const Layout = ({children}) => {
    return (
        <div>
            <div>
                <TopNavbar/>
            </div>
            <main>{children}</main>
        </div>
    );

};

export default Layout;