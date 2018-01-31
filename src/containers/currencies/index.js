import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { search, select } from '../../modules/cryptoApi';
import { Button, Container, Row, Col, Table, Collapse, CardBody, Card } from 'reactstrap';



class Currencies extends React.Component {


  componentWillMount() {
    this.props.search()
  }

  returnCurrencies(data) {
    const list = Object.keys(data);

    const ret = list.map((element, i) => {
      return <tr key={i}>
        <th scope="row">{data[element].Id}</th>
        <td>{data[element].CoinName.toUpperCase()}</td>
        <td>{data[element].Name}</td>
        <td>{data[element].Algorithm}</td>
        <td><Button color="success" onClick={(e) => this.selectCoin(data[element].Symbol)}>More...</Button></td>
        <td><Button color="primary" onClick={(e) => this.drawGraph(data[element].Symbol)}>See...</Button></td>
      </tr>
    }, this);
    const table = <Table>
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

  drawGraph(coin) {
    this.props.select(coin);

  }

  selectCoin(coin) {
    this.props.changePage();
    this.props.select(coin);
  }
  render() {
    const currencies = this.props.results ? this.returnCurrencies(this.props.results.Data) : false;
    return (
      <Container>
        <Row>
          {currencies}
        </Row>
      </Container>
    );
  }
}


const mapStateToProps = state => ({
  results: state.cryptoApi.results,
  fetching: state.cryptoApi.fetching
})

const mapDispatchToProps = dispatch => bindActionCreators({
  search,
  select,
  changePage: () => push('/')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Currencies)

// export default About
