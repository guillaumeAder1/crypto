import React from 'react'
import * as d3 from 'd3'
import { colors } from '../../utils/utils'
import Slider from './slider'

class PriceChart extends React.Component {
    constructor(props) {
        super(props)
        this.colors = colors;
        this.stage = null;
        this.state = {
            currencyType: 'EUR',
            timeIndex: 0
        }
        this.getMaxDomain = this.getMaxDomain.bind(this);
        this.formatData = this.formatData.bind(this);
        this.sliderChangeEvent = this.sliderChangeEvent.bind(this)
    }
    /**
     * get max value Domain for the currency type
     */
    getMaxDomain() {
        return d3.max(this.props.data[this.state.timeIndex], (d) => {
            const key = Object.keys(d);
            return d[key][this.state.currencyType]
        });
    }

    /**
     * Create slider to change time
     */


    formatData(data) {
        return data.map(d => {
            const t = Object.keys(d);
            return {
                val: d[t][this.state.currencyType],
                name: t[0]
            }
        }, this)
    }

    shouldComponentUpdate(props, state) {
        // console.log(props, state);
        console.log("chart.js shouldComponentUpdate() :: ")

        return true
    }
    componentWillReceiveProps(nextProps) {
        d3.select(this.node).selectAll('g').remove()
        if (this.xAxis) { this.xAxis.remove() }
        console.log("chart.js componentWillReceiveProps() :: ")
    }
    componentDidUpdate() {
        this.draw()

    }

    draw() {
        this.xWidth = this.node.clientWidth;
        this.stepX = this.xWidth / this.props.data[this.state.timeIndex].length;
        this.margin = 25;
        // this.radius = (this.stepX / 2) * 0.5;
        this.radius = 15;
        this.stage = d3.select(this.node).append('g');
        const domainMax = this.getMaxDomain()
        const yScale = d3.scaleLinear()
            .domain([domainMax, 0])
            .range([this.margin, this.props.height - this.margin]);
        const type = this.state.currencyType;
        const _data = this.formatData(this.props.data[this.state.timeIndex]);
        const tooltip = d3.select("body")
            .append("div")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden")
            .style("background", "#000")
            .text("a simple tooltip");

        const xScale = d3.scaleBand().rangeRound([0, this.xWidth - 1]);
        xScale.domain(_data.map(d => d.name));
        this.xAxis = d3.select('#containerUI').append('svg').attr('id', 'xaxis')
        this.xAxis.style('width', this.xWidth).style('height', 50).append('g')
            .attr("transform", "translate(0,0)")
            .call(d3.axisBottom(xScale));

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
    componentDidMount() {
        // this.draw()
        console.log("chart.js componentDidMount() :: ")


        // this.xWidth = this.node.clientWidth;
        // this.stepX = this.xWidth / this.props.data[this.state.timeIndex].length;
        // this.margin = 25;
        // // this.radius = (this.stepX / 2) * 0.5;
        // this.radius = 15;
        // this.stage = d3.select(this.node).append('g');
        // const domainMax = this.getMaxDomain()
        // const yScale = d3.scaleLinear()
        //     .domain([domainMax, 0])
        //     .range([this.margin, this.props.height - this.margin]);
        // const type = this.state.currencyType;
        // const _data = this.formatData(this.props.data[this.state.timeIndex]);
        // const tooltip = d3.select("body")
        //     .append("div")
        //     .style("position", "absolute")
        //     .style("z-index", "10")
        //     .style("visibility", "hidden")
        //     .style("background", "#000")
        //     .text("a simple tooltip");

        // const xScale = d3.scaleBand().rangeRound([0, this.xWidth - 1]);
        // xScale.domain(_data.map(d => d.name));
        // const xAxis = d3.select('#containerUI').append('svg').style('width', this.xWidth).style('height', 50).append('g')
        //     .attr("transform", "translate(0,0)")
        //     .call(d3.axisBottom(xScale));

        // this.stage.selectAll('circle').data(_data).enter().append('circle')
        //     .attr('cx', (d, i) => {
        //         return (i * this.stepX) + (this.stepX / 2)
        //     })
        //     .attr('cy', d => yScale(d.val))
        //     .attr('r', this.radius)
        //     .style('fill', (d, i) => {
        //         return this.colors[i]
        //     })
        //     .style('stroke', 'grey')
        //     .style('opacity', 0.9)
        //     .on('mouseover', d => { console.log(d.val) })
    }
    sliderChangeEvent(index) {
        console.log(index)
        this.setState({
            timeIndex: index
        })

    }
    render() {
        console.log("chart.js render() :: ");
        return (
            <div>
                <h6>
                    chart price
                </h6>
                <hr />
                <div id='containerUI'>
                    <svg ref={node => this.node = node}
                        width="100%"
                        height={this.props.height} >
                    </svg>
                </div>

                {this.props.dates ? <Slider onUpdate={this.sliderChangeEvent} nbrSteps={this.props.data.length} dates={this.props.dates} /> : false}
            </div>
        );
    }
}


export default PriceChart;