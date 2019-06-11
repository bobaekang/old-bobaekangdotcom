import React from "react"
import PropTypes from 'prop-types'

// material ui
import { withStyles } from '@material-ui/core/styles'

// components
import TypedStrings from '../components/typedStrings'

// styles
import colors from '../styles/colors.js'

const styles = {
	sectionBody: {
		fontSize: '1.2em',
		color: colors.darkgrey
	},
	sectionTitle: {
		fontSize: 'calc(2em + 6vw)',
		color: colors.red,
		marginBottom: '0.2rem'
	},
	stripeBottom: {
		backgroundColor: colors.blue,
		bottom: '16.5%',
		height: '16.5%',
		left: '0%',
		position: 'absolute',
		width: '100%',
	},
	stripeTop: {
		backgroundColor: colors.blue,
		height: '16.5%',
		left: '0%',
		position: 'absolute',
		top: '16.5%',
		width: '100%',
	},
	textCenter: {
		textAlign: 'center',
		position: 'absolute',
		height: '34%',
		top: '33%',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	}
}

const SectionHome = ({ classes }) => (
	<div>
		<div className={classes.stripeTop}></div>
		<div className={classes.textCenter}>
			<h1 className={classes.sectionTitle}>bobae kang</h1>
			<div className={classes.sectionBody}>
				<TypedStrings
					strings={[
						'Chicago-based social scientist turned software engineer'
					]}
				/>
			</div>
		</div>
		<div className={classes.stripeBottom}></div>
	</div>
)

SectionHome.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SectionHome)