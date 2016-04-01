class FinalLandingPage extends React.Component {
    render() {
        var Navbar = ReactBootstrap.Navbar;
        var Nav = ReactBootstrap.Nav;
        var NavItem = ReactBootstrap.NavItem;
        var Grid = ReactBootstrap.Grid;
        var Row = ReactBootstrap.Row;
        var Col = ReactBootstrap.Col;
        var HappinessSurvey = window.App.HappinessSurvey;
        return <div>
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        Happiness Survey (Q2 2016)
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

window.App.FinalLandingPage = FinalLandingPage
