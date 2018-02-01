import React from 'react'
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';

class Multiple extends React.Component {
    constructor() {
        super()
        this.colors = ['red', 'blue', 'yellow', 'green']
        this.state = {
            list: null
        }
    }

    componentDidMount() {
        const list = this.props.data.map(e => e.COIN) || false;
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
        const maxY = max(d, d => d.val);
        const yScale = scaleLinear()
            .domain([0, maxY])
            .range([0, 500])
        select(this.node).append('g').attr('id', color).selectAll('circle')
            .data(d)
            .enter()
            .append('circle')
            .attr('cx', (d, i) => i * stepX)
            .attr('cy', d => yScale(d.val))
            .attr('r', 5)
            .style('fill', color)

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