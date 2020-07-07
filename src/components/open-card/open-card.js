import React from 'react';

import './open-card.css';

export default class OpenCard extends React.Component{

    constructor(props) {
        super(props);
        this.state = {}
    }
    
    render() {
        return (
            <div 
                className="open-card" 
                onClick={this.props.onClick}
                cardId={this.props.cardId}
                selectedCard={this.props.selectedCard}
                style={{
                    zindex: this.props.index, 
                    left: this.props.index*22, 
                    top: -this.props.index*100 - 38 * (this.props.selectedCard === this.props.cardId.substring(5) ? 1 : 0)
                }}
            ></div>
        )
    }
}
