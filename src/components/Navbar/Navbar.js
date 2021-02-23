import React from "react";
import { AppBar, Button, Toolbar, Typography} from "@material-ui/core"
import { Link } from "react-router-dom"; 
import style from "./Navbar.module.css";

const Navbar = () => {
  return (
      <AppBar className={style.navbar} position="static">
        <Toolbar>
          <Link to="/home" className={style.logo}>
            <Typography>FaithLift (Admin)</Typography>
          </Link>
          <Button variant="contained" color="primary">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
  );
};

export default Navbar;
