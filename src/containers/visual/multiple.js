import React from 'react'
import * as d3 from 'd3'
// import { scaleLinear } from 'd3-scale';
// import { max } from 'd3-array';
// import { select } from 'd3-selection';
// import { line } from 'd3-shape'
import { Container, Row, Col } from 'reactstrap'

class Multiple extends React.Component {
    constructor() {
        super()
        this.colors = ['#33ccff', '#ff6633', '#ff33ff', '#ff9933', '#9933ff', '#ffff33',
            '#99ff33', '#ff3333', '#33ff66', '#ff3333', '#33ffff', '#3366ff',
            '#cc33ff', '#6633ff', '#ff3399']
        this.state = {
            list: null,
            colors: null
        }
    }
    createColors(nbr) {
        // let listColors =[]
        // for (let i = 0; i < nbr ; i ++){
        //     listColors.push()
        // }
        // this.setState({
        //     colors: this.get
        // })
    }
    // getRandomInt(min, max) {
    //     return Math.floor(Math.random() * (max - min + 1)) + min;
    // }
    componentDidMount() {
        // this.createColors(this.props.data.length)
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
            const maxY = d3.max(d, d => d.y);
            const maxX = d3.max(d, d => d.x);
            const minX = d3.min(d, d => d.x);

            const yScale = d3.scaleLinear()
                .domain([0, maxY])
                .range([0, 500]);

            const xScale = d3.scaleLinear()
                .domain([minX, maxX])
                .range([0, 500]);

            const xAxis = d3.select(this.node).append('g')
                .attr("transform", "translate(0," + 500 + ")")
                .call(d3.axisBottom(xScale));


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

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        d3.select(this.node).selectAll('g').remove()
        this.initDraw()
    }
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col xs='2'>
                        <p>Multiple visualization</p>
                        <p>{this.state.list}</p>
                    </Col>
                    <Col xs='10'>
                        <svg ref={node => this.node = node}
                            width={550} height={550}  >
                        </svg>

                        {/* <svg ref={node => this.node = node}
                            width="100%" height="100%"  >
                        </svg> */}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Multiple;