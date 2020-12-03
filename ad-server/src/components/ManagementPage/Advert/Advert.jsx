import React from "react";
import { Card, Button } from "react-bootstrap";
import { Container } from "react-grid-system";

export default (props) => {
  return (
    <Card
      {...props}
      variant="Light"
      border="secondary"
      // size={props.ad.size}
      style={{
        height: "150px",
        width: "500px",
      }}
    >
      <Card.Img src={props.ad.image} alt={props.ad.altText} />
      <Card.ImgOverlay>
        <Container
          style={{
            "text-align": "center",
            "font-family": "inherit",
            "margin-top": "20px",
          }}
          // fluid={props.ad.size}
        >
          <Card.Title>{props.ad.title}</Card.Title>
          <Card.Text>{props.ad.subtitle} </Card.Text>
          <div
            className="btn-pos"
            style={{ "text-align": props.ad.buttonAlign }}
          >
            <Button
              onClick={() => window.open(props.ad.url)}
              style={{ "": props.ad.buttonAlign }}
            >
              {props.ad.buttonText}
            </Button>
          </div>
        </Container>
      </Card.ImgOverlay>
    </Card>
  );
};
