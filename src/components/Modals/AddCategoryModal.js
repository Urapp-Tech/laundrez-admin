import React, { memo, useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Row, Col, FormGroup, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { HttpService } from '../../store/services/HttpService';
import { API_URL } from '../../store/services/Config';
import { useDispatch } from 'react-redux';
import { CategoryActions } from '../../store/actions/CategoryActions';

const AddCategoryModal = memo(({ isOpen, toggle }) => {
    const [title, setTitle] = useState('');
    const [isProgress, setProgress] = useState(false);
    const dispatch = useDispatch();
    let _subscribe = null;
    const addCategory = () => {
        let body = {
            title: title
        };
        setProgress(true);
        _subscribe = HttpService.post(`${API_URL}/Category/`, body).subscribe(() => {
            setProgress(false);
            dispatch(CategoryActions.getCategories());
            toggle();
        }, () => {
            setProgress(false);
        }
        );
    };
    useEffect(() => {
        return () => {
            if (_subscribe)
                _subscribe.unsubscribe();
        };
    }, [_subscribe]);
    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
    return (
        <Modal backdrop={'static'} autoFocus={false} isOpen={isOpen} toggle={toggle} >
            <ModalHeader toggle={toggle} close={closeBtn}>Add Category</ModalHeader>
            <ModalBody>
                <Form>
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
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" disabled={isProgress} className="btn-round btn-add-modal" onClick={addCategory}>
                    {
                        isProgress ?
                            <div className="loader" ></div>
                            :
                            <span> Add </span>
                    }
                </Button>
                <Button color="secondary" className="btn-round btn-cancel-modal " onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );

});
AddCategoryModal.displayName = 'AddCategoryModal';
AddCategoryModal.propTypes = {
    isOpen: PropTypes.bool,
    toggle: PropTypes.func
};
export default AddCategoryModal;