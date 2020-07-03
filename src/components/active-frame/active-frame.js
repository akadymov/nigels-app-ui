import React from 'react';

import './active-frame.css'

export default class ActiveFrame extends React.Component{

    constructor(props) {
        super(props);
    };
    
    render() {
        return (
            <div className="active-frame" popupError={this.props.popupError} confirmActionMsg={this.props.confirmActionMsg}>
                {this.props.children}
            </div>
        )
    }
}
