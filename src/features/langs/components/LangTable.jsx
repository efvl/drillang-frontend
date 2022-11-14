import React from "react";
import LangTableRow from "../components/LangTableRow";

const LangTable = ({langs, remove}) => {

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
                        <LangTableRow key={item.id} rowNum={index + 1} lang={item} remove={remove} />
                    )}
                </tbody>
                </table>
            </div>
        </div>
    );

};

export default LangTable;