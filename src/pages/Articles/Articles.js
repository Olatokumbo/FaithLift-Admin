import React, {useEffect} from "react";
import {
  Typography,
  IconButton,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { connect } from "react-redux";
import * as actionCreator from "../../store/actions";
import { Link } from "react-router-dom";
import moment from "moment";
import style from "./Articles.module.css";

const Articles = ({articles, fetchArticles}) => {
  useEffect(()=>{
    fetchArticles()
  },[fetchArticles])
  return (
    <div className={style.articlesPage}>
      <Typography className={style.title}>Articles</Typography>
      <Button variant="contained" size="large" color="primary">
        Add New Article
      </Button>
      <TableContainer className={style.table} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="center">Published Date</TableCell>
              <TableCell align="center">View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles?.map((article) => (
              <TableRow key={article.id}>
                <TableCell component="th" scope="row">
                  {article.title}
                </TableCell>
                <TableCell align="center">{moment(article.publishedDate.toDate()).format("MM/DD/YYYY")}</TableCell>
                <TableCell align="center">
                  <Link to={`/article/${article.id}`}>
                    <IconButton>
                      <VisibilityIcon />
                    </IconButton>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    articles: state.articles.articleList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticles: () => dispatch(actionCreator.fetchArticles()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Articles);
