import React, { useCallback, useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Row, Col, FormGroup, Input } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { CategoryActions } from '../../store/actions/CategoryActions';
import { toast } from 'react-toastify';

const EditCategoryModal = () => {
    const [title, setTitle] = useState('');
    const isProgress = useSelector(store => store?.category?.isProgress);
    const [error, setError] = useState({ isError: false, message: '' });
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
            setFile(file);
            img.src = objectUrl;
        }
    }, [error, setError]);

    const onEditClick = useCallback((e) => {
        e.preventDefault();
        let fileSizeInMB = file?.size / 1000000;
        if (title.length < 3) {
            toast.error('title is too short');
            return;
        }
        else if (!file) {
            toast.error('please select image');
            return;
        }
        else if (fileSizeInMB > 4) {
            toast.error('file size is exceeding 4Mb');
            return;
        }
        else if (error.isError) {
            toast.error(error.message);
            return;
        }
        let formData = new FormData();
        formData.append('id', category.id);
        formData.append('title', title);
        formData.append('imageFile', file);
        dispatch(CategoryActions.editCategory(formData));

    }, [dispatch, title, category, file, error]);


    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
    return (
        <Modal autoFocus={false} backdrop={'static'} centered={true} isOpen={isOpen} toggle={toggle} >
            <ModalHeader toggle={toggle} close={closeBtn}>Edit Category</ModalHeader>
            <Form onSubmit={onEditClick} >
                <ModalBody>
                    <Row className="justify-content-center" >
                        <Col sm="12">
                            <FormGroup>
                                <label> Title </label>
                                <Input autoFocus placeholder="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="justify-content-center" >
                        <Col sm="12">
                            <FormGroup>
                                <label>  Upload image with dimension 512 x 512 not exceeding 11Mb </label>
                                <Input
                                    placeholder="Image"
                                    type="file"
                                    accept="image/x-png,image/jpg,image/jpeg,image/svg+xml"
                                    onChange={onImageSelect}
                                />
                                {error.isError &&
                                    <label className="text-danger" >{error.message}</label>
                                }
                            </FormGroup>
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