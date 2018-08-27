import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 220,
    maxWidth: 350,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 350,
    },
  },
};

const names = [
  'Facility Basic Identifier',
  'Administrative Area',
  'Contact Details',
  'Service Domain',
  'Resource Domain',
  'Infrastruture Detail',
  'Assets Information',
  'Stock Information',
  'Accreditation Information/ Licence renew',
  'Land Information',
  'Available Services',
  'Historical Background',
  'Client Feedback',
  'Distance of Nearest Facility',
  'Doctors per population ratio',
  'Number of beds with population ratio',
  'Number of Blood banks',
  'Vacancies',
  'Ambulance Avaiability',
  'Emergency Obstetric Care',
  'Recently Created Facilities',
  'Duplicate Facilities',
  'Percentage of issuance covered by the faiclity',
  'Nearest roads and highway condition',
  'Cold chain activities',
  'Disaster recovery equipments',
  'Mobile clinics are available in my catchment',
  'Nearest facility to refer for particular disease/case',
  'Electronic medical records',
  'Number of donors support health services',
  'Doctors are working in multiple health facilities',
  'Opening and closing time of a facility',
  'How many doctors are working on a facility',
  'Reported and completed data',
  'Facilities are located in islands',
  'Facilities have high or low service load (by services)',
];

class MultipleSelect extends React.Component {
  state = {
    name: [],
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  render() {
    const { classes, theme } = this.props;
    //alert(this.state.name);
    return (
      <div className={classes.root}>
        
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple-checkbox">Searching Category</InputLabel>
          <Select
            multiple
            value={this.state.name}
            onChange={this.handleChange}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {names.map(name => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={this.state.name.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

MultipleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MultipleSelect);