import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPrice } from '../../modules/cryptoApi';
import PriceChart from './chart'

class PriceManager extends React.Component {
    componentDidMount() {
        this.list = this.props.watched.map(e => {
            return e.Symbol
        })
        const valid = this.list[0] ? this.list : ['BTC', 'ETH']
        this.props.getPrice(valid)
    }
    render() {
        console.log(this.res, this.props.price)
        const data = this.props.price || false
        return (
            <div>
                <h5>PriceManager</h5>
                {data ? <PriceChart data={data} height="300" /> : false}
            </div>

        );
    }
}

const mapStateToProps = state => ({
    watched: state.userSettings.list,
    price: state.cryptoApi.price
})

const mapDispatchToProps = dispatch => bindActionCreators({
    getPrice
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PriceManager)

