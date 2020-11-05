import React from 'react';

import './open-card.css';

export default class OpenCard extends React.Component{

    constructor(props) {
        super(props);
        this.state = {}
    }
    
    render() {

        if(this.props.cardOnTable==='1') {
            var zindex = 4-this.props.index
            if(this.props.index === 1){
                var leftShift = -70
                var topShift = -400
            } else if(this.props.index === 2){
                var leftShift = 40
                var topShift = -230
            } else if(this.props.index === 3){
                var leftShift = 130
                var topShift = -400
            }else if(this.props.index === 4){
                var leftShift = 97
                var topShift = 240
            }
        } else {
            var zindex = this.props.index
            var leftShift = this.props.index * 22
            if(this.props.selectedCard === this.props.cardId.substring(5)){
                var topShift = -this.props.index * 100 - 38
            } else {
                var topShift = -this.props.index * 100
            }
            
        }

        return (
            <div 
                className="open-card" 
                onClick={this.props.onClick}
                cardId={this.props.cardId}
                index={this.props.index}
                selectedCard={this.props.selectedCard}
                cardOnTable={this.props.cardOnTable}
                style={{
                    zIndex: zindex, 
                    //left: this.props.cardOnTable ? leftShift : this.props.index*22, 
                    //top:  this.props.cardOnTable ? topShift : (-this.props.index*100 - 38 * (this.props.selectedCard === this.props.cardId.substring(5) ? 1 : 0))
                    left: leftShift,
                    top: topShift
                }}
            ></div>
        )
    }
}
