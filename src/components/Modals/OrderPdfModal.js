import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, Row, Col, Container, ModalFooter, ModalHeader, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import PdfDocument from '../OrderPdf/OrderPdf';


const OrderPdfModal = ({ isOpen, toggle }) => {

    const [open, setOpen] = useState(false);

    useEffect(() => {

        if (isOpen) {
            setTimeout(() => {
                setOpen(true);
            }, 100);
        }
        else {
            setOpen(false);
        }
    }, [isOpen]);

    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;

    return (
        <Modal isOpen={isOpen} centered={true} toggle={toggle} size={'lg'}>
            <ModalHeader toggle={toggle} close={closeBtn}>
                Order Pdf
            </ModalHeader>
            <ModalBody>
                <Container>
                    <Row>
                        <Col md={12}>
                            {open && <PDFViewer className='w-100' style={{ height: '30rem' }} ><PdfDocument data={{ a: 'b' }} /></PDFViewer>}
                        </Col>
                    </Row>
                </Container>
            </ModalBody>
            <ModalFooter>
                {open && <Button color='primary'><PDFDownloadLink document={<PdfDocument />} style={{color:'white'}} fileName="somename.pdf">
                    {({ /* blob, url, */ loading,/*  error */ }) => (loading ? 'Loading document...' : 'Download Pdf')}
                </PDFDownloadLink></Button>}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

OrderPdfModal.displayName = 'OrderPdfModal';
OrderPdfModal.propTypes = {
    isOpen: PropTypes.bool,
    toggle: PropTypes.func
};

export default OrderPdfModal;