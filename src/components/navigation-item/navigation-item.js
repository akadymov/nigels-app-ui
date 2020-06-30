import React from 'react';

import './navigation-item.css'

export default class NavigationItem extends React.Component{

    render() {
        return (
            <div className="navigation-item">
                <a className="navigation-href" href={this.props.href}>{this.props.label}</a>
            </div>
        );
    }
    
}
