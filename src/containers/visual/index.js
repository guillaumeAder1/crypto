import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { searchMulti } from '../../modules/cryptoApi';
import MultiVisual from './multiple'
import { Button, ButtonGroup } from 'reactstrap';

class VisualManager extends React.Component {
    constructor() {
        super()
        this.state = {
            symbols: null,
            type: null
        }
    }
    componentWillMount() {
        let symbols = this.props.watched.map(element => {
            return element.Symbol
        });
        // DEFAULT VALUES
        if (!symbols.length) { symbols = ["808", "LTC", "ZEC"]; }
        this.setState({
            symbols: symbols
        })
        this.props.searchMulti(symbols)
    }
    changeType(val) {
        this.setState({ type: val }, () => {
            this.props.searchMulti(this.state.symbols, val);
        });
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }
    render() {
        const isMultiResults = this.props.multiResults || false;
        return (
            <div>
                <h5>
                    Visual Manager
                </h5>
                <p>
                    <ButtonGroup>
                        <Button color="primary" onClick={() => this.changeType('histominute')} >Minute</Button>
                        <Button color="primary" onClick={() => this.changeType('histohour')} >Hour</Button>
                        <Button color="primary" onClick={() => this.changeType('histoday')} >Day</Button>
                    </ButtonGroup>
                </p>

                {isMultiResults.length ? <MultiVisual data={isMultiResults} type='line' height='250' /> : false}

            </div>
        );
    }
}

const mapStateToProps = state => ({
    watched: state.userSettings.list,
    multiResults: state.cryptoApi.multiResults
})

const mapDispatchToProps = dispatch => bindActionCreators({
    searchMulti
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VisualManager)

