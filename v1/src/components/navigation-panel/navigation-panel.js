import React from 'react';

import './navigation-panel.css'
import NavigationItem from '../navigation-item';
import Cookies from 'universal-cookie';


export default class NavigationPanel extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            pagesList : [
                { id: 'About', label: 'About' , location: null },
                { id: 'Lobby', label: 'Lobby' , location: '/lobby'  },
                { id: 'Leaderboard', label: 'Leaderboard' , location: null  },
                { id: 'Feedback', label: 'Feedback' , location: null  },
                { id: 'Sign In', label: 'Sign In' , location:'/signin'}
            ]
        }
    }

    Cookies = new Cookies()

    UpdateSignInLabel = () => {
        var signinIndex = this.state.pagesList.findIndex(element => element.id === 'Sign In' )
        const idToken = this.Cookies.get('idToken')
        var newPagesList = this.state.pagesList
        if(idToken) {
            newPagesList[signinIndex] = {...newPagesList[signinIndex], label: 'Sign Out'}
            newPagesList[signinIndex] = {...newPagesList[signinIndex], location: '/signout'}
        } else {
            newPagesList[signinIndex] = {...newPagesList[signinIndex], label: 'Sign In'}
            newPagesList[signinIndex] = {...newPagesList[signinIndex], location: '/signin'}
        }
        this.setState ({pagesList: newPagesList})
    }
    
    componentWillMount = () => {
        this.UpdateSignInLabel();
      }

    render() {

        return (
            <div className="navigation-panel">
                <table className="nav-items-table">
                    <tbody>
                        <tr>
                        {this.state.pagesList.map(page => {
                            return <td className="nav-item-cell">
                            <NavigationItem 
                                id = {page.id}
                                label = {page.label}
                                location = {page.location}
                            ></NavigationItem>
                        </td>
                        })}
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}