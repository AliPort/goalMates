import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { Link } from "react-router-dom";

function DrawerComponent() {
  return (
    
      <Drawer>
        <List>
         <ListItem>
            <ListItemText>
              <Link to="/">Home</Link>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Link to="/search">Search</Link>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Link to="/signup">Sign Up</Link>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
  );
}
export default DrawerComponent;
