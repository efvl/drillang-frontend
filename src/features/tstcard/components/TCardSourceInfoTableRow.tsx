import { SourceInfo } from "../../srcinfo/models/SourceInfo";
import Utils from "../../Utils";
import { TCardSourceInfo } from "../models/TCardSourceInfo";
import { ArrowRepeat, ArrowLeftSquare, XSquare, CheckCircle, Circle, TrophyFill, Square } from "react-bootstrap-icons";
import { Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

interface SourcesForTCardRowProps {
    tcsInfo: TCardSourceInfo,
    rowNum: number,
    update?:(tcs:TCardSourceInfo) => void,
    delete?:(id:number) => void
}

const TCardSourceInfoTableRow = (props:SourcesForTCardRowProps) => {

    const [rowSrcInfo, setRowSrcInfo] = useState<TCardSourceInfo>({});

    useEffect(() => {
        setRowSrcInfo(props.tcsInfo);
    }, [props.tcsInfo]);

    const removeSourceFromCard = (id) => {
        props.delete(id);
    }

    const saveUpdates = (tsc:TCardSourceInfo) => {
        props.update(tsc);
        setRowSrcInfo(tsc);
    }

    const pointerHover = {
        cursor: 'pointer',
     };

    return (
        <tr>
            <td className="text-center" width="2%">
                <span style={pointerHover}>
                    <ArrowLeftSquare size={18} color="red" onClick={() => removeSourceFromCard(rowSrcInfo.sourceInfo.id)}></ArrowLeftSquare>
                </span>
            </td>
            <td width="2%">{props.rowNum}</td> 
            <td width="5%">{rowSrcInfo.sourceInfo?.sourceType}</td>
            <td>
                <Container>
                    <Row>{Utils.cutString(rowSrcInfo.sourceInfo?.name, 50)}</Row>
                    <Row>{Utils.cutString(rowSrcInfo.sourceInfo?.authors, 50)}</Row>
                </Container>
                
            </td>
            {Utils.isStringLink(rowSrcInfo.sourceInfo?.pathLink) 
                ? <td><a href={`${rowSrcInfo.sourceInfo?.pathLink}`} target="_blank">{Utils.cutString(rowSrcInfo.sourceInfo?.pathLink, 150)}</a></td>
                : <td>{Utils.cutString(rowSrcInfo.sourceInfo?.pathLink, 150)}</td>
            }
            <td width="20%">            
                <Form.Group controlId="timePage">
                <Form.Control type="text" 
                    placeholder="Enter timePage"
                    value={rowSrcInfo.timePage}
                    onChange={e => props.update({...rowSrcInfo, timePage: e.target.value})}/>
                </Form.Group>
            </td>
        </tr>
    );

};

export default TCardSourceInfoTableRow;