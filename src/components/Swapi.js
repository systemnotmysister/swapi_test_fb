import React, { useState, useEffect, useContext, createContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { Context } from "./Facebook";
export let contextID = createContext();

export default function Swapi() {
  useContext({ Context });
  let history = useHistory();
  const url = "https://swapi.dev/api/people/";
  const [data, setData] = useState(null);
  console.log(Context, "swapi context before fetch");

  useEffect(() => {
    const fetchData = async () => {
      if (Context.connected) {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        console.log(json);
        console.log(Context, "this is context in swapi due to fectch");
      }
    };
    fetchData();
    return data;
  }, []);

  if (!Context.connected)
    return (
      <div>
        {" "}
        <h1>you are not connected</h1>
        <button onClick={() => history.push("/")}> Back To Login</button>
      </div>
    );

  if (!data) return <> Loading...</>;
  console.log(Context, "swapi context after fetch");

  if (data) {
    return (
      <div>
        {data.results.map((it, index) => (
          <Link to={`/people/${index + 1}`} style={{ color: "black" }}>
            {" "}
            <ul>
              {" "}
              <li className="hlist">{it.name} </li>{" "}
            </ul>
          </Link>
        ))}
        <button className="hlistbtn" onClick={() => history.push("/")}>
          {" "}
          Back To Login
        </button>{" "}
      </div>
    );
  } else
    return (
      <div>
        {" "}
        <h1>you are not connected</h1>
        <button className="hlistbtn" onClick={() => history.push("/")}>
          {" "}
          Back To Login
        </button>
      </div>
    );
}
