import React from 'react';

const InventoryBox = (props) => {
    const sourceList = props.cityData && [1,2,3,4,5,6,7,8]
        .map(i => props.cityData[("source" + i)])
        .filter(e => e);

    return (
        <div className="inventory-box uk-padding-small">
            <h5 className="uk-text-bold">
                {props.cityData ?
                props.cityData.city + ': ' + props.cityData.total + ' policy measure' + (props.cityData.total === 1 ? '':'s') : 
                'Choose a city from the map to see its anti-displacement policy measures'}
            </h5>
            <ul className="inventory-list uk-list uk-list-divider">
                {props.policyList.map(policy =>
                    <li key={policy.code} className="inventory-list-item">
                        <span className={(props.cityData && props.cityData[policy.code].slice(0,2).toUpperCase() !== 'NO') ? 'uk-text-bold' : ''}>
                            {policy.name} <a className="uk-text-secondary" href={('#' + policy.code)} >ⓘ</a>: {(props.cityData && props.cityData[policy.code])}
                        </span>
                    </li>
                )}
            </ul>
            <span className="inventory-sources"> 
                {sourceList && sourceList.map((url,i) =>
                    <span className="inventory-source-link" key={i + 1}>
                        {(i > 0) && ', '}
                        <a href={url} target="_blank" rel="noopener noreferrer">Source {i + 1}</a>
                    </span>
                )}
            </span>
        </div>
    );
}

export default InventoryBox; 
