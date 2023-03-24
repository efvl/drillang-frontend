import React from "react";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { SourceInfo } from "../models/SourceInfo";
import SourceInfoTableRow from "./SourceInfoTableRow";

interface SourceInfoTableProps {
    srcInfos: Array<SourceInfo>,
    remove: (id: number) => void,
}

const SourceInfoTable = (props:SourceInfoTableProps) => {

    return (
        <Container className="py-2">
            <Table striped bordered hover className="shadow">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">id</th>
                    <th scope="col">Type</th>
                    <th scope="col">Name</th>
                    <th scope="col">PathLink</th>
                    <th scope="col">Authors</th>
                    <th scope="col">Other</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.srcInfos 
                        ? props.srcInfos.map((item, index) =>
                            <SourceInfoTableRow key={item.id} rowNum={index + 1} srcInfo={item} remove={props.remove} />
                          )
                        : <></>
                    }
                </tbody>
            </Table>
        </Container>    
    );

};

export default SourceInfoTable;