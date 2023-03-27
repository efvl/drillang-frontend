import { Container, Table } from "react-bootstrap";
import { LTag } from "../models/LTag";
import LTagTableRow from "./LTagTableRow";

interface LTagTableProps {
    ltags:Array<LTag>;
    remove:(id: number) => void;
}

const LTagTable = (props:LTagTableProps) => {
    return (
        <Container className="py-2">
            <Table striped bordered hover className="shadow">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.ltags 
                        ? props.ltags.map((item, index) =>
                            <LTagTableRow key={item.id} rowNum={index + 1} ltag={item} remove={props.remove} />
                          )
                        : <></>
                    }
                </tbody>
            </Table>
        </Container>    
    );

};

export default LTagTable;

