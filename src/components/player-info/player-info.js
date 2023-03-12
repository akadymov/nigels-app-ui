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
            <div className="player-info" myInfo={this.props.myInfo}>
                <div className="player-info-container" active={this.props.active ? 'true' : 'false'}>
                    <div className="player-name">{this.props.username}</div>
                    <div className="player-bet-size" active={this.props.active ? 'true' : 'false'}>
                        <p className="player-prop-header">
                            Bet size
                        </p>
                        <p className="player-prop-value">
                            {this.props.betSize}
                        </p>
                    </div>
                    <div className="player-took-bets" active={this.props.active ? 'true' : 'false'}>
                        <p className="player-prop-header">
                            Took turns
                        </p>
                        <p className="player-prop-value">
                            {this.props.tookTurns}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}