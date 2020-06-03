import React from 'react';

import './navigation-panel.css'
import NavigationItem from '../navigation-item';

/*const pagesList = [
    { label: 'About' , location:'' },
    { label: 'Lobby' , location:''  },
    { label: 'Leaderboard' , location:''  },
    { label: 'Feedback' , location:''  },
    { label: 'Sign In' , location:'/signin' , altlabel: 'Sign Out' }
]*/

const NavigationPanel = () => {
    return (
        <div className="navigation-panel">
            <table className="nav-items-table">
                <tr>
                    <td className="nav-item-cell">
                        <NavigationItem label ="About"></NavigationItem>
                    </td>
                    <td className="nav-item-cell">
                        <NavigationItem label ="Lobby"></NavigationItem>
                    </td>
                    <td className="nav-item-cell">
                        <NavigationItem label ="Leaderboard"></NavigationItem>
                    </td>
                    <td className="nav-item-cell">
                        <NavigationItem label ="Feedback"></NavigationItem>
                    </td>
                    <td className="nav-item-cell">
                        <NavigationItem label ="Sign in" href="/signin"></NavigationItem>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default NavigationPanel;