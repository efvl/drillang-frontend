import React from "react";
import WCardTableRow from "./WCardTableRow";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { WCard } from "../models/WCard";

interface WCardTableProps {
    wcards: Array<WCard>,
    remove: (id: number) => void,
}

const WordCardTable = (props:WCardTableProps) => {

    return (
        <Container className="py-2">
            <Table striped bordered hover className="shadow">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">id</th>
                    <th scope="col">Lang</th>
                    <th scope="col">Word</th>
                    <th scope="col">Transcription</th>
                    <th scope="col">Example</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.wcards.map((item, index) =>
                        <WCardTableRow key={item.id} rowNum={index + 1} wcard={item} remove={props.remove} />
                    )}
                </tbody>
            </Table>
        </Container>    
    );

};

export default WordCardTable;