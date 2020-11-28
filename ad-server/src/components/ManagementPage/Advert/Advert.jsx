import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default (props) => {
    const ad = ({
        url: '',
        size: '',
        image: '',
        altText: '',
        title: '',
        subtitle: '',
    });

    return (
        <Card 
            {...props}
            variant="Light"
            onClick={() => window.open(props.ad.url)} 
            border="secondary" 
            size={props.ad.size}
            centered
        >
            <Card.Img src={props.ad.image} alt={props.ad.altText} />
            <Card.ImgOverlay>
                <Card.Title>{props.ad.title}</Card.Title>
                <Card.Text>{props.ad.subtitle} </Card.Text>
            </Card.ImgOverlay>
        </Card>
    );
}