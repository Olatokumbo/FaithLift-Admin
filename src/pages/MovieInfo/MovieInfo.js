import React, { useEffect, useState } from "react";
import { Typography, TextField, Button, Chip } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreator from "../../store/actions";
import moment from "moment";
import style from "./MovieInfo.module.css";

const MovieInfo = ({ fetchMovieInfo, movieInfo, updateMovie, deleteMovie }) => {
  const params = useParams();
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [director, setDirector] = useState("");
  const [writer, setWriter] = useState("");
  const [releasedDate, setReleasedDate] = useState(null);
  const [year, setYear] = useState(0);
  const [youtubeUrl, setYoutubeUrl] = useState("");
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

  const startDelete = () => {
    deleteMovie(params.id);
  };
  const update = () => {
    updateMovie({
      id: params.id,
      name,
      info,
      director,
      writer,
      releasedDate: new Date(releasedDate),
      year,
      youtubeUrl,
      duration: { hours, minutes },
      casts,
    });
  };
  useEffect(() => {
    fetchMovieInfo(params.id);
  }, [fetchMovieInfo, params.id]);

  useEffect(() => {
    setName(movieInfo?.name);
    setInfo(movieInfo?.info);
    setDirector(movieInfo?.director);
    setWriter(movieInfo?.writer);
    setReleasedDate(
      moment(movieInfo?.releasedDate.toDate()).format("YYYY-MM-DD")
    );
    setYear(movieInfo?.year);
    setYoutubeUrl(movieInfo?.youtubeUrl);
    setHours(movieInfo?.duration.hours);
    setMinutes(movieInfo?.duration.minutes);
    setCasts(movieInfo?.casts);
  }, [movieInfo]);

  if (!movieInfo) {
    return <div>Loading...</div>;
  }
  return (
    <div className={style.movieInfo}>
      <div className={style.header}>
        <Typography className={style.title}>Movie Info</Typography>
        <div>
          <Button
            variant="contained"
            color="secondary"
            className={style.delete}
            onClick={startDelete}
          >
            Delete
          </Button>
          <Button
            disabled={!(!!name && !!info && !!hours && !!minutes && !!year && !!writer && !!director && !!releasedDate && casts.length>0)}
            color="primary"
            variant="contained"
            className={style.saveBtn}
            onClick={update}
          >
            Save
          </Button>
        </div>
      </div>
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
            onChange={(e) => setYear(e.target.value)}
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
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
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
              onChange={(e) => setHours(parseInt(e.target.value))}
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
              onChange={(e) => setMinutes(parseInt(e.target.value))}
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
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    movieInfo: state.movies.movieInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMovieInfo: (id) => dispatch(actionCreator.fetchMovieInfo(id)),
    updateMovie: (data) => dispatch(actionCreator.updateMovieInfo(data)),
    deleteMovie: (id) => dispatch(actionCreator.deleteMovie(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieInfo);
