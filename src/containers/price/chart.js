import React from 'react'
import * as d3 from 'd3'
import { colors } from '../../utils/utils'

class PriceChart extends React.Component {
    constructor() {
        super()
        this.colors = colors;
        this.stage = null;
    }
    componentDidMount() {
        this.xWidth = this.node.clientWidth;
        this.margin = 25;
        this.stage = d3.select(this.node).append('g');
        this.stage.selectAll('circle').data(this.props.data).enter().append('circle')
            .attr('cx', (d, i) => {
                let key = Object.keys(d)
                console.log(d, i, key)
            })
            .attr('cy', 50)
            .attr('r', 50)
    }
    render() {
        return (
            <div>
                <h6>
                    chart price
                </h6>
                <hr />
                <svg ref={node => this.node = node}
                    width="100%" height={this.props.height}  >
                </svg>
            </div>
        );
    }
}


export default PriceChart;