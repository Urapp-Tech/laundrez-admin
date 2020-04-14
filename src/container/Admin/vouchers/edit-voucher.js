
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
    FormGroup
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { VoucherActions } from '../../../store/actions/VoucherActions';
import moment from 'moment';


function EditVoucher({ history }) {
    const dispatch = useDispatch();
    const [notValid, setNotValid] = useState({ error: false, type: '', message: '' });
    const isProgress = useSelector(store => store?.voucher?.isProgress);
    const [formValues, setFormValues] = useState({
        code: '',
        validFrom: '',
        validTo: '',
        couponType: 'Promo',
        offerType: 'Amount',
        offerValue: 0,
        minProduct: 0,
        minAmount: 0,
        maxRedeem: 0,
        numberRedeem: 0,
        isActive: true,
        id: 0

    });


    useEffect(() => {
        let voucher = history?.location?.state?.voucher;
        if (voucher) {

            let {
                code,
                validFrom,
                validTo,
                couponType,
                offerType,
                offerValue,
                minProduct,
                minAmount,
                maxRedeem,
                numberRedeem,
                isActive,
                id
            } = voucher;


            setFormValues({
                code,
                validFrom: moment(validFrom).format('YYYY-MM-DD'),
                validTo: moment(validTo).format('YYYY-MM-DD'),
                couponType,
                offerType,
                offerValue,
                minProduct,
                minAmount,
                maxRedeem,
                numberRedeem,
                isActive,
                id
            });
        }
        else {
            history.goBack();
        }

    }, [dispatch, history]);


    const editVoucher = useCallback((e) => {
        e.preventDefault();
        if (notValid.error) {
            setNotValid({ error: false, type: '', message: '' });
        }
        if (formValues.code.length < 3) {
            setNotValid({ error: true, type: 'code', message: 'coupon code is too short' });
            return;
        }
        else if (formValues.validFrom === '') {
            setNotValid({ error: true, type: 'validFrom', message: 'please select valid date' });
            return;
        }
        else if (formValues.validTo === '') {
            setNotValid({ error: true, type: 'validTo', message: 'please select valid date' });
            return;
        }
        else if (new Date(formValues.validTo).getTime() < new Date(formValues.validFrom)) {
            setNotValid({ error: true, type: 'validTo', message: 'valid till must be greater than valid from' });
            return;
        }

        else if (Number(formValues.offerValue) === 0) {
            setNotValid({ error: true, type: 'offerValue', message: 'offer value  must be greater than 0' });
            return;
        }
        else if (Number(formValues.maxRedeem) === 0) {
            setNotValid({ error: true, type: 'maxRedeem', message: 'max redeem value  must be greater than 0' });
            return;
        }
        else if (Number(formValues.minProduct) === 0) {
            setNotValid({ error: true, type: 'minProduct', message: 'min product value  must be greater than 0' });
            return;
        }
        else if (Number(formValues.minAmount) === 0) {
            setNotValid({ error: true, type: 'minAmount', message: 'min amount value  must be greater than 0' });
            return;
        }
        let body = {
            code: formValues.code,
            validFrom: new Date(formValues.validFrom).toISOString(),
            validTo: new Date(formValues.validTo).toISOString(),
            couponType: formValues.couponType,
            offerType: formValues.offerType,
            offerValue: Number(formValues.offerValue),
            minProduct: Number(formValues.minProduct),
            minAmount: Number(formValues.minAmount),
            maxRedeem: Number(formValues.maxRedeem),
            numberRedeem: Number(formValues.numberRedeem),
            isActive: formValues.isActive,
            id: formValues.id
        };
        dispatch(VoucherActions.editVoucher(body, history));

    }, [formValues, dispatch, notValid, history]);

    
    return (
        <>
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex justify-content-between" >
                            <CardTitle tag="h4">Edit Voucher</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={editVoucher} >
                                <Row>
                                    <Col sm="6">
                                        <FormGroup>
                                            <label><span className="text-danger" >*</span> Coupon Code </label>
                                            <Input
                                                autoFocus
                                                placeholder="Coupon Code"
                                                type="text"
                                                value={formValues.code}
                                                onChange={(e) => setFormValues({ ...formValues, code: e.target.value })}
                                            />
                                            {(notValid.error && notValid.type === 'code') && <label className='ml-3 text-danger' >{notValid.message}</label>}
                                        </FormGroup>
                                    </Col>
                                    <Col sm="6">
                                        <FormGroup>
                                            <label><span className="text-danger" >*</span> Valid From </label>
                                            <Input
                                                placeholder="Valid From"
                                                type="date"
                                                value={formValues.validFrom}
                                                onChange={(e) => setFormValues({ ...formValues, validFrom: e.target.value })}
                                            />
                                            {(notValid.error && notValid.type === 'validFrom') && <label className='ml-3 text-danger' >{notValid.message}</label>}
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col sm="6">
                                        <FormGroup>
                                            <label><span className="text-danger" >*</span> Valid Till </label>
                                            <Input
                                                placeholder="Valid Till"
                                                type="date"
                                                value={formValues.validTo}
                                                onChange={(e) => setFormValues({ ...formValues, validTo: e.target.value })}
                                            />
                                            {(notValid.error && notValid.type === 'validTo') && <label className='ml-3 text-danger' >{notValid.message}</label>}
                                        </FormGroup>
                                    </Col>
                                    <Col sm="6">
                                        <FormGroup>
                                            <label><span className="text-danger" >*</span> Offer Value </label>
                                            <Input
                                                placeholder="Offer Value"
                                                type="number"
                                                value={formValues.offerValue}
                                                onChange={(e) => setFormValues({ ...formValues, offerValue: e.target.value })}
                                            />
                                            {(notValid.error && notValid.type === 'offerValue') && <label className='ml-3 text-danger' >{notValid.message}</label>}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="6">
                                        <FormGroup>
                                            <label><span className="text-danger" >*</span> Max Redeem </label>
                                            <Input
                                                placeholder="Max Redeem"
                                                type="number"
                                                value={formValues.maxRedeem}
                                                onChange={(e) => setFormValues({ ...formValues, maxRedeem: e.target.value })}
                                            />
                                            {(notValid.error && notValid.type === 'maxRedeem') && <label className='ml-3 text-danger' >{notValid.message}</label>}
                                        </FormGroup>
                                    </Col>
                                    <Col sm="6">
                                        <FormGroup>
                                            <label><span className="text-danger" >*</span> Redeemed </label>
                                            <Input
                                                placeholder="Redeemed"
                                                type="number"
                                                value={formValues.numberRedeem}
                                                onChange={(e) => setFormValues({ ...formValues, numberRedeem: e.target.value })}
                                            />
                                            {(notValid.error && notValid.type === 'numberRedeem') && <label className='ml-3 text-danger' >{notValid.message}</label>}
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col sm="6">
                                        <FormGroup>
                                            <label><span className="text-danger" >*</span> Min Products </label>
                                            <Input
                                                placeholder="Min Products"
                                                type="number"
                                                value={formValues.minProduct}
                                                onChange={(e) => setFormValues({ ...formValues, minProduct: e.target.value })}
                                            />
                                            {(notValid.error && notValid.type === 'minProduct') && <label className='ml-3 text-danger' >{notValid.message}</label>}
                                        </FormGroup>
                                    </Col>
                                    <Col sm="6">
                                        <FormGroup>
                                            <label><span className="text-danger" >*</span> Min Amount </label>
                                            <Input
                                                placeholder="Min Amount"
                                                type="number"
                                                value={formValues.minAmount}
                                                onChange={(e) => setFormValues({ ...formValues, minAmount: e.target.value })}
                                            />
                                            {(notValid.error && notValid.type === 'minAmount') && <label className='ml-3 text-danger' >{notValid.message}</label>}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="6">
                                        <FormGroup className=""  >
                                            <label><span className="text-danger" >*</span> Coupon Type </label>
                                            <Input
                                                type="select"
                                                value={formValues.couponType}
                                                onChange={(e) => setFormValues({ ...formValues, couponType: e.target.value })}
                                                name="select"
                                                id="coupon-type">
                                                <option value={'Promo'} >Promo</option>
                                                <option value={'Referral'} >Referral</option>
                                            </Input>
                                            {(notValid.error && notValid.type === 'couponType') && <label className='ml-3 text-danger' >{notValid.message}</label>}
                                        </FormGroup>
                                    </Col>
                                    <Col sm="6">
                                        <FormGroup className=""  >
                                            <label><span className="text-danger" >*</span> Offer Type </label>
                                            <Input
                                                type="select"
                                                value={formValues.offerType}
                                                onChange={(e) => setFormValues({ ...formValues, offerType: e.target.value })}
                                                name="select"
                                                id="offer-type"
                                            >
                                                <option value={'Amount'} >Amount</option>
                                                <option value={'Percentage'} >Percentage</option>
                                            </Input>
                                            {(notValid.error && notValid.type === 'offerType') && <label className='ml-3 text-danger' >{notValid.message}</label>}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="6">
                                        <div className="w-100" >
                                            <label><span className="text-danger" >*</span> Status</label>
                                        </div>
                                        <label className="mr-2 ml-2  " style={{ width: '3rem' }} >{formValues.isActive ? 'Active' : 'In Active'}</label>
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                value={formValues.isActive}
                                                checked={formValues.isActive}
                                                onChange={() => setFormValues({ ...formValues, isActive: !formValues.isActive })}
                                            />
                                            <span className="slider round"></span>
                                        </label>
                                    </Col>
                                </Row>
                                <Row className=" " >
                                    <Col sm="6" >
                                        <span className="text-danger" >*</span><span> Required fields</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="6">
                                        <Button className="btn-round btn-primary btn-add-modal" >

                                            {
                                                isProgress
                                                    ?
                                                    <div className="spinner" ></div>
                                                    :
                                                    ' Update'
                                            }
                                        </Button>
                                        <Button className="btn-round btn-default btn-add-modal" onClick={() => history.goBack()}  >Cancel</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

EditVoucher.propTypes = {
    history: PropTypes.object
};
export default EditVoucher;
