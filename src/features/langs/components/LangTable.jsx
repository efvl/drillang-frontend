import React from "react";
import LangTableRow from "../components/LangTableRow";

const LangTable = ({langs}) => {

    return (
        <div className="container">
            <div className="py-4">
                <table className="table border shadow">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">id</th>
                    <th scope="col">ShortName</th>
                    <th scope="col">FullName</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {langs.map((item, index) =>
                        <LangTableRow rowNum={index + 1} lang={item} key={item.id} />
                    )}
                </tbody>
                </table>
            </div>
        </div>
    );

};

export default LangTable;