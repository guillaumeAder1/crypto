import React from 'react'

class Slider extends React.Component {
    constructor(props) {
        super(props)
        this.updateSlider = this.updateSlider.bind(this);
        this.state = {
            date: this.props.dates[this.props.nbrSteps - 1]
        }
    }
    componentWillMount() {
        console.log('slider.js componentWillMount')
        // this.setState({
        //     date: this.props.dates[this.props.nbrSteps]
        // })
    }
    componentWillReceiveProps(nextProps) {
        // this.setState({
        //     date: this.props.dates[this.props.nbrSteps]
        // })
    }
    updateSlider(value) {
        const index = Math.round(value / (Math.round(100 / (this.props.nbrSteps - 1))));
        this.props.onUpdate(index);
        this.setState({
            date: this.props.dates[index]
        })
    }

    render() {

        console.log("slider.js render() :: ")


        const ticks = new Array(this.props.nbrSteps).fill({});
        const step = Math.round(100 / (this.props.nbrSteps - 1));
        const options = ticks.map((d, i) => <option key={i} value={step * i} label={i + "%"} />)
        const datalist = <datalist id="tickmarks">{options}</datalist>
        const formatedDate = new Date(this.state.date * 1000);

        return (
            <div>
                <h6>{formatedDate.toDateString()}</h6>
                <input type="range" list="tickmarks"
                    step={step}
                    className="input-range-custom"
                    defaultValue='100'
                    onChange={e => this.updateSlider(e.target.value)}
                //min='0' max='100'
                />
                {datalist}

            </div>
        );

    }
}

export default Slider;