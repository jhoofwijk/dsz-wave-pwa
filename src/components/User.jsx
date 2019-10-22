import React from "react";

import Edit from "@material-ui/icons/Edit";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";

import { Link } from "react-router-dom";

export default function User(props) {
  const { name, email } = props.user;

  return (
    <Link to="/settings/" style={{ textDecoration: "none", color: "black" }}>
      <Card style={{ margin: "10px 0", borderRadius: 0 }}>
        <CardActionArea style={{ cursor: "pointer" }}>
          <CardContent>
            <div style={{ display: "flex" }}>
              <div style={{ flexGrow: 1 }}>
                Name: {name || "???"}
                <br />
                Email: {email || "???"}
              </div>
              <div>
                <Edit />
              </div>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
