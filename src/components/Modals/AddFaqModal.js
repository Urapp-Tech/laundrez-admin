import React, { useCallback, useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Row, Col, FormGroup, Input, Label } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { FaqActions } from '../../store/actions/FaqActions';
import { ServiceActions } from '../../store/actions/ServiceActions';
import { toast } from 'react-toastify';

const AddFaqModal = () => {
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState({ question: '', answer: '', serviceId: '' });
    const isProgress = useSelector(store => store?.faq?.isProgress);
    const services = useSelector(store => store?.service?.services);
    const isOpen = useSelector(store => store?.faq?.openAddModal);
    useEffect(() => {
        dispatch(ServiceActions.getServices(1, 1000));
    }, [dispatch]);
    useEffect(() => {
        setFormValues({ question: '', answer: '', serviceId: '' });
    }, [isOpen]);

    const toggle = useCallback(() => {
        dispatch(FaqActions.toggleAddFaqModal());
    }, [dispatch]);
    const addFaq = useCallback((e) => {
        e.preventDefault();
        if (formValues.question.length < 3) {
            toast.error('title is too short');
            return;
        }
        else if (formValues.serviceId === '') {
            toast.error('please select category');
            return;
        }
        else if (formValues.answer.length < 10) {
            toast.error('description is too short');
            return;
        }
        let body = {
            question: formValues.question,
            answer: formValues.answer,
            serviceId: Number(formValues.serviceId)
        };
        dispatch(FaqActions.addFaq(body));

    }, [formValues, dispatch]);
    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
    return (
        <Modal autoFocus={false} centered={true} isOpen={isOpen} toggle={toggle} >
            <ModalHeader toggle={toggle} close={closeBtn}>Add FAQ</ModalHeader>
            <Form onSubmit={addFaq} >
                <ModalBody>
                    <Row className="justify-content-center" >
                        <Col sm="12">
                            <FormGroup>
                                <Label for="exampleSelect">Services</Label>
                                <Input type="select"
                                    name="select"
                                    value={formValues.serviceId}
                                    onChange={(e) => setFormValues({ ...formValues, serviceId: e.target.value })}
                                    id="exampleSelect">
                                    <option value={''} >Select Service</option>
                                    {
                                        services.map((v, i) => {
                                            return (<option key={i} value={v.id} >{v.title}</option>);

                                        })
                                    }
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="justify-content-center" >
                        <Col sm="12">
                            <FormGroup>
                                <label> Question </label>
                                <Input
                                    autoFocus
                                    placeholder="Title"
                                    type="text"
                                    value={formValues.question}
                                    onChange={(e) => setFormValues({ ...formValues, question: e.target.value })}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="justify-content-center" >
                        <Col sm="12">
                            <FormGroup>
                                <Label for="description"> Description </Label>
                                <Input
                                    id="description"
                                    type="textarea"
                                    name="text"
                                    value={formValues.answer}
                                    onChange={(e) => setFormValues({ ...formValues, answer: e.target.value })}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className="btn-round btn-add-modal"
                        type={'submit'}
                    >
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
AddFaqModal.displayName = 'AddFaqModal';
AddFaqModal.propTypes = {
};
export default AddFaqModal;