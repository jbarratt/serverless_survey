class HappinessSurvey extends React.Component {
    render() {
        var Panel = ReactBootstrap.Panel;
        var Input = ReactBootstrap.Input;
        var Button = ReactBootstrap.Button;
        return <form>
            <Panel header="On a scale of 1-5, how happy are you with your company right now?">
                <Input type="select" ref="score" defaultValue="5">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </Input>
            </Panel>
            <Panel header="What's making you most happy right now?">
                <Input type="textarea" ref="mosthappy" rows="5" />
            </Panel>
            <Panel header="What's making you least happy right now?">
                <Input type="textarea" ref="leasthappy" rows="5" />
            </Panel>
            <Panel header="What can we do to move your score higher?">
                <Input type="textarea" ref="raisescore" rows="5" />
            </Panel>
            <Panel header="Any feedback about the survey itself?">
                <Input type="textarea"  ref="surveyfeedback" rows="5" />
            </Panel>
            <Button bsStyle="primary" bsSize="large" onClick={this.submitSurvey.bind(this)}>Submit Survey</Button>
        </form>
    }
    submitSurvey() {
        var endpoint="https://qpzm97uod1.execute-api.us-west-2.amazonaws.com/dev/results"
        var rv = {};
        rv['score'] = this.refs.score.getValue();
        rv['mosthappy'] = this.refs.mosthappy.getValue();
        rv['leasthappy'] = this.refs.leasthappy.getValue();
        rv['raisescore'] = this.refs.raisescore.getValue();
        rv['surveyfeedback'] = this.refs.surveyfeedback.getValue();
        console.log(rv);
        fetch(endpoint, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rv)
        });
    }
}

window.App.HappinessSurvey = HappinessSurvey
