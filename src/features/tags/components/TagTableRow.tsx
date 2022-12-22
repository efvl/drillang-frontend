import { Link } from "react-router-dom";
import Utils from "../../Utils";
import { Tag } from "../models/Tag";

interface TagProps {
    tag?:Tag,
    rowNum?:number,
    remove?:(id: number) => void,
}

const TagTableRow = (props:TagProps) => {

    return (
        <tr>
            <th scope="row">{props.rowNum}</th> 
            <td>{props.tag?.id}</td>
            <td>{props.tag?.name}</td>
            <td>{Utils.cutString(props.tag?.description, 50)}</td>
            <td>
                <Link to={`/tags/edit/${props.tag?.id}`} className="btn btn-outline-primary mx-2">Update</Link>
                <button onClick={() => props.remove(props.tag?.id)} className="btn btn-danger mx-2">Delete</button>
            </td>
        </tr>
    );

};

export default TagTableRow;
