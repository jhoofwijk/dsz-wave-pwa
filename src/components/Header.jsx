import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    color: "white",
    marginLeft: -12,
    marginRight: 20,
  },
};

function Header(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="secondary" className={classes.grow}>
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>

      <div style={{ position: "fixed", top: 0, right: 4 }}>
        <Typography color="secondary" style={{ fontWeight: "bold", fontSize: "smaller" }}>
          v {process.env.VERSION}
        </Typography>
      </div>
    </div>
  );
}

export default withStyles(styles)(Header);
