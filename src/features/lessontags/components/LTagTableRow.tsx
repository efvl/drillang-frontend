import { Link } from "react-router-dom";
import Utils from "../../Utils";
import { LTag } from "../models/LTag";

interface LTagProps {
    ltag:LTag,
    rowNum:number,
    remove:(id: number) => void,
}

const LTagTableRow = (props:LTagProps) => {

    return (
        <tr>
            <th scope="row">{props.rowNum}</th> 
            <td>{props.ltag?.id}</td>
            <td>{props.ltag?.name}</td>
            <td>{Utils.cutString(props.ltag?.description, 50)}</td>
            <td>
                <Link to={`/ltags/edit/${props.ltag?.id}`} className="btn btn-outline-primary mx-2">Update</Link>
                <button onClick={() => props.remove(props.ltag?.id)} className="btn btn-danger mx-2">Delete</button>
            </td>
        </tr>
    );

};

export default LTagTableRow;
