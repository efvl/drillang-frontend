import { Container, Row, ButtonToolbar, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const TagActionBar = () => {
    return (
        <Container>
            <Row className="pt-2">
                <ButtonToolbar aria-label="Word Card Toolbar">
                    <ButtonGroup className="me-2" aria-label="Actions group">
                    <Link className="btn btn-outline-success" to="/tags/add">Add Tag</Link>
                    </ButtonGroup>
                </ButtonToolbar>
            </Row>
        </Container>
    );

};

export default TagActionBar;