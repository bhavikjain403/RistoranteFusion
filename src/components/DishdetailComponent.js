import React from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Component } from 'react';
import { Control, LocalForm, Errors } from "react-redux-form";
import { Row } from 'reactstrap';
import { Col } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const maxLength = (len)=>(val)=>!(val) || (val.length<=len);
const minLength = (len)=>(val)=>(val) && (val.length>=len);

class CommentForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            isModalOpen:false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal(){
        this.setState({
            isModalOpen : !this.state.isModalOpen
        })
    }

    handleSubmit(values){
        this.toggleModal()
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment)
    }

    render(){
        return(
            <>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                            <Row className='form-group'>
                                <Label htmlFor='rating' sm={12}>Rating</Label>
                                <Col sm={12}>
                                    <Control.select className='form-control' model='.rating' name='rating'>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                            <Label htmlFor='author' sm={12}>Your Name</Label>
                            <Col sm={12}>
                                <Control.text model=".author" id="author" name="author" placeholder="Your Name"
                                className='form-control'
                                validators={{minLength:minLength(3), maxLength:maxLength(15)}}/>
                                <Errors className="text-danger" model='.author' show='touched'
                                messages={{
                                    minLength: 'Must be greater than 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}/>
                            </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor="comment" sm={12}>Comment</Label>
                                <Col sm={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control"></Control.textarea>
                                </Col>
                            </Row>
                            <Button type='submit' color='primary'>Submit</Button>
                        </LocalForm>
                    </ModalBody>
            </Modal>
            <Button outline onClick={this.toggleModal}>
            <span className='fa fa-pencil fa-lg'>Submit Comment</span>
            </Button>
            </>
        )
    }
}

function RenderDish({dish}) {
        if (dish != null) {
            return (
                <Card> 
                  <CardImg width="100%" src={baseUrl+dish.image} alt={dish.name} />
                  <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                  </CardBody>
                </Card>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }
function RenderComments({comments, addComment, dishId}){
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
                <CommentForm dishId={dishId} addComment={addComment}/>
            </div>
        )
    }
    const DishDetail = (props)=>{
        if(props.isLoading){
            return(
                <div className='container'>
                    <div className='row'>
                        <Loading/>
                    </div>
                </div>
            )
        }
        else if(props.errMess){
            return(
                <div className='container'>
                    <div className='row'>
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            )
        }
        else if(props.dish!=null){
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
                    <div className='col-12 col-md-6'>
                        <RenderComments comments={props.comments} addComment ={props.addComment} dishId={props.dish.id}/>
                    </div>
                    </div>
                </div>
            </div>
        )}
        else
        return(<div></div>)
    }

export default DishDetail;