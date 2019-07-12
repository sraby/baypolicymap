import React from 'react';

class InventoryBox extends React.Component { 

    componentDidUpdate() {
        document.querySelector('.inventory-box').scrollTop = 0;
    }

    render() {
        const sourceList = this.props.cityData && [1,2,3,4,5,6,7,8]
            .map(i => this.props.cityData[("source" + i)])
            .filter(e => e);

        return (
            <div className="inventory-box uk-padding-small">
                <h5 className="uk-text-bold">
                    {this.props.cityData ?
                    this.props.cityData.city + ': ' + this.props.cityData.total + ' policy measure' + (this.props.cityData.total === 1 ? '':'s') : 
                    'Choose a city from the map to see its anti-displacement policy measures'}
                </h5>
                <ul className="inventory-list uk-list uk-list-divider">
                    {this.props.policyList.map(policy => {
                        const policyIsActive = (this.props.cityData && this.props.cityData[policy.code].slice(0,2).toUpperCase() !== 'NO');
                        return (<li key={policy.code} className="inventory-list-item">
                            <span className={policyIsActive ? 'highlighted-policy' : ''}>
                                {policyIsActive && "✓ "}{policy.name} <a className="uk-text-secondary" href={('#' + policy.code)} >ⓘ</a>: </span>
                                {(this.props.cityData && this.props.cityData[policy.code])}
                             </li>)
                        }
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
}

export default InventoryBox; 
