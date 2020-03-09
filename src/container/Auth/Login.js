import React, { useCallback } from 'react';
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from 'reactstrap';
import logo from '../../assets/img/Logo.svg';
import PropTypes from 'prop-types';

function Login({ history }) {


  const onLoginClick = useCallback((e) => {
    e.preventDefault();
    localStorage.setItem('token', 'asdfasdfads');
    history.replace('/admin/orders');
  }, [history]);


  return (
    <>

      <div className="content ">

        <Row className="height-100 justify-content-center" >
          <Col sm="12" md="9" lg="5"  >
            <Card className="card-user vertical-center " >
              <CardBody>
                <div className="author">
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar "
                      src={logo}
                    />
                    {/* <h5 className="title">Mike Andrew</h5> */}
                  </a>
                  {/* <p className="description">michael24</p> */}
                </div>
                <Form>
                  <Row className="justify-content-center" >
                    <Col sm="8">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                          </label>
                        <Input placeholder="Email" type="email" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="justify-content-center" >
                    <Col sm="8">
                      <FormGroup>
                        <label>Password</label>
                        <Input
                          defaultValue="Andrew"
                          placeholder="Password"
                          type="password"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="justify-content-center" >
                    <Col sm="8">
                      <Button
                        className="btn-primary btn-round btn-block"
                        color="default"
                        href="#pablo"
                        onClick={onLoginClick}
                        size="lg"
                      >
                        Login
                    </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
Login.propTypes = {
  history: PropTypes.object
};
export default Login;