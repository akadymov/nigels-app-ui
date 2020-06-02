import React from 'react';

import './navigation-panel.css'
import NavigationItem from '../navigation-item';

const pagesList = [
    { label: 'About' },
    { label: 'Lobby' },
    { label: 'Leaderboard' },
    { label: 'Feedback' },
    { label: 'Sign In', altlabel: 'Sign Out' }
]

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
                        <NavigationItem label ="Sign In"></NavigationItem>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default NavigationPanel;