import React from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem    } from 'reactstrap';
import { Link } from 'react-router-dom';



function RenderDish({dish}) {
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
function RenderComments({comments}){
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
    const DishDetail = (props)=>{

        // const dishItem = this.renderDish(this.props.dish);
        // const dishComment = this.renderComments(this.props.dish.comments);
        if(props.dish!=null){
        return (
            <div className='container'>
                <div className='row'>
                <div className='row'>
                    <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                    <h3>{props.dish.name}</h3>
                    <hr/>
                    </div>
                </div>
                    <div className='row'>
                    <div className='col-12 col-md-6'><RenderDish dish={props.dish}/></div>
                    <div className='col-12 col-md-6'><RenderComments comments={props.comments}/></div>
                    </div>
                </div>
            </div>
        )}
        else
        return(<div></div>)
    }

export default DishDetail;