import React from 'react';

import './open-card.css'

export default class OpenCard extends React.Component{

    constructor(props) {
        super(props);
        this.state = {}
    }
    
    render() {
        return (
            <div 
                className="open-card" 
                cardId={this.props.cardId} 
                style={{
                    zindex: this.props.index, 
                    left: this.props.index*22, 
                    top: -this.props.index*100
                }}
            ></div>
        )
    }
}
