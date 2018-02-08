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
        // const valid = this.listSymbol[0] ? this.listSymbol : [['BTC', '1182'], ['ETH', '7605']];
        const valid = this.listSymbol[0] ? this.listSymbol : ['BTC', 'ETH'];
        // this.props.getPrice(valid)
        this.dates = [1518087302099, 1418087302099, 1438087302099]
        this.props.getPriceAtTime(valid, this.dates)

    }
    render() {
        console.log(this.res, this.props.price)
        const data = this.props.price || false



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

