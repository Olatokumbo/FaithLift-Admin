import React, { useState } from "react";
import { Typography, TextField, Button, Chip } from "@material-ui/core";
import { connect } from "react-redux";
import * as actionCreator from "../../store/actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import style from "./NewMovie.module.css";

const NewMovie = ({ addMovie, isLoading }) => {
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [director, setDirector] = useState("");
  const [writer, setWriter] = useState("");
  const [releasedDate, setReleasedDate] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [castMember, setCastMember] = useState("");
  const [posterDisplay, setPosterDisplay] = useState("");
  const [poster, setPoster] = useState("");
  const [bannerDisplay, setBannerDisplay] = useState("");
  const [banner, setBanner] = useState("");
  const [casts, setCasts] = useState([]);

  const addCast = (e) => {
    e.preventDefault();
    setCasts((prevState) => prevState.concat(castMember));
    setCastMember("");
  };

  const removeCastMember = (removeCast) => {
    setCasts(casts.filter((cast) => cast !== removeCast));
  };

  const add = () => {
    addMovie({
      name,
      info,
      director,
      writer,
      year,
      releasedDate,
      youtubeUrl,
      duration: { hours, minutes },
      casts,
      images: [poster, banner],
    });
  };
  const previewPosterPhoto = (files) => {
    if (files) {
      setPosterDisplay(URL.createObjectURL(files));
      setPoster(files);
    }
  };
  const previewBannerPhoto = (files) => {
    if (files) {
      setBannerDisplay(URL.createObjectURL(files));
      setBanner(files);
    }
  };
  return (
    <div className={style.newMovie}>
      <div className={style.header}>
        <Typography className={style.title}>New Movie</Typography>
        <div style={{ display: "flex" }}>
          {isLoading ? <CircularProgress /> : <div></div>}
          <Button
            disabled={
              !(
                !!name &&
                !!info &&
                // !!hours &&
                !!minutes &&
                !!year &&
                !!writer &&
                !!director &&
                !!releasedDate &&
                !!poster &&
                !!banner &&
                casts.length > 0
              ) || isLoading
            }
            color="primary"
            variant="contained"
            className={style.saveBtn}
            onClick={add}
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
          inputProps={{
            maxLength: 250,
          }}
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
            {casts?.map((name) => {
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
        <TextField
          type="file"
          label="Poster"
          variant="outlined"
          accept="image/x-png,image/gif,image/jpeg"
          size="small"
          onChange={(e) => {
            previewPosterPhoto(e.target.files[0]);
          }}
          className={style.input}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <img src={posterDisplay} className={style.previewPhoto} alt="preview" />
        <TextField
          type="file"
          label="Banner"
          variant="outlined"
          accept="image/x-png,image/gif,image/jpeg"
          size="small"
          onChange={(e) => {
            previewBannerPhoto(e.target.files[0]);
          }}
          className={style.input}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <img src={bannerDisplay} className={style.previewPhoto} alt="preview" />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.movies.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMovie: (data) => dispatch(actionCreator.addMovie(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewMovie);
