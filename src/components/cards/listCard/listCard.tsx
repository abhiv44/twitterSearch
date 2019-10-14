import * as React from "react"
import { withStyles, WithStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import * as moment from 'moment'
interface CardProps {
  content?: any
  index?: any
  showUploadDate?: any
  twitterTitle?: any
  twitterListDescription?: any
  userAvatar?: any
}

const styles = theme => ({
  chip: {
    margin: '2px',
  },
  header: {
    padding: '2px 11px'
  }
})

type PropsWithStyles = WithStyles<"chip" | "header">;

class ListCard extends React.Component<PropsWithStyles & CardProps>{

  render() {
    const { index, showUploadDate,
      twitterTitle, twitterListDescription, classes, userAvatar } = this.props
    return (
      <div className="mb3">
        <Card square key={index} className='pt2 pr2'>
          <CardHeader
            avatar={<Avatar src={userAvatar} />}
            title={<Typography style={{ wordBreak: 'break-all' }} variant="h5"> {twitterTitle} </Typography>}
            subheader={<Typography variant="caption">{moment(showUploadDate).fromNow()}</Typography>}
            classes={{ root: classes.header }}
          />
          <CardContent>
            <Typography variant="subtitle2">
              {twitterListDescription}
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  }
}
export default withStyles(styles, { withTheme: true })(ListCard);