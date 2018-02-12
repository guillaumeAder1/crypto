import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getNews } from '../../modules/cryptoApi';
import Article from './article'
import { Container, Row, Col } from 'reactstrap';



class News extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: false
        }
    }
    componentWillMount() {
        console.log('componentWillMount')

    }
    componentDidMount() {
        console.log('componentDidMount')
        const data = this.props.getNews();

    }
    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', nextProps)
        this.setState({
            articles: nextProps.news
        })
    }
    shouldComponentUpdate(props, state) {
        /**
         * warining, needs to return true otherwise will not re-render and create issue
         */
        console.log('shouldComponentUpdate', props, state)
        return true
    }
    componentWillUpdate() {
        console.log('componentWillUpdate')
    }
    componentDidUpdate() {
        console.log('componentDidUpdate')
    }
    componentWillUnmount() {
        console.log('componentWillUnmount')
    }
    render() {
        console.log('Render', this.state)
        const hasData = this.state.articles;
        const list = (hasData) ? this.state.articles.map((d, i) => { return <Article key={i} data={d} /> }) : false;
        return (
            <Container>
                <h1>NEWS</h1>
                {list}
            </Container>
        );
    }
}


const mapStateToProps = state => ({
    news: state.cryptoApi.news
})

const mapDispatchToProps = dispatch => bindActionCreators({
    getNews
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(News)
