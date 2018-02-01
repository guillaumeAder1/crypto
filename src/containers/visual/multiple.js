import React from 'react'
import * as d3 from 'd3'
// import { scaleLinear } from 'd3-scale';
// import { max } from 'd3-array';
// import { select } from 'd3-selection';
// import { line } from 'd3-shape'

class Multiple extends React.Component {
    constructor() {
        super()
        this.colors = ['red', 'blue', 'yellow', 'green']
        this.state = {
            list: null
        }
    }

    componentDidMount() {
        const list = this.props.data.map((e, i) => {
            const css = {
                backgroundColor: this.colors[i]
            }
            return <div>
                <span className="legende" style={css}></span>
                <span>{e.COIN}</span>
            </div>
        }) || false;
        if (list.length) {
            this.setState({
                list: list
            })
            this.initDraw();
        }
    }
    /**
     * get SVG
     */
    initDraw() {
        const node = this.node ? this.node : false;
        if (!node) {
            return
        }
        const xlength = node.clientWidth;
        const ylength = node.clientHeight;
        this.props.data.forEach((element, i) => {
            this.draw(element, this.colors[i])
        });
    }
    /**
     * draw for each COIN results from list
     */
    draw(data, color) {
        console.log(arguments)
        const stepX = this.node.clientWidth / data.Data.length
        const r = stepX / 2;
        const d = data.Data.map(d => {
            return { time: d.time, val: d.high }
        })
        const maxY = d3.max(d, d => d.val);
        const yScale = d3.scaleLinear()
            .domain([0, maxY])
            .range([0, 500]);

        if (this.props.type === 'line') {
            const d = data.Data.map((d, i) => {
                return {
                    x: d.time,
                    y: d.high,
                }
            })
            console.log(d)
            const maxY = d3.max(d, d => d.y);
            const maxX = d3.max(d, d => d.x);
            const minX = d3.min(d, d => d.x);

            const yScale = d3.scaleLinear()
                .domain([0, maxY])
                .range([0, 500]);

            const xScale = d3.scaleLinear()
                .domain([minX, maxX])
                .range([0, 500]);

            const doLine = d3.line()
                .x(d => xScale(d.x))
                .y(d => yScale(d.y))
                .curve(d3.curveBasis)

            d3.select(this.node).append('g').attr('id', color + data.COIN)
                .append('svg:path')
                .attr('d', doLine(d))
                .style("stroke-width", 2)
                .style("stroke", color)
                .style("fill", "none");
        } else {
            const d = data.Data.map(d => {
                return { time: d.time, val: d.high }
            })
            const maxY = d3.max(d, d => d.val);
            const yScale = d3.scaleLinear()
                .domain([0, maxY])
                .range([0, 500]);
            d3.select(this.node).append('g').attr('id', color).selectAll('circle')
                .data(d)
                .enter()
                .append('circle')
                .attr('cx', (d, i) => i * stepX)
                .attr('cy', d => yScale(d.val))
                .attr('r', 5)
                .style('fill', color)
        }


    }
    render() {
        return (
            <div>
                <p>Multiple visualization</p>
                <p>{this.state.list}</p>

                <svg ref={node => this.node = node}
                    width={500} height={500}  >
                </svg>
            </div>
        );
    }
}

export default Multiple;