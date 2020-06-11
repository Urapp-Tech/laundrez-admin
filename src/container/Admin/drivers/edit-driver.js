
import React, { useState, useCallback, useEffect, /* useEffect */ } from 'react';
import PropTypes from 'prop-types';

// reactstrap components
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Row,
    Col,
    Button,
    Input,
    Form,
    FormGroup,
    Label
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { DriverActions } from '../../../store/actions/DriverActions';
import Map from '../../../components/Map/Map';


function EditDriver({ history }) {
    const dispatch = useDispatch();
    const [notValid, setNotValid] = useState({ error: false, type: '', message: '' });
    const [imageNotValid, setImageNotValid] = useState({ error: false, type: '', message: '' });
    const isProgress = useSelector(store => store?.driver?.isProgress);
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        licence: '',
        contactNumber: '',
        lat: '',
        lng: '',
        file: '',
        id: ''
    });

    useEffect(() => {
        let driver = history?.location?.state?.driver;

        if (driver) {
            let {
                contactNumber,
                email,
                lat,
                licence,
                lng,
                name,
                id
            } = driver;
            setFormValues({
                contactNumber,
                email,
                lat,
                licence,
                lng,
                name,
                id
            });
        }
        else {
            history.goBack();
        }
    }, [history]);

    const onLocationSelect = useCallback((lat, lng) => {
        setFormValues({ ...formValues, lat, lng });
    }, [formValues]);

    const onImageSelect = useCallback((e) => {
        let img;
        let _URL = window.URL || window.webkitURL;
        let file = e.target.files[0];
        if (file) {
            let fileSizeInMB = file?.size / 1000000;
            img = new Image();
            let objectUrl = _URL.createObjectURL(file);
            img.onload = function () {
                if (this.height < 512) {
                    setImageNotValid({ error: true, message: 'Image dimensions must be atleast 512x512' });
                }
                else if (this.width < 512) {
                    setImageNotValid({ error: true, message: 'Image dimensions must be atleast 512x512' });
                }
                else if (fileSizeInMB > 4) {
                    setImageNotValid({ error: true, message: 'File size is exceeding 4MB' });
                }
                else if (imageNotValid.error) {
                    setImageNotValid({ error: false, message: '' });
                }
            };
            setFormValues({ ...formValues, file: file });
            img.src = objectUrl;
        } else {
            setImageNotValid({ error: false, message: '' });
            setFormValues({ ...formValues, file: file });
        }
    }, [formValues, imageNotValid]);


    const EditDriver = useCallback((e) => {
        e.preventDefault();
        if (notValid.error) {
            setNotValid({ error: false, type: '', message: '' });
        }
        if (!formValues.name) {
            setNotValid({ error: true, type: 'name', message: 'Please provide name' });
            return;
        }
        if (formValues.name.length < 3) {
            setNotValid({ error: true, type: 'name', message: 'Name is too short' });
            return;
        }
        if (
            !(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).test(formValues.email)
        ) {
            setNotValid({ error: true, type: 'email', message: 'Email is not valid' });
            return;
        }
        if (!formValues.contactNumber) {
            setNotValid({ error: true, type: 'contactNumber', message: 'Please provide contact number' });
            return;
        }
        if (!(/[+](1)?[0-9]{11}$/g.test(formValues.contactNumber))) {
            setNotValid({ error: true, type: 'contactNumber', message: 'Please provide a valid contact number matching the format +1XXXXXXXXXX' });
            return;
        }
        if (!formValues.licence) {
            setNotValid({ error: true, type: 'licence', message: 'Please provide licence' });
            return;
        }
        if (formValues.licence.length < 6 || formValues.licence.length > 6) {
            setNotValid({ error: true, type: 'licence', message: 'License number must contain 6 characters' });
            return;
        }
        if (!formValues.lat && !formValues.lng) {
            setNotValid({ error: true, type: 'location', message: 'Please select driver location from map' });
            return;
        }


        if (formValues.file && imageNotValid.error) {
            return;
        }
        let formData = new FormData();
        formData.append('id', formValues.id);
        formData.append('name', formValues.name);
        formData.append('email', formValues.email);
        formData.append('licence', formValues.licence);
        formData.append('contactNumber', formValues.contactNumber);
        formData.append('lat', formValues.lat);
        formData.append('lng', formValues.lng);
        formData.append('profilePicture', formValues.file);
        dispatch(DriverActions.editDriver(formData, history));


    }, [formValues, dispatch, history, notValid, imageNotValid]);

    return (
        <>
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex justify-content-between" >
                            <CardTitle tag="h4">Add Driver</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col md={6} >
                                    <Form onSubmit={EditDriver} >
                                        <Row className="" >
                                            <Col sm="12">
                                                <FormGroup>
                                                    <label>
                                                        Name
                          </label>
                                                    <Input
                                                        autoFocus
                                                        placeholder="Name"
                                                        type="name"
                                                        value={formValues.name}
                                                        onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                                                    />
                                                    {notValid.error && notValid.type === 'name' &&
                                                        <label className=" ml-3 text-danger" >{notValid.message}</label>
                                                    }
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row className="justify-content-center" >
                                            <Col sm="12">
                                                <FormGroup>
                                                    <label>
                                                        Email address
                          </label>
                                                    <Input
                                                        placeholder="Email"
                                                        type="email"
                                                        value={formValues.email}
                                                        onChange={(e) => setFormValues({ ...formValues, email: e.target.value })} />
                                                    {notValid.error && notValid.type === 'email' &&
                                                        <label className=" ml-3 text-danger" >{notValid.message}</label>
                                                    }
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row className="justify-content-center" >
                                            <Col sm="12">
                                                <FormGroup>
                                                    <label>Contact Number</label>
                                                    <Input
                                                        placeholder="Contact Number"
                                                        type="tel"
                                                        value={formValues.contactNumber}
                                                        onChange={(e) => setFormValues({ ...formValues, contactNumber: e.target.value })}
                                                    />
                                                    {notValid.error && notValid.type === 'contactNumber' &&
                                                        <label className=" ml-3 text-danger" >{notValid.message}</label>
                                                    }
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row className="justify-content-center" >
                                            <Col sm="12">
                                                <FormGroup>
                                                    <label>License Number <i>Driver will Use This Number To Login At App</i> </label>
                                                    <Input
                                                        placeholder="License Number"
                                                        type="text"
                                                        value={formValues.licence}
                                                        onChange={(e) => setFormValues({ ...formValues, licence: e.target.value })}
                                                    />
                                                    {notValid.error && notValid.type === 'licence' &&
                                                        <label className=" ml-3 text-danger" >{notValid.message}</label>
                                                    }
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row className="justify-content-center" >
                                            <Col sm="6">
                                                <FormGroup>
                                                    <label>Latitude </label>
                                                    <Input
                                                        placeholder="Latitude"
                                                        type="text"
                                                        readOnly
                                                        value={formValues.lat}
                                                    />

                                                </FormGroup>
                                            </Col>
                                            <Col sm="6">
                                                <FormGroup>
                                                    <label>Longitude</label>
                                                    <Input
                                                        placeholder="Longitude"
                                                        type="text"
                                                        readOnly
                                                        value={formValues.lng}
                                                    />

                                                </FormGroup>
                                            </Col>
                                            {notValid.error && notValid.type === 'location' &&
                                                <label className=" ml-3 text-danger" >{notValid.message}</label>
                                            }
                                        </Row>
                                        <Row>
                                            <Col sm="12">
                                                <FormGroup>
                                                    <Label htmlFor="service-image" >Upload image with minimum dimension of 512 x 512 not exceeding 4MB</Label>
                                                    <Input
                                                        id="service-image"
                                                        type="file"
                                                        name="file"
                                                        accept="image/x-png,image/jpg,image/jpeg,image/svg+xml"
                                                        onChange={onImageSelect}
                                                    />
                                                    {imageNotValid.error &&
                                                        <label className=" ml-1 text-danger" >{imageNotValid.message}</label>
                                                    }
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Col sm="12" className="pl-0" >
                                            <Button type={'submit'} disabled={isProgress} className="btn-round btn-primary btn-add-modal" >
                                                {
                                                    isProgress
                                                        ?
                                                        <div className="spinner" ></div>
                                                        :
                                                        ' Edit Driver'}
                                            </Button>
                                            <Button className="btn-round btn-default btn-add-modal" onClick={() => history.goBack()}  >Cancel</Button>
                                        </Col>
                                    </Form>

                                </Col>
                                <Col md={6} >
                                    <Map height={'600px'} lat={Number(formValues.lat)} lng={Number(formValues.lng)} showMarker={true} onLocationSelect={onLocationSelect} />
                                </Col>

                            </Row>

                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

EditDriver.propTypes = {
    history: PropTypes.object
};
export default EditDriver;
