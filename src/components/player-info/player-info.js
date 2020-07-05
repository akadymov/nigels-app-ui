import React from 'react';

import './player-info.css';

export default class PlayerInfo extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return(
            <div className="player-info">
                <div className="player-info-container" style={{top: this.props.myInfo ? 30 : 0}} active={this.props.active}>
                    <div className="player-name">{this.props.username}</div>
                    <div className="player-bet-size" active={this.props.active}>
                        <p className="player-prop-header">
                            Bet size
                        </p>
                        <p className="player-prop-value">
                            {this.props.betSize}
                        </p>
                    </div>
                    <div className="player-took-bets" active={this.props.active}>
                        <p className="player-prop-header">
                            Took bets
                        </p>
                        <p className="player-prop-value">
                            {this.props.tookBets}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}