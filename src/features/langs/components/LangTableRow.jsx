import React from "react";

const LangTableRow = ({lang, rowNum}) => {

    return (
        <tr>
            <th scope="row">{rowNum}</th> 
            <td>{lang.id}</td>
            <td>{lang.shortName}</td>
            <td>{lang.fullName}</td>
            <td>
                <button className="btn btn-primary mx-2">View</button>
                <button className="btn btn-outline-primary mx-2">Update</button>
                <button className="btn btn-danger mx-2">Delete</button>
            </td>
        </tr>
    );

};

export default LangTableRow;