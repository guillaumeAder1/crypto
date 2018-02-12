import React from 'react'


class Article extends React.Component {

    render() {
        console.log('article Render ', this.props)
        return (
            <div>
                <h5>{this.props.data.title}</h5>
                <p>{this.props.data.body}</p>
            </div>
        );
    }
}

export default Article;