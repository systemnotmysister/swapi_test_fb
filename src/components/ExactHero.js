import React, { Component, useEffect, useState, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Context } from "./Facebook";
import { Card } from "antd";
import { Button } from "antd";

export default function ExactHero(props) {
  let history = useHistory();
  let { id } = useParams();
  useContext({ Context });
  let url = `https://swapi.dev/api/people/${id}/`;
  const [data, setData] = useState(null);
  const [homeWorldName, setHomeWorldName] = useState(null);
  const [filmsTitle, setFilmsTitle] = useState(null);
  const [vehicles, setVichles] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (Context.connected) {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        console.log("EXACT HERO JSON ", json);

        const homeworldRes = await fetch(json.homeworld);
        const resName = await homeworldRes.json();
        setHomeWorldName(resName.name);
        console.log(resName.name, " - fetch respone (homeworld.name)");
        console.log(json.films);

        Promise.all(
          json.films.map((url) => fetch(url).then((resp) => resp.json()))
        ).then((resp) => {
          setFilmsTitle(resp.map((it) => it.title));
          //   console.log(resp.map((it) => it.title));
        });

        Promise.all(
          json.vehicles.map((url) => fetch(url).then((resp) => resp.json()))
        ).then((resp) => {
          setVichles(resp.map((it) => [it.name, it.model]));
          console.log(vehicles);
        });
        console.log(vehicles, "AAA");
      } else {
        return (
          <div>
            {" "}
            <h1>you are not connected</h1>
            <button onClick={() => history.push("/")}> Back To Login</button>
          </div>
        );
      }
    };
    fetchData();

    // console.log("login via facebook to continue..");
  }, []);
  if (!Context.connected) {
    return (
      <div>
        {" "}
        <h1>you are not connected</h1>
        <button onClick={() => history.push("/")}> Back To Login</button>
      </div>
    );
  }

  if (!filmsTitle) {
    return <div>Loading...</div>;
  }

  if (data) {
    return (
      <>
        {" "}
        <div className="hswrapper">
          <div className="inner_hs">
            <ul className="inner_hs_ul">
              <li>
                <ul> name: {data.name}</ul>
                <ul> height: {data.height}</ul>
                <ul> mass: {data.mass}</ul>
                <ul> hair_color: {data.hair_color}</ul>
                <ul> skin_color : {data.skin_color}</ul>
                <ul> eye_color: {data.eye_color}</ul>
                <ul> birth_year: {data.birth_year}</ul>
                <ul> gender: {data.gender}</ul>
                <ul> homeworld: {homeWorldName} </ul>
                <ul type="text"> films: {filmsTitle.join(", ")} </ul>
                <ul type="text"> vehicles: {vehicles.join(",")}</ul>
              </li>
            </ul>
          </div>
        </div>{" "}
        {/* <img src={"/Vader_-_02_23235"} alt="Write something here" />{" "} */}
        <div>
          <button className="hsbtn" onClick={() => history.push("/swapi")}>
            {" "}
            Back to Heroes{" "}
          </button>
        </div>
      </>
    );
    {
      /* <div className="hswrapper">
        <ul>
          <li>
            <ul> name: {data.name}</ul>
            <ul> height: {data.height}</ul>
            <ul> mass: {data.mass}</ul>
            <ul> hair_color: {data.hair_color}</ul>
            <ul> skin_color : {data.skin_color}</ul>
            <ul> eye_color: {data.eye_color}</ul>
            <ul> birth_year: {data.birth_year}</ul>
            <ul> gender: {data.gender}</ul>
            <ul> homeworld: {homeWorldName} </ul>
            <ul type="text"> films: {filmsTitle.join(", ")} </ul>
            <ul type="text"> vehicles: {vehicles.join(",")}</ul>
          </li>
        </ul>

      </div> */
    }
  }
}
