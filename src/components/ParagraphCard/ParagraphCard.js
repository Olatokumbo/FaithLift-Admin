import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import style from "./ParagraphCard.module.css";

const ParagraphCard = ({ text, remove, index }) => {
  return (
    <Card className={style.card}>
      <CardContent className={style.cardContent}>
        <Typography className={style.title}>Paragraph {index+1}</Typography>
        <Typography className={style.cardText}>{text}</Typography>
      </CardContent>
      <CardActions className={style.actionArea}>
        <IconButton className={style.iconButton} onClick={()=>remove(text)}>
          <DeleteIcon className={style.deleteIcon} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ParagraphCard;
