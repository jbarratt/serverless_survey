import React from 'react';
import { Navbar, Nav, NavItem, Grid, Row, Col } from 'react-bootstrap';

class FinalLandingPage extends React.Component {
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
                        <h1>The survey is now closed. Thank you for your participation.</h1>
                    </Col>
                </Row>
            </Grid>
        </div>
    }
}

export default FinalLandingPage;
