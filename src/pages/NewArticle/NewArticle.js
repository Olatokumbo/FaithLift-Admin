import React, { useState } from "react";
import {
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import PararaphCard from "../../components/ParagraphCard/ParagraphCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as actionCreator from "../../store/actions";
import { connect } from "react-redux";
import style from "./NewArticle.module.css";

const NewArticle = ({ addArticle, isLoading }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState([]);
  const [poster, setPoster] = useState(null);
  const [displayPhoto, setDisplayPhoto] = useState("");
  const [category, setCategory] = useState("news");

  const add = () => {
    addArticle({ title, message, poster, category });
  };
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const addMessage = (e) => {
    e.preventDefault();
    setMessage((prevMessage) =>
      prevMessage.concat(e.target.elements.message.value)
    );
    e.target.elements.message.value = "";
  };

  const removeMessage = (removeText) => {
    //   console.log("remove")
    setMessage(message.filter((keyword) => keyword !== removeText));
  };
  const previewPhoto = (files) => {
    if (files) {
      setDisplayPhoto(URL.createObjectURL(files));
      setPoster(files);
    }
  };
  return (
    <div className={style.newArticle}>
      <Typography className={style.title}>New Article</Typography>
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
        <img src={displayPhoto} className={style.previewPhoto} alt="preview" />
        <div className={style.messageContainer}>
          {message?.map((text, index) => {
            return (
              <PararaphCard
                key={index}
                text={text}
                index={index}
                remove={removeMessage}
              />
            );
          })}
        </div>
        <form onSubmit={addMessage} className={style.paragraphForm}>
          <TextField
            name="message"
            type="text"
            label="Message"
            variant="outlined"
            size="small"
            multiline={true}
            rows={5}
            required
            className={style.input}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={style.addBtn}
          >
            Add New Paragraph
          </Button>
        </form>
        <FormControl variant="filled" className={style.selectForm}>
          <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            className={style.select}
            value={category}
            onChange={handleChange}
            label="Cateory"
          >
            <MenuItem value={"news"}>News</MenuItem>
            <MenuItem value={"events"}>Events</MenuItem>
            <MenuItem value={"word"}>Word</MenuItem>
          </Select>
        </FormControl>
      </div>
      {isLoading ? <CircularProgress /> : <div></div>}
      <Button
        variant="contained"
        className={style.saveBtn}
        color="secondary"
        disabled={!(!!title && !!message && !!poster && !!category && message.length>0)  || (isLoading)}
        onClick={add}
      >
        Save
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.articles.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addArticle: (data) => dispatch(actionCreator.addArticle(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewArticle);
