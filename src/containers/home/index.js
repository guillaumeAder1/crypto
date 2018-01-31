import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Container, Row, Col } from 'reactstrap';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection'


class Home extends React.Component {


  getData(data) {

    const node = this.node || node;
    const stepX = node.clientWidth / data.length;
    const r = stepX / 2;
    const d = data.map(d => {
      return { time: d.time, val: d.high }
    })
    const maxY = max(d, d => d.val);
    const yScale = scaleLinear()
      .domain([0, maxY])
      .range([0, 500])

    select(node).selectAll('circle')
      .data(d)
      .enter()
      .append('circle')
      .attr('cx', (d, i) => i * stepX)
      .attr('cy', d => yScale(d.val))
      .attr('r', 5)
  }

  getTime(data) {
    const start = new Date(data.TimeFrom * 1000).toDateString()
    const end = new Date(data.TimeTo * 1000).toDateString()
    return `From ${start} to ${end}`;
  }

  render() {
    const data = (this.props.selectedCoin && this.node) ? this.getData(this.props.selectedCoin.Data) : false;
    const time = this.props.selectedCoin ? this.getTime(this.props.selectedCoin) : false;
    return (
      <Container>
        <Row>
          <Button onClick={() => this.props.changePage()}>Go to about page via redux</Button>
        </Row>
        <Row>
          <Col md='3' xs='12'>
            {time}
          </Col>
          <Col md='9' xs='12'>
            <svg ref={node => this.node = node}
              width={500} height={500}  >
            </svg>
          </Col>
        </Row>

      </Container>
    );
  }
}

const mapStateToProps = state => ({
  selectedCoin: state.cryptoApi.selectedCoin
})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/details')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
