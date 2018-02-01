import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { search, select } from '../../modules/cryptoApi';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col } from 'reactstrap';
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

    // componentDidMount() {
    //     this.setState({
    //         matches: this.props.results ? this.props.results.Data : false
    //     })
    // }

    componentWillMount() {
        this.props.search()
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
        const matches = this.state.name ? this.props.results.Data.filter(d => {
            const name = d.CoinName.toLowerCase();
            return (name.indexOf(this.state.name.toLowerCase()) > -1) ? true : false;
        }, this) : this.props.results.Data;
        const truncated = (this.state.max > 0) ? matches.slice(0, this.state.max) : matches;
        // this.setState({
        //     matches: { Data: truncated, BaseImageUrl: this.props.results.BaseImageUrl }
        // });
        return truncated;
    }

    render() {
        const results = this.props.results ? this.dofilter() : false;
        const baseimage = this.props.results ? this.props.results.BaseImageUrl : false;
        //const val = { Data: this.state.matches, BaseImageUrl: this.props.results.BaseImageUrl }
        return (
            <Container fluid>
                <Form inline className="pad">
                    <Row>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="name" className="mr-sm-2">Name</Label>
                            <Input value={this.state.name} onChange={evt => this.updateInputValue(evt, 'name')} type="text" name="name" id="name" placeholder="Name contains..." />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="max" className="mr-sm-2">Max results</Label>
                            <Input value={this.state.max} onChange={evt => this.updateInputValue(evt, 'max')} min='0' type="number" name="max" id="max" placeholder="max results" />
                        </FormGroup>
                        <Button onClick={e => this.dofilter()}>Submit</Button>
                    </Row>

                </Form>
                <Currencies data={results} imgurl={baseimage} />
            </Container>
        );
    }
}


const mapStateToProps = state => ({
    results: state.cryptoApi.results,
    fetching: state.cryptoApi.fetching,
    watched: state.userSettings.list
})

const mapDispatchToProps = dispatch => bindActionCreators({
    search,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Filter)