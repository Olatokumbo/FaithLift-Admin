import React from "react";
import { Typography, Button } from "@material-ui/core";
import style from "./Articles.module.css";

const Articles = () => {
  return (
    <div className={style.articlesPage}>
      <Typography className={style.title}>Articles</Typography>
      <Button variant="contained" size="large" color="primary">Add New Article</Button>
    </div>
  );
};

export default Articles;
