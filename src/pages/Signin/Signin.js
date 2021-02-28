import React, {useState} from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from "react-redux";
import * as actionCreator from "../../store/actions";
import style from "./Signin.module.css";
const Signin = ({error, startSignin, isLoading}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] =useState(""); 

  const signin = () =>{
    startSignin({email, password})
  } 

  return (
    <div className={style.main}>
      <div className={style.signinContainer}>
        <div className={style.left}></div>
        <div className={style.right}>
          <div className={style.brand}>
            <Typography variant="h6" className={style.title}>FaithLift Administrator</Typography>
          </div>
          <div className={style.form}>
            <TextField
              name="email"
              type="email"
              className={style.input}
              variant="outlined"
              label="Email"
              size="small"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <TextField
              name="password"
              type="password"
              className={style.input}
              variant="outlined"
              label="Password"
              size="small"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <Button
              className={style.signin}
              variant="contained"
              size="small"
              color="primary"
              disabled={!(email && password)}
              onClick={signin}
            >
              Sign In
            </Button>
            { isLoading ? <CircularProgress style={{margin: "auto"}}/> : <div></div>}
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) =>{
  return{
    error: state.auth.message,
    isLoading: state.auth.isLoading
  }
};

const mapDispatchToProps = (dispatch) =>{
  return{
    startSignin: (user)=>dispatch(actionCreator.startSignin(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
