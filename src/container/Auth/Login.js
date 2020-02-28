import React from 'react';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import PanelHeader from "../../components/PanelHeader/PanelHeader";

function Login() {
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row className="justify-content-center" >
          <Col md="6">
            <Card>
              <CardHeader>
                <h5 className="title">LaundrEZ</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row className="justify-content-center" >
                    <Col className="pl-1" md="8">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                          </label>
                        <Input placeholder="Email" type="email" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="justify-content-center" >
                    <Col className="pl-1" md="8">
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
                    <Col className="pl-1" md="8">
                      <Button
                        className="btn-primary btn-round btn-block"
                        color="default"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
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
  )
}
export default Login;