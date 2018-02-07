import React from 'react'
import { Button } from 'reactstrap';


class Gridrow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdded: this.props.isAdded
        };
    }

    toggleWatched() {
        const currentState = this.state.isAdded;
        this.setState({ isAdded: !currentState });
        this.props.addToWatched()
    }
    render() {
        return (

            <tr key={this.props.key} onClick={() => this.toggleWatched()} className={this.state.isAdded ? 'iswatched' : null}>
                <th scope="row">{this.props.data.Id}</th>
                <td>{this.props.data.CoinName.toUpperCase()}</td>
                <td>{this.props.data.Name}</td>
                <td>{this.props.data.Algorithm}</td>
                <td><Button color="success" size="sm" onClick={() => this.props.isSelected()}>More...</Button></td>
                <td>
                    <img src={this.props.baseurl + this.props.data.ImageUrl + '?width=25'} />
                </td>
            </tr>

        );
    }
}

export default Gridrow