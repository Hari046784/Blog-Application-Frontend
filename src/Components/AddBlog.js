import { Box, InputLabel, TextField, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { REACT_APP_BASE_URL } from "../URLData";
import { useNavigate } from "react-router-dom";

const labelStyle = {
  mb: 1,
  mt: 1,
  fontSize: "25px",
  fontWeight: "400",
  color: "#1e2038",
};
const Addblog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const res = await axios
      .post(`${REACT_APP_BASE_URL}/api/blog/add`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.imageURL,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => navigate("/Blogs"));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          backgroundColor="#b9af8f"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={5}
          margin="auto"
          marginTop={5}
          marginBottom={5}
          display="flex"
          flexDirection="column"
          width="35%"
          
        >
          <Typography
            fontStyle={"-moz-initial"}
            fontWeight={"bold"}
            color="#d52c16"
            variant="h4"
            textAlign={"center"}
          >
            Post Your Blog
          </Typography>
          <InputLabel sx={labelStyle}>Title:</InputLabel>
          <TextField
            name="title"
            onChange={handleChange}
            value={inputs.title}
            margin="normal"
            variant="outlined"
          />
          <InputLabel sx={labelStyle}>Description:</InputLabel>
          <TextField
            name="description"
            onChange={handleChange}
            value={inputs.description}
            margin="normal"
            variant="outlined"
          />
          <InputLabel sx={labelStyle}>Image URL:</InputLabel>
          <TextField
            name="imageURL"
            onChange={handleChange}
            value={inputs.imageURL}
            margin="normal"
            variant="outlined"
          />
          <Button
            sx={{ mt: 2, borderRadius: 4, width:130, ml:25 }}
            variant="contained"
            color="success"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Addblog;