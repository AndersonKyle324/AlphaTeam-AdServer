import React from "react";
import { Card, Button } from "react-bootstrap";

export default (props) => {
  var width=400;
  var height=200;
  
  if(props.ad.size === "Large"){
    width=960;
  }
  
  return (
    <Card
      {...props}
      variant="Light"
      border="secondary"
      style={{
        "height": height,
        "width": width,
        "text-align": props.ad.alignment, 
        "padding":"2em auto", 
        "padding-top":"2em", 
        "padding-left":"1em",
        "padding-right":"1em", 
        "font-family": "inherit"
      }}
    >
      <Card.Img src={props.ad.image} alt={props.ad.altText} />
      <Card.ImgOverlay>
        <div className="ad-text">
          <h3>{props.ad.title}</h3>
          <h5>{props.ad.subtitle}</h5>
        </div>
        <div className="redirect-btn">
          <Button onClick={() => window.open(props.ad.url)}>
            {props.ad.buttonText}
          </Button>
        </div>
      </Card.ImgOverlay>
    </Card>
  );
};
