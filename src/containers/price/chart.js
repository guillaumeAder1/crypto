import React from 'react'
import * as d3 from 'd3'
import { colors } from '../../utils/utils'

class PriceChart extends React.Component {
    constructor(props) {
        super(props)
        this.colors = colors;
        this.stage = null;
        this.state = {
            currencyType: 'EUR'
        }
        this.getMaxDomain = this.getMaxDomain.bind(this);
    }

    getMaxDomain() {
        // order data to create scale and range
        this.props.data.forEach(element => {
            console.log(element)

        });
    }
    componentDidMount() {
        this.xWidth = this.node.clientWidth;
        this.stepX = this.xWidth / this.props.data.length;
        this.margin = 25;
        // this.radius = (this.stepX / 2) * 0.5;
        this.radius = 15;
        this.stage = d3.select(this.node).append('g');

        const domain = this.getMaxDomain()

        this.stage.selectAll('circle').data(this.props.data).enter().append('circle')
            .attr('cx', (d, i) => {
                return (i * this.stepX) + (this.stepX / 2)
            })
            .attr('cy', (d, i) => {
                // let key = Object.keys(d);
                // return d[key][this.state.currencyType]
                return 35
            })
            .attr('r', this.radius)
            .style('fill', (d, i) => {
                return this.colors[i]
            })
            .style('stroke', 'grey')
            .style('opacity', 0.9)
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