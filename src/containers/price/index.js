import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPrice, getPriceAtTime } from '../../modules/cryptoApi';
import PriceChart from './chart'

class PriceManager extends React.Component {
    componentDidMount() {

        this.listSymbol = this.props.watched.map(e => {
            return e.Symbol
        });
        const valid = this.listSymbol[0] ? this.listSymbol : ['BTC', 'ETH'];
        this.dates = [1392136214, 1423672214, 1455208214, 1486830614]
        this.props.getPriceAtTime(valid, this.dates);
        console.log("Price Index.js, componenentDidMount() :: ")
    }
    render() {
        console.log("Price Index.js, render() :: ", this.props.price);
        const data = this.props.price || false;
        return (
            <div>
                <h5>PriceManager</h5>
                {data ? <PriceChart data={data} height="300" dates={this.dates} /> : false}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    watched: state.userSettings.list,
    price: state.cryptoApi.price
})

const mapDispatchToProps = dispatch => bindActionCreators({
    getPrice,
    getPriceAtTime
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PriceManager)

