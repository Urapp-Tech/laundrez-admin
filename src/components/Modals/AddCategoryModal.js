import React, { useState, useEffect, useCallback } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Row, Col, FormGroup, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryActions } from '../../store/actions/CategoryActions';
import { toast } from 'react-toastify';

const AddCategoryModal = () => {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState({ isError: false, message: '' });
    const isProgress = useSelector(store => store?.category?.isProgress);
    const isOpen = useSelector(store => store?.category?.openAddModal);
    const dispatch = useDispatch();
    const toggle = useCallback(() => {
        dispatch(CategoryActions.toggleAddCategoryModal());
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
            setFile(file);
            img.src = objectUrl;
        }
    }, [error, setError]);
    const addCategory = useCallback((e) => {
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
        else if (fileSizeInMB > 11) {
            toast.error('file size is exceeding 11Mb');
            return;
        }
        else if (error.isError) {
            toast.error(error.message);
            return;
        }
        let formData = new FormData();
        formData.append('title', title);
        formData.append('imageFile', file);
        dispatch(CategoryActions.addCategory(formData));
    }, [dispatch, title, file, error.isError, error.message]);
    useEffect(() => {
        setTitle('');
        setFile('');
    }, [isOpen]);
    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
    return (
        <Modal backdrop={'static'} centered={true} autoFocus={false} isOpen={isOpen} toggle={toggle} >
            <ModalHeader toggle={toggle} close={closeBtn}>Add Category</ModalHeader>
            <Form onSubmit={addCategory} >
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
                                <label> Upload image with dimension 512 x 512 not exceeding 11Mb</label>
                                <Input
                                    type="file"
                                    placeholder="Image"
                                    accept="image/x-png,image/jpg,image/jpeg"
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
                    <Button color="primary" type={'submit'} disabled={isProgress} className="btn-round btn-add-modal" >
                        {
                            isProgress ?
                                <div className="spinner" ></div>
                                :
                                <span> Add </span>
                        }
                    </Button>
                    <Button color="secondary" className="btn-round btn-cancel-modal " onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Form>
        </Modal>
    );

};
AddCategoryModal.displayName = 'AddCategoryModal';
AddCategoryModal.propTypes = {
};
export default AddCategoryModal;