import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import { init } from 'd2/lib/d2';
import d2 from 'd2/lib/d2';
import ReactDOM from 'react-dom';
import SearchResultBoxComponent from './SearchResultBoxComponent';
import '../App.css';

/**
 * @description
 * This is the custom parallel Org unit selection component 
 * We are using d2-ui componets instead of OrgUnitSelection Component
 * @return organisation unit
 * 
*/
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
// Dev Config
let devBaseUrl      = 'https://play.dhis2.org/2.29/api';
const baseUrlApi = devBaseUrl+'/api/';
/**
* Header parameters
*/
const fetchOptions = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    crossOriginLoading: false,
    mode: 'no-cors'
  }
};

class OrgUnitSelectionComponent extends React.Component {

// Constructor default load
  constructor(props) {
    super(props);
    this.state = {
      levelOneState: '',
      levelOneOrgData: [],
      levelTwoState: '',
      levelTwoOrgData: [],
      levelThreeState: '',
      levelThreeOrgData: [],
      levelFourState: '',
      levelFourOrgData: [],
      levelFourStateArray: [],
      name: 'MFL-APP',
      id:'',
    };
    this.renderLevelOneOrgUnits   = this.renderLevelOneOrgUnits.bind(this);
    this.renderLevelTwoOrgUnits   = this.renderLevelTwoOrgUnits.bind(this);
    this.renderLevelThreeOrgUnits = this.renderLevelThreeOrgUnits.bind(this);
    this.renderLevelFourOrgUnits  = this.renderLevelFourOrgUnits.bind(this);
    this.handleChangeLevel4  = this.handleChangeLevel4.bind(this);

  }; 

// Level-2 Window load  
  componentDidMount(){    
    let URL = baseUrlApi+'organisationUnits.json?filter=level:eq:1';
    return fetch(URL, fetchOptions)
      .then((result) => result.json() )
        .then((jsonData) => {
         this.setState({
          levelOneOrgData: jsonData.organisationUnits,
        });
        console.log("Level-1 Org Units loaded: ",jsonData.organisationUnits);  
      }).catch((error) => { console.warn('Error:', error); });
  } 

// Level-2 load based on level-1 change
  handleChangeLevel1 = event => {
    this.setState({ [event.target.name]: event.target.value });
    let selectedOrg = event.target.value;
    let URL = baseUrlApi+'organisationUnits.json?filter=id:eq:'+selectedOrg+'&fields=children[id,displayName]';
    return fetch(URL, fetchOptions)
      .then((result) => result.json() )
        .then((jsonData) => {
         this.setState({
          levelTwoOrgData: jsonData.organisationUnits[0].children,
        });
        console.log("Level-2 Org Units loaded: ",jsonData.organisationUnits[0].children); 
      }).catch((error) => { console.warn('Error:', error); });
  };

// Level-3 load based on level-2 change
  handleChangeLevel2 = event => {
    this.setState({ [event.target.name]: event.target.value });
    let selectedOrg = event.target.value;
    let URL = baseUrlApi+'organisationUnits.json?filter=id:eq:'+selectedOrg+'&fields=children[id,displayName]';
    return fetch(URL, fetchOptions)
      .then((result) => result.json() )
        .then((jsonData) => {
         this.setState({
          levelThreeOrgData: jsonData.organisationUnits[0].children,
        });
        console.log("Level-3 Org Units loaded: ",jsonData.organisationUnits[0].children); 
      }).catch((error) => { console.warn('Error:', error); });
  };

// Level-4 load based on level-3 change
  handleChangeLevel3 = event => {
    this.setState({ [event.target.name]: event.target.value });
    let selectedOrg = event.target.value;
    let URL = baseUrlApi+'organisationUnits.json?filter=id:eq:'+selectedOrg+'&fields=children[id,displayName]';
    return fetch(URL, fetchOptions)
      .then((result) => result.json() )
        .then((jsonData) => {
         this.setState({
          levelFourOrgData: jsonData.organisationUnits[0].children,
        });
        console.log("Level-4 Org Units loaded: ",jsonData.organisationUnits[0].children); 
      }).catch((error) => { console.warn('Error:', error); });
  };
// Level-4 load based program attributes display

  handleChangeLevel4 = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ levelFourStateArray: event.target.value });
  };

// Level-1 Render  
  renderLevelOneOrgUnits() {
    return this.state.levelOneOrgData.map((dt, i) => {
      return (
        <MenuItem
          key={i}
          value={dt.id}>
          {dt.displayName}
        </MenuItem>
      );
    });
  }

// Level-2 Render  
  renderLevelTwoOrgUnits() {
    return this.state.levelTwoOrgData.map((dt, i) => {
      return (
        <MenuItem
          key={i}
          value={dt.id}>
          {dt.displayName}
        </MenuItem>
      );
    });
  }

// Level-3 Render  
  renderLevelThreeOrgUnits() {
    return this.state.levelThreeOrgData.map((dt, i) => {
      return (
        <MenuItem
          key={i}
          value={dt.id}>
          {dt.displayName}
        </MenuItem>
      );
    });
  }  

// Level-4 Render  
  renderLevelFourOrgUnits() {
    return this.state.levelFourOrgData.map((name, i) => {
      return (
        <MenuItem
          key={i}
          value={name.id}>
          <Checkbox checked={this.state.name.indexOf(name) > -1} />
          {name.displayName}
        </MenuItem>
      );
    });
  } 

// Render all components    
  render() {
    const { classes } = this.props;
    let boxInfo = this.state.levelFourStateArray.map((info, id) => {
      if(info!=null){
        return(
          <SearchResultBoxComponent data={info}/>
        )
      }
    });
    
    return (
      <div>
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="level-1">Level-1</InputLabel>
            <Select
              value={this.state.levelOneState}
              onChange={this.handleChangeLevel1}
              inputProps={{
                name: 'levelOneState',
                id: 'level-1',
              }}>
              {this.renderLevelOneOrgUnits()}
            </Select>
          </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="level-2">Level-2</InputLabel>
          <Select
            value={this.state.levelTwoState}
            onChange={this.handleChangeLevel2}
            inputProps={{
              name: 'levelTwoState',
              id: 'level-2',
            }}>
            {this.renderLevelTwoOrgUnits()}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="level-3">Level-3</InputLabel>
          <Select
            value={this.state.levelThreeState}
            onChange={this.handleChangeLevel3}
            inputProps={{
              name: 'levelThreeState',
              id: 'level-3',
            }}>
            {this.renderLevelThreeOrgUnits()}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="level-4">Level-4</InputLabel>
          <Select
            multiple
            value={this.state.levelFourStateArray}
            onChange={this.handleChangeLevel4}
            inputProps={{
              name: 'levelFourState',
              id: 'level-4',
            }}            
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
            >
            {this.renderLevelFourOrgUnits()}
          </Select>
        </FormControl>  

      </form>
        <div className="wrapper-box">
          {boxInfo}
        </div>  
      </div>
    );
  }
}

OrgUnitSelectionComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrgUnitSelectionComponent);