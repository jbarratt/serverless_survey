class LandingPage extends React.Component {
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

window.App.LandingPage = LandingPage
