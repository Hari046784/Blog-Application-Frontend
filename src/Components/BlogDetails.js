import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, InputLabel, TextField, Typography, Button } from "@mui/material";
import { REACT_APP_BASE_URL } from "../URLData";

const labelStyle = {
  mb: 1,
  mt: 1,
  fontSize: "20px",
  fontWeight: "bold",
  color: "#13005A",
};

const BlogDetail = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  const [blog, setBlog] = useState();
  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const fetchDetails = async () => {
    const res = await axios
      .get(`${REACT_APP_BASE_URL}/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
      });
    });
  }, [id]);// eslint-disable-next-line react-hooks/exhaustive-deps
  console.log(blog);

  const sendRequest = async () => {
    const res = await axios
      .put(`${REACT_APP_BASE_URL}/api/blog/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => navigate("/myBlogs"));
  };
  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
            backgroundColor="#b9af8f"
            borderRadius={10}
            boxShadow="10px 10px 20px #ccc"
            padding={5}
            margin="auto"
            marginTop={3}
            display="flex"
            flexDirection="column"
            width="35%"
          >
            <Typography
              fontStyle={"-moz-initial"}
              fontWeight={"bold"}
              color="#d52c16"
              variant="h3"
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
      )}
    </div>
  );
};

export default BlogDetail;
