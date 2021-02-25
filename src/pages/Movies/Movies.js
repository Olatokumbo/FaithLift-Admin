import React from "react";
import { Typography, Button } from "@material-ui/core";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import style from "./Movies.module.css";

const Movies = () => {
  return (
    <div className={style.moviesPage}>
      <Typography className={style.title}>Movies</Typography>
      <Button className={style.addBtn} variant="contained" color="primary">Add Movie</Button>
      <div className={style.t}></div>
    </div>
  );
};

export default Movies;
