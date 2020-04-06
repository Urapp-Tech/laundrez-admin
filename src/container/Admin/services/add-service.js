
import React, { useState, useCallback, useEffect } from 'react';
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
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { ServiceActions } from '../../../store/actions/ServiceActions';
import { CategoryActions } from '../../../store/actions/CategoryActions';


function AddService({ history }) {
    const dispatch = useDispatch();
    const [error, setError] = useState({ isError: false, message: '' });
    const categories = useSelector(store => store?.category?.categories);
    const isProgress = useSelector(store => store?.service?.isProgress);
    const [formValues, setFormValues] = useState({
        title: '',
        description: '',
        shortDescription: '',
        price: 0,
        minQty: 0,
        isActive: true,
        categoryId: '',
        file: null
    });
    useEffect(() => {
        dispatch(CategoryActions.getCategories(1, 1000));
    }, [dispatch]);

    const onImageSelect = useCallback((e) => {
        let img;
        let _URL = window.URL || window.webkitURL;
        let file = e.target.files[0];
        if (file) {
            img = new Image();
            let objectUrl = _URL.createObjectURL(file);
            img.onload = function () {
                if (this.height < 512) {
                    setError({ isError: true, message: 'image dimensions must be 512 x 512' });
                }
                else if (this.width < 512) {
                    setError({ isError: true, message: 'image dimensions must be 512 x 512' });
                }
                else if (error.isError) {
                    setError({ isError: false, message: '' });
                }
            };
            setFormValues({ ...formValues, file: file });
            img.src = objectUrl;
        }
    }, [error, setError, formValues]);


    const addService = useCallback((e) => {
        e.preventDefault();
        let fileSizeInMB = formValues.file?.size / 1000000;
        if (formValues.title.length < 3) {
            toast.error('title is too short');
            return;
        }
        else if (formValues.categoryId === '') {
            toast.error('please select category');
            return;
        }
        else if (formValues.description.length < 25) {
            toast.error('description is too short');
            return;
        }
        else if (formValues.shortDescription < 15) {
            toast.error('shortDescription is too short');
            return;
        }
        else if (!(/^\d+$/).test(formValues.minQty)) {
            toast.error('minQty must be a number');
            return;
        }
        else if (Number(formValues.minQty) === 0) {
            toast.error('minQty could not be zero');
            return;
        }
        else if (!(/^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/).test(formValues.price)) {
            toast.error('price must be a number with upto 2 decimal places');
            return;
        }
        else if (!formValues.file) {
            toast.error('please select image');
            return;
        }
        else if (fileSizeInMB > 11) {
            toast.error('file size is exceeding 11Mb');
            return;
        }
        else if (error.isError) {
            toast.error(error.message);
            return;
        }
        let formData = new FormData();
        formData.append('title', formValues.title);
        formData.append('categoryId', Number(formValues.categoryId));
        formData.append('description', formValues.description);
        formData.append('shortDescription', formValues.shortDescription);
        formData.append('minQty', Number(formValues.minQty));
        formData.append('price', parseFloat(formValues.price));
        formData.append('imageFile', formValues.file);
        dispatch(ServiceActions.addService(formData, history));

    }, [formValues, dispatch, error, history]);

    return (
        <>
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex justify-content-between" >
                            <CardTitle tag="h4">Add Service</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={addService} >
                                <Row>
                                    <Col sm="6">
                                        <FormGroup>
                                            <Label> Title </Label>
                                            <Input
                                                autoFocus
                                                placeholder="Title"
                                                type="text"
                                                value={formValues.title}
                                                onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col sm="6">
                                        <FormGroup>
                                            <Label for="exampleSelect">Categories</Label>
                                            <Input type="select"
                                                name="select"
                                                id="exampleSelect"
                                                value={formValues.categoryId}
                                                onChange={(e) => setFormValues({ ...formValues, categoryId: Number(e.target.value) })}

                                            >
                                                <option value={''} >Select Category</option>
                                                {
                                                    categories.map((v, i) => {
                                                        return (<option key={i} value={v.id} >{v.title}</option>);

                                                    })
                                                }

                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col sm="6">
                                        <FormGroup>
                                            <Label> Description </Label>
                                            <Input
                                                placeholder="Service Description"
                                                type="textarea"
                                                value={formValues.description}
                                                style={{ height: '10rem' }}
                                                onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col sm="6">
                                        <FormGroup>
                                            <Label> Short Description <b><i> Write 10-15 Characters</i> </b> </Label>
                                            <Input
                                                placeholder="Service Description ( Write 10-15 Characters ) "
                                                type="text"
                                                value={formValues.shortDescription}
                                                onChange={(e) => setFormValues({ ...formValues, shortDescription: e.target.value })}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col sm="6">
                                        <FormGroup>
                                            <Label> Min Order Qty </Label>
                                            <Input
                                                placeholder="Minimum QTY for order "
                                                type="text"
                                                value={formValues.minQty}
                                                onChange={(e) => setFormValues({ ...formValues, minQty: e.target.value })}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col sm="6">
                                        <FormGroup>
                                            <Label> Price </Label>
                                            <Input
                                                placeholder="0.00"
                                                type="text"
                                                value={formValues.price}
                                                onChange={(e) => setFormValues({ ...formValues, price: e.target.value })}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col sm="6">
                                        <FormGroup>
                                            <Label htmlFor="service-image" >Upload image with dimension 512 x 512 not exceeding 11Mb</Label>
                                            <Input
                                                id="service-image"
                                                type="file"
                                                name="file"
                                                onChange={onImageSelect}
                                            />
                                            {error.isError &&
                                                <label className="text-danger" >{error.message}</label>
                                            }
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Col sm="6" className="pl-0" >
                                    <Button type={'submit'} disabled={isProgress} className="btn-round btn-primary btn-add-modal" >
                                        {
                                            isProgress
                                                ?
                                                <div className="spinner" ></div>
                                                :
                                                ' Add Service'}
                                    </Button>
                                    <Button className="btn-round btn-default btn-add-modal" onClick={() => history.goBack()}  >Cancel</Button>
                                </Col>
                                <Row>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

AddService.propTypes = {
    history: PropTypes.object
};
export default AddService;
