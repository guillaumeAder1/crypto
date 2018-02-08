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
        this.formatData = this.formatData.bind(this)

    }
    /**
     * get max value Domain for the currency type
     */
    getMaxDomain() {
        return d3.max(this.props.data, (d) => {
            const key = Object.keys(d);
            return d[key][this.state.currencyType]
        });
    }

    formatData(data) {
        return data.map(d => {
            const t = Object.keys(d);
            return {
                val: d[t][this.state.currencyType],
                name: t[0]
            }
        }, this)
    }
    componentDidMount() {
        this.xWidth = this.node.clientWidth;
        this.stepX = this.xWidth / this.props.data.length;
        this.margin = 25;
        // this.radius = (this.stepX / 2) * 0.5;
        this.radius = 15;
        this.stage = d3.select(this.node).append('g');



        const domainMax = this.getMaxDomain()
        const yScale = d3.scaleLinear()
            .domain([domainMax, 0])
            //.range([0, 200]);
            .range([this.margin, this.props.height - this.margin]);
        const type = this.state.currencyType;

        const _data = this.formatData(this.props.data);
        const tooltip = d3.select("body")
            .append("div")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden")
            .style("background", "#000")
            .text("a simple tooltip");

        const xScale = d3.scaleBand().rangeRound([0, this.xWidth]);
        xScale.domain(_data.map(d => d.name));
        const xAxis = d3.select('#container').append('svg').style('width', this.xWidth).append('g')
            // .attr("transform", "translate(" + (this.xWidth - this.margin) + ", " + (this.props.height) + ")")
            .attr("transform", "translate(0,0)")
            .call(d3.axisBottom(xScale));


        // const tool_tip = d3.tip()
        //     .attr("class", "d3-tip")
        //     .offset([-8, 0])
        //     .html(function (d) { return "Radius: " + d.val; });
        //d3.select(this.node).call(tool_tip);
        this.stage.selectAll('circle').data(_data).enter().append('circle')
            .attr('cx', (d, i) => {
                return (i * this.stepX) + (this.stepX / 2)
            })
            .attr('cy', d => yScale(d.val))
            .attr('r', this.radius)
            .style('fill', (d, i) => {
                return this.colors[i]
            })
            .style('stroke', 'grey')
            .style('opacity', 0.9)
            .on('mouseover', d => { console.log(d.val) })
    }
    render() {
        return (
            <div>
                <h6>
                    chart price
                </h6>
                <hr />
                <div id='container'>
                    <svg ref={node => this.node = node}
                        width="100%"
                        height={this.props.height} >
                    </svg>
                </div>
            </div>
        );
    }
}


export default PriceChart;