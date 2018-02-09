import React from 'react'

class Slider extends React.Component {

    render() {

        console.log("slider.js render() :: ")


        const ticks = new Array(this.props.nbrSteps).fill({});
        const step = Math.round(100 / (this.props.nbrSteps - 1));
        const options = ticks.map((d, i) => <option value={step * i} label={i + "%"} />)
        const datalist = <datalist id="tickmarks">{options}</datalist>
        const formatedDate = new Date(this.props.dates[0])
        return (
            <div>
                <h6>{formatedDate.toDateString()}</h6>
                <input type="range" list="tickmarks"
                    step={step}
                    className="input-range-custom"
                    defaultValue='100'
                    onChange={e => console.log(e.target.value)}
                //min='0' max='100'
                />
                {datalist}
                {/* <datalist id="tickmarks"> */}
                {/* {options} */}
                {/* <option value="0" label="0%" />
                    <option value="10" />
                    <option value="20" />
                    <option value="30" />
                    <option value="40" />
                    <option value="50" label="50%" />
                    <option value="60" />
                    <option value="70" />
                    <option value="80" />
                    <option value="90" />
                    <option value="100" label="100%" /> */}
                {/* </datalist> */}
            </div>
        );

    }
}

export default Slider;