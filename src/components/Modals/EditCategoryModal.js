import React, { useCallback, useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Row, Col, FormGroup, Input } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { CategoryActions } from '../../store/actions/CategoryActions';

const EditCategoryModal = () => {
    const [title, setTitle] = useState('');
    const isProgress = useSelector(store => store?.category?.isProgress);
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
        let body = {
            id: category.id,
            title: title
        };

        dispatch(CategoryActions.editCategory(body));

    }, [dispatch, title, category]);


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
                                <Input placeholder="Image" type="file" />
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