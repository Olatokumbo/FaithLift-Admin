import React, { useEffect, useState } from "react";
import { Typography, TextField, Button, Chip } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreator from "../../store/actions";
import style from "./MovieInfo.module.css";

const MovieInfo = ({ fetchMovieInfo }) => {
  const params = useParams();
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [director, setDirector] = useState("");
  const [writer, setWriter] = useState("");
  const [releasedDate, setReleasedDate] = useState(null);
  const [year, setYear] = useState(0);
  const [youtubeURL, setYoutubeUrl] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [castMember, setCastMember] = useState("");
  const [casts, setCasts] = useState([]);

  const addCast = (e) => {
    e.preventDefault();
    setCasts((prevState) => prevState.concat(castMember));
    setCastMember("");
  };

  const removeCastMember = (removeCast) => {
    setCasts(casts.filter((cast) => cast !== removeCast));
  };

  useEffect(() => {
    fetchMovieInfo(params.id);
  }, [fetchMovieInfo, params.id]);

  return (
    <div className={style.movieInfo}>
      <Typography className={style.title}>Movie Info</Typography>
      <div className={style.inputContainer}>
        <TextField
          type="text"
          label="Name"
          variant="outlined"
          size="small"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={style.input}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          type="text"
          label="Info"
          variant="outlined"
          multiline
          rows="6"
          size="small"
          value={info}
          onChange={(e) => setInfo(e.target.value)}
          className={style.input}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div className={style.movieHead}>
          <TextField
            type="text"
            label="Writer"
            variant="outlined"
            size="small"
            value={writer}
            onChange={(e) => setWriter(e.target.value)}
            className={style.input}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            type="text"
            label="Director"
            variant="outlined"
            size="small"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            className={style.input}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className={style.dates}>
          <TextField
            type="date"
            label="Released Date"
            variant="outlined"
            size="small"
            value={releasedDate}
            onChange={(e) => setReleasedDate(e.target.value)}
            className={style.input}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            type="number"
            label="Year"
            variant="outlined"
            size="small"
            value={year}
          onChange={(e)=>setYear(e.target.value)}
            className={style.input}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <TextField
          type="text"
          label="YouTubeURL"
          variant="outlined"
          size="small"
          value={youtubeURL}
          onChange={(e)=>setYoutubeUrl(e.target.value)}
          className={style.input}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div className={style.durationContainer}>
          <Typography variant="h6">Duration</Typography>
          <div className={style.duration}>
            <TextField
              type="number"
              label="Hour(s)"
              variant="outlined"
              size="small"
              value={hours}
              onChange={(e)=>setHours(parseInt(e.target.value))}
              className={style.input}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              type="number"
              label="Minute(s)"
              variant="outlined"
              size="small"
              value={minutes}
              onChange={(e)=>setMinutes(parseInt(e.target.value))}
              className={style.input}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>
        <div className={style.cast}>
          <form className={style.castContainer} onSubmit={addCast}>
            <TextField
              type="text"
              label="Cast"
              variant="outlined"
              size="small"
              value={castMember}
              onChange={(e) => setCastMember(e.target.value)}
              className={style.input}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!castMember > 0}
            >
              Add
            </Button>
          </form>
          <div className={style.castList}>
            {casts.map((name) => {
              return (
                <Chip
                  color="primary"
                  label={name}
                  onDelete={() => {
                    removeCastMember(name);
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Button size="large" variant="contained" color="primary">
        Save
      </Button>
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
    fetchMovieInfo: (id) => dispatch(actionCreator.fetchMovieInfo(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieInfo);
