import React, { useCallback, useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Row, Col, FormGroup, Input } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { CategoryActions } from '../../store/actions/CategoryActions';

const EditCategoryModal = () => {
    const [title, setTitle] = useState('');
    const isProgress = useSelector(store => store?.category?.isProgress);
    // const [error, setError] = useState({ isError: false, message: '' });
    const [notValid, setNotValid] = useState({ error: false, type: '', message: '' });
    const [imageNotValid, setImageNotValid] = useState({ error: false, type: '', message: '' });
    const [file, setFile] = useState(null);
    const isOpen = useSelector(store => store?.category?.openEditModal);
    const category = useSelector(store => store?.category?.category);
    const dispatch = useDispatch();


    const toggle = useCallback(() => {
        dispatch(CategoryActions.toggleEditCategoryModal());
    }, [dispatch]);


    useEffect(() => {
        if (category) {
            setTitle(category.title);
        }
    }, [category]);


    useEffect(() => {
        setNotValid({ error: false, type: '', message: '' });
        setImageNotValid({ error: false, message: '' });

    }, [isOpen]);


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
                    setImageNotValid({ error: true, message: 'Image greater than 4 MB is not allowed' });
                }
                else if (imageNotValid.error) {
                    setImageNotValid({ error: false, message: '' });
                }
            };
            setFile(file);
            img.src = objectUrl;
        } else {
            setImageNotValid({ error: false, message: '' });
            setFile(file);
        }

    }, [imageNotValid]);
    

    const onEditClick = useCallback((e) => {
        e.preventDefault();
        if (notValid.error) {
            setNotValid({ error: false, type: '', message: '' });
        }
        if (title.length < 3) {
            setNotValid({ error: true, type: 'title', message: 'Title is too short' });
            return;
        }
        else if (file && imageNotValid.error) {
            return;
        }
        let formData = new FormData();
        formData.append('id', category.id);
        formData.append('title', title);
        formData.append('imageFile', file);
        dispatch(CategoryActions.editCategory(formData));

    }, [dispatch, title, category, file, imageNotValid, notValid]);


    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
    return (
        <Modal autoFocus={false} backdrop={'static'} centered={true} isOpen={isOpen} toggle={toggle} >
            <ModalHeader toggle={toggle} close={closeBtn}>Edit Category</ModalHeader>
            <Form onSubmit={onEditClick} >
                <ModalBody>
                    <Row className="justify-content-center" >
                        <Col sm="12">
                            <FormGroup>
                                <label><span className="text-danger" >*</span> Title </label>
                                <Input autoFocus placeholder="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                                {notValid.error && notValid.type === 'title' &&
                                    <label className=" ml-3 text-danger" >{notValid.message}</label>
                                }
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="justify-content-center" >
                        <Col sm="12">
                            <FormGroup>
                                <label>  Upload image with dimension 512 x 512 not exceeding 4Mb </label>
                                <Input
                                    placeholder="Image"
                                    type="file"
                                    accept="image/x-png,image/jpg,image/jpeg,image/svg+xml"
                                    onChange={onImageSelect}
                                />
                                {imageNotValid.error &&
                                    <label className=" ml-1 text-danger" >{imageNotValid.message}</label>
                                }
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className=" " >
                        <Col sm="6" className="py-0"  >
                            <span className="text-danger" >*</span><span> Required fields</span>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="btn-round btn-add-modal">
                        {
                            isProgress ?
                                <div className="spinner" ></div>
                                :
                                <span> Edit </span>
                        }
                    </Button>{' '}
                    <Button color="secondary" className="btn-round btn-cancel-modal " onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Form>
        </Modal>
    );

};
EditCategoryModal.displayName = 'EditCategoryModal';
EditCategoryModal.propTypes = {
};
export default EditCategoryModal;