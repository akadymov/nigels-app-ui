import React from 'react';

import './navigation-item.css'

const NavigationItem = ({label, href}) => {
    return <div className="navigation-item" href={href}>{label}</div>
}

export default NavigationItem;
