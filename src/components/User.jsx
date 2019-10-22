import React, { useState, useEffect, useCallback } from "react";

import Edit from "@material-ui/icons/Edit";
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Home from "@material-ui/icons/Home";

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
                Name: {name}
                <br />
                Email: {email}
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
