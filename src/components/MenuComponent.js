import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

//All are implemented using functional commponents but different ways are used

//Function 1
function RenderMenuItem({ dish }) {
  return (
    <Card>
      <Link to={`/menu/${dish.id}`}>
      <CardImg width="100%" src={dish.image} alt={dish.name} />
      <CardImgOverlay>
        <CardTitle>{dish.name}</CardTitle>
      </CardImgOverlay>
    </Link>
    </Card >
  );
}

//Function 2 : Also can be written as function Menu(props)
const Menu = (props) => {
  const menu = props.dishes.map((dish) => {
    return (
      <div key={dish.id} className="col-12 col-md-5 m-1">
        <RenderMenuItem dish={dish} />
      </div>
    );
  });

  return (
    <div className="container">
      <div className='row'>
        <Breadcrumb>
        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
        <BreadcrumbItem active>Menu</BreadcrumbItem>
        </Breadcrumb>
        <div className='col-12'>
          <h3>Menu</h3>
          <hr/>
        </div>
      </div>
      <div className="row">
        {menu}
      </div>
    </div>
  );
}

export default Menu;