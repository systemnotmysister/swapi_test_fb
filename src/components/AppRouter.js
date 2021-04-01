import React, { Component, useState, useContext } from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import ExactHero from "./ExactHero";
import Facebook, { Context } from "./Facebook";
import Swapi from "./Swapi";

function AppRouter(props) {
  return (
    // null
    <Switch>
      <Route exact path="/">
        <Context.Provider>
          <Facebook />
        </Context.Provider>
      </Route>

      <Route path="/swapi">
        <Swapi />
      </Route>

      <Route path="/people/:id">
        <ExactHero />
      </Route>

      {/* </LoginContext.Provider> */}
    </Switch>
  );
}

export default AppRouter;
