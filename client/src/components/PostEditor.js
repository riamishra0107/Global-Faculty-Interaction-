import {
  Button,
  Card,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Fab from "@mui/material/Fab";
// import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/posts";
import ErrorAlert from "./ErrorAlert";
import { isLoggedIn } from "../helpers/authHelper";
import HorizontalStack from "./util/HorizontalStack";
import UserAvatar from "./UserAvatar";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { storage } from "./firebaseconfig";

const PostEditor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imagelink: "",
  });

  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});
  const user = isLoggedIn();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const errors = validate();
    setErrors(errors);
  };
  const [imglink, setimglink] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image) {
      const imageRef = ref(storage, `/images/${image.name}`);
      uploadBytes(imageRef, image)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((downloadURL) => {
              // Once image is uploaded, get the download URL
              console.log("Image URL:", downloadURL);
              setimglink(downloadURL);

              // Set the imagelink property of formData to downloadURL
              const updatedFormData = { ...formData, imagelink: downloadURL };
              console.log(updatedFormData);
              setLoading(true);
              createPost(updatedFormData, isLoggedIn())
                .then((data) => {
                  setLoading(false);
                  if (data && data.error) {
                    setServerError(data.error);
                  } else {
                    navigate("/posts/" + data._id);
                  }
                })
                .catch((err) => {
                  console.error("Error creating post", err);
                });
            })
            .catch((err) => {
              console.error("Error getting download URL from Firebase", err);
            });
        })
        .catch((err) => {
          console.error("Error uploading image to Firebase Storage", err);
        });
    }
  };

  const validate = () => {
    const errors = {};

    return errors;
  };
  const [image, setImage] = useState("");

  return (
    <Card>
      <Stack spacing={1}>
        {user && (
          <HorizontalStack spacing={2}>
            <UserAvatar width={50} height={50} username={user.username} />
            <Typography variant="h5">
              What would you like to post today {user.username}?
            </Typography>
          </HorizontalStack>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            required
            name="title"
            margin="normal"
            onChange={handleChange}
            error={errors.title !== undefined}
            helperText={errors.title}
          />
          <TextField
            fullWidth
            label="Content"
            multiline
            rows={10}
            name="content"
            margin="normal"
            onChange={handleChange}
            error={errors.content !== undefined}
            helperText={errors.content}
            required
          />
          <label htmlFor="upload-photo">
            <input
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              style={{ display: "none" }}
              id="upload-photo"
              name="upload-photo"
              type="file"
            />

            <Fab
              color="secondary"
              size="small"
              component="span"
              aria-label="add"
              variant="extended"
            >
              Upload photo
            </Fab>
          </label>
          <ErrorAlert error={serverError} />
          <Button
            variant="outlined"
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              mt: 2,
            }}
          >
            {loading ? <>Submitting</> : <>Submit</>}
          </Button>
        </Box>
      </Stack>
    </Card>
  );
};

export default PostEditor;
