import React from 'react';
import ReactDOM from 'react-dom';
import { OrgUnitTree } from '@dhis2/d2-ui-org-unit-tree';
import { TreeView } from '@dhis2/d2-ui-core';
import SearchResultBoxComponent from './../../SearchResultBoxComponent';

class MultipleSelection extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            selected: [],
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event, orgUnit) {
        if (this.state.selected.includes(orgUnit.path)) {
            this.setState(state => {
                state.selected.splice(state.selected.indexOf(orgUnit.path), 1);
                return { selected: state.selected };
            });
            ReactDOM.render(<SearchResultBoxComponent orgUnitSelectedData={this.state.selected} />, document.getElementById('searchResult'));

        } else {
            this.setState(state => {
                state.selected.push(orgUnit.path);
                return { selected: state.selected };
            });
            ReactDOM.render(<SearchResultBoxComponent orgUnitSelectedData={this.state.selected} />, document.getElementById('searchResult'));
        }
    }

    render() {
        const selStyle = {
            borderTop: '1px solid #eeeeee',
            margin: '16px -16px 0',
            padding: '16px 16px 0',
        };
        
        return (
            <div>
                <OrgUnitTree
                    root={this.props.root}
                    onSelectClick={this.handleClick}
                    selected={this.state.selected}
                />
            </div>
        );
    }
}

export default MultipleSelection;
