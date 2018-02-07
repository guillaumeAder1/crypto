import React from 'react'
import * as d3 from 'd3'
// import { scaleLinear } from 'd3-scale';
// import { max } from 'd3-array';
// import { select } from 'd3-selection';
// import { line } from 'd3-shape'
import { Container, Row, Col, ButtonGroup, Button } from 'reactstrap'

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
     * get SVG and draw for each selected COINS
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

        // get axis value based on [0]
        this.drawAxis(this.props.data[0]);
    }
    drawAxis(data) {
        const _xWidth = this.node.clientWidth
        const _margin = 25
        // const parseDate = d3.timeParse("%d-%b-%y");

        // Y AXIS left
        const _maxY = d3.max(data.Data, d => d.high);
        const _yScale = d3.scaleLinear()
            .domain([0, _maxY])
            .range([0, this.props.height - (_margin * 2)]);
        const _yAxis = d3.select(this.node).append('g')
            .attr("transform", "translate(" + _margin + ",  " + _margin + ")")
            .call(d3.axisLeft(_yScale).ticks(3));

        // X AXIS bottom
        const _maxX = d3.max(data.Data, d => d.time * 1000);
        const _minX = d3.min(data.Data, d => d.time * 1000);
        const _xScale = d3.scaleLinear()
            .domain([_minX, _maxX])
            .range([_margin, _xWidth]);
        const _xAxis = d3.select(this.node).append('g')
            .attr("transform", "translate( 0," + (this.props.height - _margin) + ")")
            .call(d3.axisBottom(_xScale).tickFormat(d3.timeFormat("%d-%m-%Y")));
    }

    doTheLine(d) {
        return d3.line()
            .x(d => this.xScale(d.x))
            .y(d => this.yScale(d.y))
            .curve(d3.curveBasis)
    }
    /**
     * draw for each COIN results from list
     */
    draw(data, color) {
        const stepX = this.node.clientWidth / data.Data.length
        const xWidth = this.node.clientWidth
        const margin = 25;
        const r = stepX / 2;
        const d = data.Data.map(d => {
            return { time: d.time * 1000, val: d.high }
        })
        const maxY = d3.max(d, d => d.val);
        const yScale = d3.scaleLinear()
            .domain([0, maxY])
            .range([0, this.props.height]);

        if (this.props.type === 'line') {
            const d = data.Data.map((d, i) => {
                return {
                    x: d.time * 1000,
                    y: d.high,
                }
            })
            const maxY = d3.max(d, d => d.y);
            const maxX = d3.max(d, d => d.x);
            const minX = d3.min(d, d => d.x);

            this.yScale = d3.scaleLinear()
                .domain([0, maxY])
                .range([0, this.props.height - (margin * 2)]);

            this.xScale = d3.scaleLinear()
                .domain([minX, maxX])
                .range([margin, xWidth]);

            // const xAxis = d3.select(this.node).append('g')
            //     .attr("transform", "translate( 0," + (this.props.height - margin) + ")")
            //     .call(d3.axisBottom(this.xScale));

            // const yAxis = d3.select(this.node).append('g')
            //     .attr("transform", "translate(" + margin + ",0)")
            //     .call(d3.axisLeft(this.yScale).ticks(5))

            const doLine = this.doTheLine(d)

            d3.select(this.node).append('g').attr('id', data.COIN + color).attr('class', 'curve')
                .append('svg:path')
                .attr('d', doLine(d))
                .style("stroke-width", 2)
                .style("stroke", color)
                .style("fill", "none").on('mouseover', (d, i, p) => {
                    d3.select(p[i]).style('stroke-width', 4)
                }).on('mouseout', (d, i, p) => {
                    d3.select(p[i]).style('stroke-width', 2)
                });
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

    changeData(type) {
        const _xWidth2 = this.node.clientWidth
        const _margin2 = 25;
        const svg = d3.select(this.node).transition();
        const list = svg.selectAll("g.curve");

        this.props.data.forEach((e, i) => {
            const _newdata = e.Data.map(d => {
                return {
                    x: d.time * 1000,
                    y: d[type]
                }
            });
            const _maxY2 = d3.max(_newdata, d => d.y);
            const _maxX2 = d3.max(_newdata, d => d.x);
            const _minX2 = d3.min(_newdata, d => d.x);
            const _yScale2 = d3.scaleLinear()
                .domain([0, _maxY2])
                .range([0, this.props.height - (_margin2 * 2)]);

            const _xScale2 = d3.scaleLinear()
                .domain([_minX2, _maxX2])
                .range([_margin2, _xWidth2]);

            const _doLine2 = d3.line()
                .x(d => _xScale2(d.x))
                .y(d => _yScale2(d.y))
                .curve(d3.curveBasis)

            list.filter((el, index) => i === index).select('path')   // select correct line // need to double check
                .duration(750)
                .attr("d", _doLine2(_newdata));
        });
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

                        <ButtonGroup>
                            <Button size="sm" outline onClick={() => this.changeData('open')} >Open</Button>
                            <Button size="sm" outline onClick={() => this.changeData('low')} >Low</Button>
                            <Button size="sm" outline onClick={() => this.changeData('high')} >High</Button>
                            <Button size="sm" outline onClick={() => this.changeData('close')} >Close</Button>
                        </ButtonGroup>

                    </Col>
                    <Col xs='10'>
                        <svg ref={node => this.node = node}
                            width="100%" height={this.props.height}  >
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
// line transition
// http://bl.ocks.org/d3noob/7030f35b72de721622b8

// brush 
//https://bl.ocks.org/mbostock/34f08d5e11952a80609169b7917d4172