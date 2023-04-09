import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import Grid from "@mui/material/Grid";
import Logo from "../Assets/Blog logo.png";
import "../Styles/Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState(0);
  return (
    <Grid container  >
      <Grid item xs={12} md={12}>
        <AppBar
          position="sticky"
          sx={{
            background:
              "linear-gradient(90deg, rgba(27,24,78,1) 0%, rgba(147,36,22,1) 51%, rgba(198,156,52,1) 89%)",
          }}
        >
          <Toolbar >
            <div>
              <img className="logo" src={Logo} alt="" />
            </div>
            
            <Typography  variant="h3"><span className="headfont">BlogsApp</span></Typography>
            
            <Box display="flex" marginLeft="auto">
              {isLoggedIn && (
                <Button
                  onClick={() => dispatch(authActions.logout())}
                  LinkComponent={Link}
                  to="/"
                  variant="contained"
                  sx={{ margin: 2, borderRadius: 10 }}
                  color="error"
                >
                  Logout
                </Button>
              )}
            </Box>
          </Toolbar>
          {isLoggedIn && (
              <Box display="flex" margin="auto">
                <div className="functnButton">
                  <Tabs
                    textColor="inherit"
                    value={value}
                    onChange={(e, val) => {
                      setValue(val);
                    }}
                  >
                    <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
                    <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs" />
                    <Tab LinkComponent={Link} to="/blogs/add" label="Add Blogs" />
                  </Tabs>
                </div>
              </Box>
            )}
        </AppBar>
      </Grid>
    </Grid>
  );
};

export default Header;
