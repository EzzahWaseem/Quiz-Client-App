import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getScore } from '../../actions/posts';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  flexClass: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  score: {
    fontWeight: "bold",
    color: "green"
  },
  viewscore: {
    color: "red"
  },
  headingPadding: {
    textAlign: 'center',
    paddingTop: "10px",
    paddingBottom: "10px",
  }
}));

export default function User() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getScore());
  }, [dispatch]);
  const score = useSelector((state) => state.score);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid item xs={12} className={classes.headingPadding}>
            <Typography variant="h4" color="primary">Registered Users List</Typography>
          </Grid>
          {score && score[0]?.map(x => {
            return (
              <Paper key={x._id} className={classes.paper} >
                <Grid container spacing={2} className={classes.flexClass}>
                  <Grid item >
                    <Typography variant="subtitle1">
                      {x.name.toUpperCase()}
                    </Typography>

                  </Grid>
                  <Grid item >

                    <Typography variant="subtitle1"><span className={classes.score}>Score:</span> <span className={classes.viewscore}>{x.score}</span></Typography>
                  </Grid>
                </Grid>

              </Paper>
            )
          })}
        </Grid>
      </Grid>
    </div>
  );
}

