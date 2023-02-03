import { Link } from "react-router-dom";
import Utils from "../../Utils";
import { WTag } from "../models/WTag";

interface TagProps {
    wtag:WTag,
    rowNum:number,
    remove:(id: number) => void,
}

const TagTableRow = (props:TagProps) => {

    return (
        <tr>
            <th scope="row">{props.rowNum}</th> 
            <td>{props.wtag?.id}</td>
            <td>{props.wtag?.name}</td>
            <td>{Utils.cutString(props.wtag?.description, 50)}</td>
            <td>
                <Link to={`/tags/edit/${props.wtag?.id}`} className="btn btn-outline-primary mx-2">Update</Link>
                <button onClick={() => props.remove(props.wtag?.id)} className="btn btn-danger mx-2">Delete</button>
            </td>
        </tr>
    );

};

export default TagTableRow;
