import React from 'react'
import { Container, Row, Col, Media, Button } from 'reactstrap';


class Article extends React.Component {
    constructor() {
        super()
        this.seeArticle = this.seeArticle.bind(this)
    }
    seeArticle() {
        window.open(this.props.data.url, '_blank')
    }
    render() {
        console.log('article Render ', this.props)
        return (
            <Row>
                <Col>
                    <Media className='padding'>
                        <Media left href="#">
                            <img src={this.props.data.imageurl} width='100px' height='100px' />
                        </Media>
                        <Media body className='paddingleft'>
                            <Media heading>{this.props.data.title}</Media>
                            <p>
                                {this.props.data.body}
                            </p>
                            <Button onClick={this.seeArticle}>Read Article</Button>
                        </Media>

                    </Media>
                </Col>
            </Row>
        );
    }
}

export default Article;