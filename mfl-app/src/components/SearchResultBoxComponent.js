import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button    from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table     from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow  from '@material-ui/core/TableRow';
import Paper     from '@material-ui/core/Paper';
import App from './../App';

/**
 * @description
 * base usrl of the application
*/
let devBaseUrl   = 'https://mfl.dhis2.org/dhis';
const baseUrlApi = devBaseUrl+'/api/';

/**
 * @description
 * Header parameters, CORS parameter
*/
const fetchOptions = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    crossOriginLoading: false,       
    'Access-Control-Allow-Origin': 'https://mfl.dhis2.org',
    mode: 'no-cors'
  }
};
/**
 * @description
 * Style sheet
*/
const styles = {
	card: {
		minWidth: 275,
		maxWidth: 275,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		marginBottom: 16,
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
};
/**
 * @description
 * SearchResultBoxComponent class returns the attrubutes value
 * 
 * @require program uid, organisation unit uid
 *
 * @return program attributes value
*/
class SearchResultBoxComponent extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			orgUid:'',
			orgUnitAttributes: [],
		};
		this.renderOrgUnitsAttributes   = this.renderOrgUnitsAttributes.bind(this);
	}
  	renderOrgUnitsAttributes() {

	    return this.state.orgUnitAttributes.map((name, i) => {
	        return (	    
		      	
			    <TableBody>	      	
	              <TableRow>
	                <TableCell component="th" scope="row"> {name.displayName} </TableCell>
	                <TableCell>{name.value}</TableCell>
	              </TableRow>
			    </TableBody>
	        );
	    });
  	} 
	render(){
		let classes = this.props;
		
		this.props.orgUnitSelectedData.sort().map( (str) => { 

        	var parent = str.substring(0, str.lastIndexOf("/") + 1);
			var lastChild = str.substring(str.lastIndexOf("/") + 1, str.length);
							
			let URL = baseUrlApi+'trackedEntityInstances.json?ou='+lastChild+'&program=GBvB8miDhgR';

		    fetch(URL, fetchOptions)
		        .then((result) => result.json() ).then((jsonData) => {

			        if(jsonData.trackedEntityInstances[0]==='undefined' || jsonData.trackedEntityInstances[0].length==0){
				        
			        } else {

			        	this.setState({
				          orgUnitAttributes: jsonData.trackedEntityInstances[0].attributes,
				        });
			        	console.log("Org Units Attributes array: ",jsonData.trackedEntityInstances[0].attributes);  
			        }	
			        
		       }).catch((error) => { console.warn('Error:', error); });
        });
		
		return(
			<div className={classes.card}>
				<Card className={classes.card}>
		        <CardContent>
					<Typography className={classes.title} color="textSecondary">
						Facility Basic Identifier
					</Typography>
					<Paper className={classes.root}>
					  <Table className={classes.table}>
					    <TableHead>
					      <TableRow>
					        <TableCell>Identifier Name</TableCell>
					        <TableCell>Value</TableCell>
					      </TableRow>
					    </TableHead>
					    {this.renderOrgUnitsAttributes()}

					  </Table>
					</Paper>
		        </CardContent>
		        <CardActions>
		          <Button  variant="contained" color="primary" className={classes.button} size="small"> More Detail</Button>
		        </CardActions>
		      </Card>				
			</div>
		);
	}
}

export default SearchResultBoxComponent;