import React, { useState, useEffect, useCallback } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Row, Col, FormGroup, Input, Label } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ServiceActions } from '../../store/actions/ServiceActions';
import { FaqActions } from '../../store/actions/FaqActions';
import { toast } from 'react-toastify';

const EditFaqModal = () => {

    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState({ question: '', answer: '', serviceId: '', id: 0 });
    const isProgress = useSelector(store => store?.faq?.isProgress);
    const services = useSelector(store => store?.service?.services);
    const isOpen = useSelector(store => store?.faq?.openEditModal);
    const faq = useSelector(store => store?.faq?.faq);
    useEffect(() => {
        dispatch(ServiceActions.getServices(1, 1000));
    }, [dispatch]);
    useEffect(() => {
        if (faq) {
            let { question, answer, serviceId, id } = faq;
            setFormValues({ question, answer, serviceId, id });
        }
    }, [faq]);

    const toggle = useCallback(() => {
        dispatch(FaqActions.toggleEditFaqModal());
    }, [dispatch]);
    const editFaq = useCallback((e) => {
        e.preventDefault();
        if (formValues.question.length < 3) {
            toast.error('title is too short');
            return;
        }
        else if (formValues.serviceId === '') {
            toast.error('please select service');
            return;
        }
        else if (formValues.answer.length < 10) {
            toast.error('description is too short');
            return;
        }
        let body = {
            id: formValues.id,
            question: formValues.question,
            answer: formValues.answer,
            serviceId: Number(formValues.serviceId)
        };
        dispatch(FaqActions.editFaq(body));

    }, [formValues, dispatch]);
    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
    return (
        <Modal autoFocus={false} centered={true} isOpen={isOpen} toggle={toggle} >
            <ModalHeader toggle={toggle} close={closeBtn}>Edit FAQ</ModalHeader>
            <Form onSubmit={editFaq} >
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
                                    placeholder="Question"
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
                                    placeholder="Description"
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
                                <span> Edit </span>
                        }
                    </Button>
                    <Button color="secondary" className="btn-round btn-cancel-modal " onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Form>
        </Modal>
    );

};
EditFaqModal.displayName = 'EditFaqModal';
EditFaqModal.propTypes = {
};
export default EditFaqModal;