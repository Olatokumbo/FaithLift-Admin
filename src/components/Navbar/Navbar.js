import React from "react";
import { AppBar, Button, Toolbar, Typography} from "@material-ui/core"
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreator from "../../store/actions";
import style from "./Navbar.module.css";

const Navbar = ({logout}) => {
  return (
      <AppBar className={style.navbar} position="static">
        <Toolbar>
          <Link to="/home" className={style.logo}>
            <Typography>FaithLift (Admin)</Typography>
          </Link>
          <Button variant="contained" color="primary" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
  );
};

const mapDispatchToProps = (dispatch)=>{
  return{
    logout: ()=>dispatch(actionCreator.startSignout())
  }
}

export default connect(null, mapDispatchToProps)(Navbar);
