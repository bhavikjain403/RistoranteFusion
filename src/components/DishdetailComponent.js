import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardBody, CardText, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    renderDish(dish) {
        if (dish != null) {
            return (
                <Card> 
                  <CardImg width="100%" src={dish.image} alt={dish.name} />
                  <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                  </CardBody>
                </Card>
            );
        }
        else {
            return (
                <div></div>     // return empty div so that nothing is rendered on screen
            );
        }
    }
    renderComments(comments){
        if (comments == null) {
            return (<div></div>)
        }
        const cmnts = comments.map(comment => {
        return (
            <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>-- {comment.author},
                &nbsp;
                {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                }).format(new Date(Date.parse(comment.date)))}
                </p>
            </li>
        )
        }
    )
        return (
            <div>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {cmnts}
                </ul>
            </div>
        )
    }
    render(){
        let dish = this.props.dish
        
        if (dish == null) {
            return (<div></div>);
        }

        const dishItem = this.renderDish(this.props.dish);
        const dishComment = this.renderComments(this.props.dish.comments);

        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-12 col-md-5 m-1'>
                        {dishItem}
                    </div>
                    <div className='col-12 col-md-5 m-1'>
                        {dishComment}    
                    </div>
                </div>
            </div>
        )
    }
}

export default DishDetail;