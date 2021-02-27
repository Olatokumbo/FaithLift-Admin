import React, { useState, useEffect } from "react";
import { Button, Typography, TextField } from "@material-ui/core";
import PararaphCard from "../../components/ParagraphCard/ParagraphCard";
import * as actionCreator from "../../store/actions";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import style from "./ArticleInfo.module.css";

const ArticleInfo = ({ articleInfo, fetchArticleInfo, updateArticle }) => {
  const params = useParams();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState([]);
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
  const update = () => {
    updateArticle({id: params.id, title, message})
  };
  useEffect(() => {
    fetchArticleInfo(params.id);
  }, [fetchArticleInfo, params.id]);

  useEffect(() => {
    setTitle(articleInfo?.title);
    setMessage(articleInfo?.message);
  }, [articleInfo]);
  if (!title) {
    return <div>Loading...</div>;
  }
  return (
    <div className={style.articleInfo}>
      <div className={style.header}>
        <Typography className={style.title}>Edit Article Info</Typography>
        <Button variant="contained" className={style.saveBtn} onClick={update}>
          Save
        </Button>
      </div>
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
        <Typography>
          Published Date:{" "}
          {articleInfo
            ? moment(articleInfo?.publishedDate.toDate()).format("MM/DD/YYYY")
            : "Loading..."}
        </Typography>
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
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    articleInfo: state.articles.articleInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticleInfo: (id) => dispatch(actionCreator.fetchArticleInfo(id)),
    updateArticle: (data) => dispatch(actionCreator.updateArticleInfo(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleInfo);
