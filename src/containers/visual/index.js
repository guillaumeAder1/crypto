import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { searchMulti } from '../../modules/cryptoApi';
import MultiVisual from './multiple'

class VisualManager extends React.Component {
    componentWillMount() {
        let symbols = this.props.watched.map(element => {
            return element.Symbol
        });
        // DEFAULT VALUES
        if (!symbols.length) { symbols = ["808", "LTC", "ZEC"]; }

        this.props.searchMulti(symbols)
    }
    render() {
        const isMultiResults = this.props.multiResults || false;
        return (
            <div>
                <h5>
                    Visual Manager
                </h5>
                {isMultiResults.length ? <MultiVisual data={isMultiResults} /> : false}

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

