import { Container, Table } from "react-bootstrap";
import LangTableRow from "../../langs/components/LangTableRow";
import { Tag } from "../models/Tag";
import TagTableRow from "./TagTableRow";

interface TagTableProps {
    tags?:Array<Tag>;
    remove?:(id: number) => void;
}

const TagTable = (props:TagTableProps) => {

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
                    {props.tags.map((item, index) =>
                        <TagTableRow key={item.id} rowNum={index + 1} tag={item} remove={props.remove} />
                    )}
                </tbody>
            </Table>
        </Container>    
    );

};

export default TagTable;

