import * as React from "react"
import { withStyles, WithStyles } from '@material-ui/core/styles'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { AppState } from '../features/redux/state/appState'
import { connect } from "react-redux";
import { twitterAction } from '../features/redux/action/userAuth'
import Loader from '../components/loader/loader'
import ListCard from '../components/cards/listCard/listCard'
const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  },
  paperStyle: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit
  },
});
type PropsWithStyles = WithStyles<"paperStyle" | "textField" | "button">;

interface loginProps {
  twitterSearch?: any
  dispatch?: any
  history?: any
}
class UserLogin extends React.Component<loginProps & PropsWithStyles>{
  state = {
    userName: '',
    time: 3
  }
  interval;
  componentDidMount() {
    this.props.dispatch(twitterAction({}, 2))
    this.interval = setInterval(() => this.setState({ time: Math.floor(Math.random() * 10) > 0 ? Math.floor(Math.random() * 10) : 1 }), 5000);
    this.interval = setInterval(() => this.props.dispatch(twitterAction({}, this.state.time > 0 ? this.state.time : 1)), 5000)
  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleClose = () => {
    this.setState({ open: false });
  }
  handleSubmit = () => {
    const newSubmit = {
      searchFilter: this.state.userName
    }
    this.props.dispatch(twitterAction(newSubmit, {}))
  }

  render() {
    const { loading, data } = this.props.twitterSearch
    const twitterList = (data || []).map((e, i) => {
      return <ListCard
        showUploadDate={e.created_at}
        twitterTitle={e.user.name}
        userAvatar={e.user.profile_image_url}
      />
    })
    return (
      <div className='cf pa3'>
        <div className='w-100'>
          <Typography component="h2" variant="headline" gutterBottom>
            Twitter Search
          </Typography>
          <ValidatorForm onSubmit={this.handleSubmit} noValidate autoComplete="off">
            <div className="fl w-80">
              <TextValidator
                label='Search'
                name="userName"
                type="search"
                className={this.props.classes.textField}
                value={this.state.userName}
                onChange={this.handleChange}
                margin="normal"
              /></div>
            <div className='fl pv3 w-20'>
              <Button onClick={this.handleSubmit} fullWidth={true} type="submit" variant="contained" color="primary" className={this.props.classes.button}>
                Search
        </Button>  </div>
          </ValidatorForm>
        </div>
        <div className='mw8-ns center pt2'>
          {loading && <Loader />}
          {twitterList}
        </div>
      </div>
    )
  }
}
function mapStatetoProps(state: AppState) {
  return {
    twitterSearch: state.twitterSearch
  }
}
export default connect(mapStatetoProps)(withStyles(styles, { withTheme: true })(UserLogin))