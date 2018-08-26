import React from 'react';
import PropTypes from 'prop-types';

import log from 'loglevel';
import Card from 'material-ui/Card/Card';
import CardText from 'material-ui/Card/CardText';
import MultipleSelection from './org-unit-tree/multiple-selection';

const styles = {
	card: {
		margin: 1,
		width: 266,
		float: 'left',
		transition: 'all 175ms ease-out',
	},
	cardText: {
		paddingTop: 0,
	},
	cardHeader: {
		padding: '0 16px 16px',
		margin: '16px -16px',
		borderBottom: '1px solid #eeeeee',
	},
	customLabel: {
		fontStyle: 'italic',
	},
	customLabelSelected: {
		color: 'blue',
		weight: 900,
	},
};

styles.cardWide = Object.assign({}, styles.card, {
	width: (styles.card.width * 3) + (styles.card.margin * 4),
});

export default class OrgUnitTreeSelection extends React.Component {
	constructor (props) {
		super(props);

		const d2 = props.d2;
		this.state = {
			d2: d2,
			roots: [],
			root: undefined,
			preRoot: undefined
		};

		const childFields = 'id,path,displayName,children::isNotEmpty';

		d2.models.organisationUnits
			.list({
				paging: false,
				level: 1,
				fields: childFields,
			})
			.then(rootLevel => rootLevel.toArray()[0])
			.then((loadRootUnit) => {
				this.setState({
					root: loadRootUnit,
					roots: []
				})
			})
			.then(() => Promise.all([ // at6UHUQatSo(Western Area),fdc6uOvgoji(Bombali)
                d2.models.organisationUnits.get('f87BkZO5JCm', { fields: childFields }), // Jakarta
                d2.models.organisationUnits.get('Z44NF1SUpuc', { fields: childFields }), // Bali
				//d2.models.organisationUnits.get('at6UHUQatSo', { fields: childFields }), // Western Area
				//d2.models.organisationUnits.get('fdc6uOvgoji', { fields: childFields }), // Bombali
				//d2.models.organisationUnits.get('pF3sVE7tZdk', { fields: childFields }), // Dhaka
				//d2.models.organisationUnits.get('mykF7AaZv9R', { fields: childFields }), // Barisal
				d2.models.organisationUnits.list({
					paging: false,
					level: 1,
					fields: 'id,path,displayName,children[id,path,displayName,children::isNotEmpty]',
				}),
			]))
			.then(roots => [roots[0], roots[1], roots[2].toArray()[0]])
			.then((roots) => {
				this.setState({
					roots
				});
				d2.models.organisationUnits.list({
					paging: false,
					level: 1,
					fields: `id,path,displayName,children[id,path,displayName,children[${childFields}]]`,
				})
				.then(preRoot => preRoot.toArray()[0])
				.then((preRoot) => {
					this.setState({
						preRoot
					})
				});
			})
	}

	render () {
		const { root, roots, preRoot } = this.state;

		console.log(root, roots, preRoot)
		if (!root || !roots || !preRoot) {
			return null;
		}

		return (
            <div>
                <Card style={styles.card}>
                    <CardText style={styles.cardText}>
                        <h3 style={styles.cardHeader}>Select Organization</h3>
                        <MultipleSelection root={root} />
                    </CardText>
                </Card>
            </div>
		);
	}
}

OrgUnitTreeSelection.propTypes = {
    d2: PropTypes.object.isRequired,
};
