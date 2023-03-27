import { Container, Row, ButtonToolbar, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const LTagActionBar = () => {
    return (
        <Container>
            <Row className="pt-2">
                <ButtonToolbar aria-label="Lesson Tag Toolbar">
                    <ButtonGroup className="me-2" aria-label="Actions group">
                    <Link className="btn btn-outline-success" to="/ltags/add">Add Lesson Tag</Link>
                    </ButtonGroup>
                </ButtonToolbar>
            </Row>
        </Container>
    );

};

export default LTagActionBar;