import React from 'react';
import 'whatwg-fetch';
import { Panel, Input, Button, Modal } from 'react-bootstrap';

class HappinessSurvey extends React.Component {
    constructor() {
        super();
        this.state = {
            submitted: false,
        };
    }

    render() {
        return  <div>
            <Modal show={this.state.submitted}>
                <Modal.Header>
                    <Modal.Title>Thanks for sharing your thoughts!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>We really value your perspective on our business, and hearing
                    from you like this is an invaluable way to help transform it
                    into your ideal place to work. Thank you so much for whatever
                    feedback you chose to provide!</p>
                </Modal.Body>
            </Modal>
            <form>
                <Panel header="On a scale of 1 (Bad) - 5 (Great), how happy are you with your company right now?">
                    <Input type="select" ref="score" defaultValue="1">
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
        </div>
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
        this.state.submitted = true;
        this.setState(this.state);
    }
}

export default HappinessSurvey;
