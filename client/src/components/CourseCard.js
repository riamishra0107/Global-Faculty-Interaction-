import React from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

const CourseCard = ({ title, description, image, pdfUrl }) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia component="img" image={image} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" href={pdfUrl} download>
          Download PDF
        </Button>
      </CardActions>
    </Card>
  );
};

export default CourseCard;
