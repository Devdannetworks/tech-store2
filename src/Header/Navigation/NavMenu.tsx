import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { useState } from "react";

const NavMenu = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <div>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItem button>
            <ListItemText primary="Home" onClick={toggleDrawer}></ListItemText>
          </ListItem>

          <ListItem button>
            <ListItemText primary="Shop" onClick={toggleDrawer}></ListItemText>
          </ListItem>

          <ListItem button>
            <ListItemText
              primary="Categories"
              onClick={toggleDrawer}
            ></ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};
export default NavMenu;
