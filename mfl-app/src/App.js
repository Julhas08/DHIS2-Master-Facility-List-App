import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './App.css';
import Tables from './components/d2-ui/table';
import TextField from './components/d2-ui/text-field';
import HeaderBar from './components/d2-ui/header-bar';
import D2UIApp from '@dhis2/d2-ui-app';

/**
* @description
* OrgUnitTree, TopHeader bar components of d2-ui
*/
import OrgUnitTree from './components/d2-ui/org-unit-tree';
import TopHeader from './components/TopHeader';
import {Sidebar} from '@dhis2/d2-ui-core';

/**
* @description
* Expansion Panel
*/
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

/**
* @description
* Google Map component 
*/
import MapComponent from './components/MapComponent';
import GoogleMapReact from 'google-map-react';
import { GoogleMap, Marker } from "google-map-react";

/**
 * @description
 * App class for communicating with all other compoenents
*/

let currentSection;
let lastSection;
let sidebarRef;

function changeSectionHandler(key, searchText) {
    currentSection = key;
    if (key !== 'search' && sidebarRef) {
        sidebarRef.clearSearchBox();
    }
}

function changeSearchTextHandler(searchText) {
    if (searchText.toString().trim().length > 0) {
        if (currentSection !== 'search') {
            lastSection = currentSection;
        }
        changeSectionHandler('search', searchText);
    } else {
        changeSectionHandler(lastSection);
    }
}

function storeRef(ref) {
    sidebarRef = ref;
}

const styles = {
    box: {
        position: 'relative',
        border: '1px solid #808080',
        borderRadius: 3,
        width: 266,
        height: 300,
        margin: 3,
    },
    header: {
        height: 44,
        background: '#fff',
        color: 'white',
        fontSize: 16,
        fontWeight: 700,
    },
    headerText: {
        padding: 12,
    },
    leftBar: {
        position: 'absolute',
        width:'220px'
    },
    rightBar:{
       position: 'absolute',
       width:'820px',
    },
    page: {
        paddingLeft: 266,
        paddingTop: 24,
    },
    muiExpansionPanelDetailsRoot:{
        display: 'absolute',
        padding: '0px 2px 2px',
    }
};
/**
 * @description
 * This side bar will be used in left bar
*/
const sections = [
    { key: 's1', label: 'Section 1' },
    { key: 's2', label: 'Section 2' },
    { key: 's3', label: 'Section 3' },
    { key: 's4', label: 'Section 4' },
];

class App extends Component {
    constructor(props) {
        
        super(props);
        this.state = {
            d2: props.d2,
        };
    }

    getChildContext() {
        return { d2: this.state.d2 };
    }

    render() {
        if (!this.state.d2) {
            return null;
        }
        return (
            <D2UIApp>
                <HeaderBar d2={this.state.d2} />
                <div className="App">
                    <div className="appContentBody">
                        <div className="leftBar">
                        <span className="mflBrand"> MFL-APP </span>
                        
                        <ExpansionPanel style={styles.muiExpansionPanelDetailsRoot}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography>Search Panel</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              <Typography>
                                <Sidebar
                                sections={sections.slice(0, 0)}
                                onChangeSection={changeSectionHandler}
                                showSearchField
                                searchFieldLabel="Search"
                                onChangeSearchText={changeSearchTextHandler}
                                ref={storeRef}
                                />
                                <OrgUnitTree d2={this.state.d2} />
                              </Typography>
                            </ExpansionPanelDetails>
                          </ExpansionPanel>                         
                        
                        </div>
                        <div className="rightBar">

                          <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography>Map Preview</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              <Typography>
                                <MapComponent />
                              </Typography>
                            </ExpansionPanelDetails>
                          </ExpansionPanel>

                        Search Result
                        <div id="searchResult"></div>
                        </div>
                    </div>
                </div>          

                <p className="appFooter">
                  2018 @ University of Oslo
                </p>

            </D2UIApp>
        );
    }
}

App.childContextTypes = {
    d2: PropTypes.object,
};

App.propTypes = {
    d2: PropTypes.object.isRequired,
};
export default App;
