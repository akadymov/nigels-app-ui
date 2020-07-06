import React from 'react';

import './game.css'
import Cookies from 'universal-cookie';
import NaegelsApi from '../../services/naegels-api-service';

import OpenCard from '../open-card';
import ClosedCards from '../closed-cards';
import FormButton from '../form-button';
import ActiveFrame from '../active-frame';
import InfoPopup from '../info-popup';
import PlayerInfo from '../player-info';
import BetSizePopup from '../betsize-popup';

export default class Game extends React.Component{

    constructor(props) {
        super(props);
        this.handleBetChange = this.handleBetChange.bind(this);
        this.state = {
            gameDetails: {
                players:[],
                canDeal: false,
                startedHands: []
            },
            cardsInHand: [],
            myInhandInfo: {
                username: null,
                betSize: null,
                tookBets: null,
                cardsOnHand: null,
                actionMessage: ''
            },
            myPosition: 0,
            startedHands:[],
            popupError: '',
            confirmAction: '',
            confirmActionMsg: '',
            myBetSizeValue: 0,
            handDetails: {
                players: [],
                nextActingPlayer: ''
            }
        }
    };

    Cookies = new Cookies();
    NaegelsApi = new NaegelsApi();

    CheckIfAlreadyLoggedIn = () => {
        const idToken = this.Cookies.get('idToken')
        if(!idToken) {
            window.location.replace('/signin/expired');
        }
    }

    GetGameStatus = () => {
        this.NaegelsApi.getGame(this.props.match.params.gameId)
        .then((body) => {
            if(body.errors) {
                this.setState({ popupError: body.errors[0].message })
            } else {
                this.setState({gameDetails: body})
                if(this.state.gameDetails.currentHandId) {
                    // get inhand players data
                    this.NaegelsApi.getHand(this.state.gameDetails.gameId, this.state.gameDetails.currentHandId)
                    .then((body) => {
                        if(body.errors) {
                            this.setState({ popupError: body.errors[0].message })
                        } else {
                            this.setState({handDetails: body})
                            var newGameDetails = this.state.gameDetails
                            newGameDetails.players.forEach(player => {
                                var handPlayerIndex = this.state.handDetails.players.findIndex(handPlayer => handPlayer.username === player.username)
                                var gamePlayerIndex = newGameDetails.players.findIndex(gamePlayer => gamePlayer.username === player.username)
                                newGameDetails.players[gamePlayerIndex].betSize = this.state.handDetails.players[handPlayerIndex].betSize
                                newGameDetails.players[gamePlayerIndex].tookBets = this.state.handDetails.players[handPlayerIndex].tookBets
                            });
                            const myIndex = this.state.handDetails.players.findIndex(handPlayer => handPlayer.username === this.Cookies.get('username'))
                            this.setState({myInhandInfo: this.state.handDetails.players[myIndex]})
                            this.setState({gameDetails: newGameDetails})
                        }
                    });

                    // get cards on my hand
                    var playerIndex = this.state.gameDetails.players.findIndex(element => element.username === this.Cookies.get('username') )
                    if(playerIndex>=0 && this.state.gameDetails.currentHandId){
                        this.NaegelsApi.getCards(this.Cookies.get('idToken'), this.state.gameDetails.gameId, this.state.gameDetails.currentHandId)
                        .then((body) => {
                            if(body.errors) {
                                this.setState({ popupError: body.errors[0].message })
                            } else {
                                this.setState({
                                    cardsInHand: body.cardsInHand,
                                    myPosition: body.myPosition
                                })
                            }
                        })
                    }
                }
            }
        });
    };

    dealCards = () => {
        this.NaegelsApi.dealCards(this.props.match.params.gameId, this.Cookies.get('idToken'))
        .then((body) => {
            if(body.errors) {
                this.setState({
                    popupError : body.errors[0].message
                })
            } else{
                this.GetGameStatus();
            }
        });
    };

    makeBet = () => {
        this.NaegelsApi.makeBet(this.Cookies.get('idToken'), this.state.gameDetails.gameId, this.state.gameDetails.currentHandId, this.state.myBetSizeValue)
        .then((body) => {
            if(body.errors) {
                this.setState({
                    popupError : body.errors[0].message
                })
            } else{
                this.GetGameStatus();
            }
        });
    };

    definePositions = () => {
        this.NaegelsApi.definePositions(this.props.match.params.gameId, this.Cookies.get('idToken'))
        .then((body) => {
            if(body.errors) {
                this.setState({ popupError: body.errors[0].message })
            } else {
                this.GetGameStatus();
            }
        });
    };

    handleBetChange(e) {
        this.setState({myBetSizeValue: e.target.value})
    };

    clearErrorMessage=(e) => {
        this.setState({popupError: ""});
        this.setState({confirmActionMsg: ""});
        this.setState({confirmAction: ""});
        this.GetGameStatus()
    }
    
    componentWillMount = () => {
        this.GetGameStatus();
      }

    render() {

        this.CheckIfAlreadyLoggedIn();
        return (
            <div>
                <ActiveFrame popupError={this.state.popupError} confirmActionMsg={this.state.confirmActionMsg}>
                    <div className="game-console">
                        <div className="game-console-header-div"><p className="game-console-header">Game Leaderboard</p></div>
                        <div className="game-console-button-div">
                        {this.state.gameDetails.positionsDefined ? 
                            <FormButton
                                type="submit-small"
                                value="Deal cards"
                                disabled={!this.state.gameDetails.canDeal}  
                                onClick={this.dealCards}
                            ></FormButton> 
                        :
                            <FormButton
                                type="submit-small"
                                value="Define positions"
                                onClick={this.definePositions}
                            ></FormButton>
                        }
                        </div>
                        <div className="game-leaderboard-container">
                            <table className="game-leaderboard-table">
                                <thead className="game-leaderboard-header">
                                    <tr className="game-leaderboard-row">
                                        <th className="game-leaderboard-cell"></th>
                                        {this.state.gameDetails.players.map(player => {return (
                                            <th className="game-leaderboard-cell">
                                                {player.username.substring(0,(player.username.length > 15 ? 12 : 15)) + (player.username.length > 15 ? '...' : '')}
                                            </th>
                                        )})}
                                    </tr>
                                </thead>
                                <tbody className="game-leaderboard-body">
                                    {this.state.gameDetails.startedHands.map(hand => {return (
                                        <tr className="game-leaderboard-row">
                                            <td className="game-leaderboard-cell">
                                                {hand.dealtCardsPerPlayer} {hand.trump}
                                            </td>
                                            {this.state.gameDetails.players.map(player => {
                                                return (
                                                    <td className="game-leaderboard-cell">
                                                        {player.username.substring(0,(player.username.length > 15 ? 12 : 15)) + (player.username.length > 15 ? '...' : '')}
                                                    </td>
                                                )
                                            })}
                                        </tr>   
                                    )})}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="game-table">
                        <div className="action-info">
                            <p className="action-info-message" error={this.state.popupError !== ''}>{this.state.handDetails.actionMessage}</p>
                        </div>
                        {this.state.handDetails.players.map(player => {
                            var position = player.position - this.state.myPosition
                            if (position <= 0){
                                position = position + this.state.gameDetails.players.length
                            }
                            if (player.username !== this.Cookies.get('username')) {
                                return (
                                    <div className="opponent-cards-div" position={'pos-' + position}>
                                    <ClosedCards cards={player.cardsOnHand}></ClosedCards>
                                    <PlayerInfo
                                        username={player.username}
                                        betSize={player.betSize ? player.betSize : null}
                                        tookBets={player.tookBets ? player.tookBets : null}
                                        active={this.state.handDetails.nextActingPlayer === player.username}
                                    ></PlayerInfo>
                                </div>
                                )
                            } else{
                                return('')
                            }
                        })}
                        <div className="my-cards-div" style={{left: -15}}>
                            {this.state.cardsInHand.map(card => {return(
                                <OpenCard cardId={'card-' + card} index={this.state.cardsInHand.findIndex( el => el === card )}></OpenCard>
                            )})}
                            <PlayerInfo
                                myInfo={true}
                                username={this.Cookies.get('username')}
                                betSize={this.state.myInhandInfo.betSize ? this.state.myInhandInfo.betSize : null}
                                tookBets={this.state.myInhandInfo.tookBets ? this.state.myInhandInfo.tookBets : null}
                                active={this.state.handDetails.nextActingPlayer === this.state.myInhandInfo.username ? 'true' : 'false'}
                            ></PlayerInfo>
                        </div>
                        {(this.state.handDetails.nextActingPlayer === this.Cookies.get('username') && !this.state.handDetails.betsAreMade) ? 
                            <BetSizePopup
                                onChange={this.handleBetChange}
                                onClick={this.clearErrorMessage}
                                value={this.state.myBetSizeValue}
                                errorMessage={this.state.popupError}
                                onSubmit={this.makeBet}
                            ></BetSizePopup>
                        : ''}
                    </div>
                </ActiveFrame>
                {this.state.popupError !== '' ? 
                    <InfoPopup
                        popupError={this.state.popupError}
                        clearErrorMessage={this.clearErrorMessage}
                    ></InfoPopup>
                : ''}
            </div>
            
        )
    }

}
