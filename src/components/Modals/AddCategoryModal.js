import React, { useState, useEffect, useCallback } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Row, Col, FormGroup, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryActions } from '../../store/actions/CategoryActions';
import { toast } from 'react-toastify';

const AddCategoryModal = () => {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const isProgress = useSelector(store => store?.category?.isProgress);
    const isOpen = useSelector(store => store?.category?.openAddModal);
    const dispatch = useDispatch();
    const toggle = useCallback(() => {
        dispatch(CategoryActions.toggleAddCategoryModal());
    }, [dispatch]);
    const addCategory = (e) => {
        e.preventDefault();
        if (title.length < 3) {
            toast.error('title is too short');
            return;
        }
        else if (!file) {
            toast.error('please select file');
            return;
        }
        let formData = new FormData();
        formData.append('title', title);
        formData.append('imageFile', file);
        dispatch(CategoryActions.addCategory(formData));
    };
    useEffect(() => {
        setTitle('');
        setFile('');
    }, [isOpen]);
    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
    return (
        <Modal backdrop={'static'} autoFocus={false} isOpen={isOpen} toggle={toggle} >
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
                                <label> Image </label>
                                <Input placeholder="Image" onChange={(e) => setFile(e.target.files[0])} type="file" />
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