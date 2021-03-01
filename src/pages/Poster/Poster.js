import React, { useState } from "react";
import { TextField, Button, IconButton, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import style from "./Poster.module.css";

const Poster = () => {
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [movieId, setMovieId] = useState("");
  const [displayPhoto, setDisplayPhoto] = useState("");
  const [poster, setPoster] = useState(null);

  const previewPhoto = (files) => {
    if (files) {
      setDisplayPhoto(URL.createObjectURL(files));
      setPoster(files);
    }
  };
  const resetPhoto = () => {
    setDisplayPhoto("");
    setPoster("");
  };
  return (
    <div className={style.poster}>
      <Typography className={style.title}>Poster Details</Typography>
      <div className={style.inputContainer}>
        <TextField
          type="text"
          label="Title"
          variant="outlined"
          size="small"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={style.input}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          type="text"
          label="Info"
          variant="outlined"
          size="small"
          value={info}
          onChange={(e) => setInfo(e.target.value)}
          className={style.input}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          type="text"
          label="YoutubeUrl"
          variant="outlined"
          size="small"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          className={style.input}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          type="text"
          label="MovieId"
          variant="outlined"
          size="small"
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
          className={style.input}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          type="file"
          label="Poster"
          variant="outlined"
          accept="image/x-png,image/gif,image/jpeg"
          size="small"
          onChange={(e) => {
            previewPhoto(e.target.files[0]);
          }}
          className={style.input}
          InputLabelProps={{
            shrink: true,
          }}
        />
        {displayPhoto ? (
          <div className={style.previewContainer}>
            <img
              src={displayPhoto}
              className={style.previewPhoto}
              alt="preview"
            />
            <IconButton onClick={resetPhoto}>
              <DeleteIcon />
            </IconButton>
          </div>
        ) : (
          <div></div>
        )}
        <Button
            variant="contained"
            color="primary"
            className={style.saveBtn}
            disabled={!(!!title && !!info && !!youtubeUrl && !!movieId)}
            // onClick={startDelete }
          >
            Save
          </Button>
      </div>
    </div>
  );
};

export default Poster;
