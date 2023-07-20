import React from "react";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { TCardSourceInfo } from "../models/TCardSourceInfo";
import TCardSourceInfoTableRow from "./TCardSourceInfoTableRow";


interface TCardSourceInfoTableProps {
    cardSources?:Array<TCardSourceInfo>;
    update?:(tcs:TCardSourceInfo) => void;
    delete?:(id:number) => void;
}

const TCardSourceInfoTable = (props:TCardSourceInfoTableProps) => {

    return (
        <Container className="pt-2 px-0">
            {props.cardSources ? 
            <Table striped bordered hover className="shadow">
                <thead>
                    <tr>
                        <th className="text-center">Del</th>
                        <th scope="col">N</th>
                        <th scope="col">Type</th>
                        <th scope="col">Name/Authors</th>
                        <th scope="col">Path Link</th>
                        <th scope="col">Page/Time</th>
                    </tr>
                </thead>
                <tbody>
                    {props.cardSources.map((item, index) =>
                        <TCardSourceInfoTableRow key={item.sourceInfo.id} rowNum={index + 1} tcsInfo={item} 
                            update={props.update} delete={props.delete}/>
                        )
                    }
                </tbody>
            </Table>
            : <></>}
        </Container>    
    );

};

export default TCardSourceInfoTable;