import React from "react";
import { Grid } from "@material-ui/core";
import Navbar from "../../components/Navbar/Navbar";
import AssignmentIcon from "@material-ui/icons/Assignment";
import MovieIcon from "@material-ui/icons/Movie";
import MenuCard from "../../components/MenuCard/MenuCard";
import style from "./Home.module.css";

const Home = () => {
  return (
    <div className={style.home}>
      <Navbar />
      <Grid container justify="center" className={style.grid}>
        <MenuCard title="Movies" icon={MovieIcon} url="/movies" />
        <MenuCard title="Articles" icon={AssignmentIcon} url="/articles" />
      </Grid>
    </div>
  );
};

export default Home;
