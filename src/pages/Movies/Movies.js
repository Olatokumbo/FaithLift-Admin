import React, { useEffect } from "react";
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
import style from "./Movies.module.css";

const Movies = ({ movies, fetchMovies }) => {
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);
  return (
    <div className={style.moviesPage}>
      <Typography className={style.title}>Movies</Typography>
      <Link to="/new/movie">
        <Button className={style.btn} variant="contained" color="primary">
          Add Movie
        </Button>
      </Link>
      <Link to="/poster">
        <Button variant="contained" color="secondary">
          Edit Poster
        </Button>
      </Link>
      <TableContainer className={style.table} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Writer</TableCell>
              <TableCell align="center">Director</TableCell>
              <TableCell align="center">Year Released</TableCell>
              <TableCell align="center">View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie) => (
              <TableRow key={movie.id}>
                <TableCell component="th" scope="row">
                  {movie.name}
                </TableCell>
                <TableCell align="center">{movie.writer}</TableCell>
                <TableCell align="center">{movie.director}</TableCell>
                <TableCell align="center">{movie.year}</TableCell>
                <TableCell align="center">
                  <Link to={`/movie/${movie.id}`}>
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
    movies: state.movies.movieList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMovies: () => dispatch(actionCreator.fetchMovies()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Movies);
