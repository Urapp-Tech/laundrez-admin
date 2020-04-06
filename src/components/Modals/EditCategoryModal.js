import React, { useCallback, useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Row, Col, FormGroup, Input } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { CategoryActions } from '../../store/actions/CategoryActions';
import { toast } from 'react-toastify';

const EditCategoryModal = () => {
    const [title, setTitle] = useState('');
    const isProgress = useSelector(store => store?.category?.isProgress);
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

    const onEditClick = useCallback((e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('id', category.id);
        if (title.length < 3) {
            toast.error('title is too short');
            return;
        }
        formData.append('title', title);
        if (file) {
            formData.append('imageFile', file);
        }
        dispatch(CategoryActions.editCategory(formData));

    }, [dispatch, title, category, file]);


    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
    return (
        <Modal autoFocus={false} isOpen={isOpen} toggle={toggle} >
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
                                <label> Image </label>
                                <Input
                                    placeholder="Image"
                                    type="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
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