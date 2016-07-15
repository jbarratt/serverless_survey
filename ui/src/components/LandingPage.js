import React from 'react';
import { Navbar, Nav, NavItem, Grid, Row, Col } from 'react-bootstrap';
import HappinessSurvey from './HappinessSurvey.js';


class LandingPage extends React.Component {
    render() {
        return <div>
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        Happiness Survey (Q3 2016)
                    </Navbar.Brand>
                </Navbar.Header>
            </Navbar>
            <Grid>
                <Row>
                    <Col xs={10} xsOffset={1}>
                        <HappinessSurvey></HappinessSurvey>
                    </Col>
                </Row>
            </Grid>
        </div>
    }
}

export default LandingPage;
