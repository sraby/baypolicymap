import React from 'react';

const Legend = (props) => {
    return (
    <div className="uk-card uk-card-default uk-card-body uk-width-1-2@m uk-card-small map-legend">
        <h5>{props.policy}</h5>
        {props.policy === "Count of anti-displacement policies" ?
        <div>
            <div className="legend-items">
                <div className="legend-label">0</div>
                <div className="legend-label"></div>
                <div className="legend-label"></div>
                <div className="legend-label"></div>
                <div className="legend-label">14</div>
            </div>
            <div className="legend-items">
                <div className="legend-color gradient-1" />
                <div className="legend-color gradient-2" />
                <div className="legend-color gradient-3" />
                <div className="legend-color gradient-4" />
                <div className="legend-color gradient-5" />
            </div>
        </div> :
        <div>
            <div className="legend-items">
                <div className="legend-label large">No</div>
                <div className="legend-label large">Yes</div>
            </div>
            <div className="legend-items">
                <div className="legend-color large color-no" />
                <div className="legend-color large color-yes" />
            </div>
        </div> 
        }
    </div>);
}

export default Legend; 
