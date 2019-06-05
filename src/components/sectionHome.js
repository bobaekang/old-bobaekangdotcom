import React from "react"

// material ui
import { withStyles } from '@material-ui/core/styles'

// styles
import colors from '../styles/colors.js'

const styles = theme => ({
	sectionBody: {
		fontSize: '1.5em',
		color: colors.darkgrey
	},
	sectionTitle: {
		fontSize: '8em',
		color: colors.red
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
		textAlign: 'center'
	}
})

const SectionHome = ({ classes }) => {
	return (
		<div className={classes.textCenter}>
			<div className={classes.stripeTop}></div>
			<div className={classes.textCenter}></div>
				<h1 className={classes.sectionTitle}>bobae kang</h1>
				<p className={classes.sectionBody}>Chicago-based social scientist turned software engineer</p>
			<div className={classes.stripeBottom}></div>
		</div>
	)
}

export default withStyles(styles)(SectionHome)