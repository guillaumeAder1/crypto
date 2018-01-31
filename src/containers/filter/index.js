import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
import Currencies from '../currencies'



class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            max: 0,
            matches: false
        };
    }
    updateInputValue(evt, element) {
        if (element === 'name') {
            this.setState({
                name: evt.target.value
            });
        } else if (element === 'max') {
            this.setState({
                max: evt.target.value
            });
        }

    }
    dofilter() {
        console.log(this.state)
        const matches = this.props.results.Data.filter(d => {
            const name = d.CoinName.toLowerCase();
            return (name.indexOf(this.state.name.toLowerCase()) > -1) ? true : false;
        }, this)
        const truncated = (this.state.max > 0) ? matches.slice(0, this.state.max) : matches;
        this.setState({
            matches: truncated
        })
    }

    render() {

        return (
            <Container>
                <Form inline>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="name" className="mr-sm-2">Name</Label>
                        <Input value={this.state.name} onChange={evt => this.updateInputValue(evt, 'name')} type="text" name="name" id="name" placeholder="Name contains..." />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="max" className="mr-sm-2">Max results</Label>
                        <Input value={this.state.max} onChange={evt => this.updateInputValue(evt, 'max')} min='0' type="number" name="max" id="max" placeholder="max results" />
                    </FormGroup>
                    <Button onClick={e => this.dofilter()}>Submit</Button>
                </Form>
                <Currencies data={this.state.matches} />
            </Container>
        );
    }
}


const mapStateToProps = state => ({
    results: state.cryptoApi.results
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Filter)