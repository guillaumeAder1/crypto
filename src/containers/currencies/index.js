import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { search, select } from '../../modules/cryptoApi';
import { add, remove } from '../../modules/userSettings';
import { Button, Container, Row, Col, Table, Collapse, CardBody, Card, Media } from 'reactstrap';



class Currencies extends React.Component {

  returnCurrencies(data, basepath) {
    const ret = data.map((element, i) => {
      if (i < 50) {
        return <tr key={i} onClick={e => this.addOrRemoveCurrency(element)}>
          <th scope="row">{element.Id}</th>
          <td>{element.CoinName.toUpperCase()}</td>
          <td>{element.Name}</td>
          <td>{element.Algorithm}</td>
          <td><Button color="success" onClick={(e) => this.selectCoin(element.Symbol)}>More...</Button></td>
          <td><img src={basepath + element.ImageUrl + '?width=25'} /></td>
        </tr>
      } else {
        return;
      }

    }, this);
    const table = <Table dark responsive id='currencies-table'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Coin Name</th>
          <th>Name</th>
          <th>Algorithm</th>
          <th>More</th>
          <th>See</th>
        </tr>
      </thead><tbody>{ret}</tbody>
    </Table>;
    return table;
  }

  addOrRemoveCurrency(currency) {
    const isnew = this.props.watched.filter(d => currency.Id === d.Id);
    if (isnew.length > 0) {
      this.props.remove(currency)
    } else {
      this.props.add(currency)
    }
  }

  drawGraph(coin) {
    this.props.select(coin);

  }

  selectCoin(coin) {
    this.props.changePage();
    this.props.select(coin);
  }
  render() {
    const currencies = this.props.data && this.props.imgurl ? this.returnCurrencies(this.props.data, this.props.imgurl) : false;
    return (
      <Container fluid>
        <Row>
          {currencies}
        </Row>
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
  select,
  changePage: () => push('/'),
  add,
  remove
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Currencies)

// export default About
