import React, { Component, useState, createContext } from "react";
import FacebookLogin from "react-facebook-login";
import { useHistory } from "react-router-dom";
import ExactHero from "./ExactHero";
import Swapi from "./Swapi";

export let Context = createContext();

export default function Facebook() {
  const [loginState, setLoginState] = useState({
    connected: false,
  });

  let history = useHistory();

  let fbContent;

  const LogOut = () => {
    setLoginState({ connected: false });
  };

  const componentClicked = () => {
    console.log("clicked");
  };

  const responseFacebook = (response) => {
    if (response.name) {
      //if success
      console.log("authenticaition succeded!", response);
      setLoginState({ connected: true });
      Context = { connected: true };
      // console.log("connected = true");

      <Context.Provider value={Context}>
        <Context.Consumer>
          {" "}
          <ExactHero />
          <Swapi />
        </Context.Consumer>
      </Context.Provider>;
      console.log(Context);
    } else console.log("not logged in");
  };

  if (loginState.connected) {
    return (
      <div>
        <h1>you are already logged in </h1>
        <div>
          {" "}
          <button onClick={() => LogOut()}>Back</button>{" "}
        </div>
        <div>
          {" "}
          <button onClick={() => history.push("/swapi")}> Show Heroes</button>
        </div>
        {/* {<Swapi loginState={loginState} />} */}
      </div>
    );
  }

  fbContent = (
    <FacebookLogin
      appId="1112037659237523"
      autoLoad={true}
      fields="name,email,picture"
      onClick={componentClicked}
      callback={responseFacebook}
    />
  );
  return (
    <>
      {" "}
      <h1 className="title">
        Hi , here you can learn more about Star Wars heroes
      </h1>
      <p>To get started, auth via Facebook</p>
      {fbContent}{" "}
    </>
  );
}
