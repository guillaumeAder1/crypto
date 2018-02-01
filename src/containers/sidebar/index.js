import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Container, Row, Col, Collapse, Badge } from 'reactstrap';



class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: true };
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    createList(list) {
        return list.map((d, i) => {
            return <ul key={i}>
                <li>{d.CoinName.toUpperCase()}</li>
            </ul>
        }, this);
    }
    render() {

        const list = this.props.watched ? this.createList(this.props.watched) : false;
        return (
            <Container id="sidebar" fluid>
                <Row className="box bottom">
                    <Col>Item 1</Col>
                </Row>
                <Row className="box bottom">
                    <div className="menu" md='12' xs='12' onClick={this.toggle}>Watched <Badge className="float-right" color="secondary">{this.props.watched.length}</Badge></div>
                    <Collapse className="btn-block" isOpen={this.state.collapse}>
                        {list}
                        {list.length > 1 ? <Button block outline size="sm" color="secondary" >Compare</Button> : null}
                    </Collapse>
                </Row>
                <Row className="box bottom">
                    <Col>Item 3</Col>
                </Row>
                <Row className="box bottom">
                    <Col>Item 4</Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    watched: state.userSettings.list
})

const mapDispatchToProps = dispatch => bindActionCreators({
    // changePage: () => push('/details')
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sidebar)
