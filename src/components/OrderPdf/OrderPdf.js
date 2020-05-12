import React from 'react';
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    
    // Image
} from '@react-pdf/renderer';
// import moment from 'moment';
import PropTypes from 'prop-types';

// const POSTER_PATH = 'https://image.tmdb.org/t/p/w154';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
        width:'100%'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

function PdfDocument(/* props */) {
    // console.log('pdf props', props.data);
    return (
        <Document  filename="somename.pdf" >
            <Page size="A4" style={styles.page} >
                <View style={styles.section}>
                    <Text>Section #1</Text>
                </View>
                <View style={styles.section}>
                    <Text>Section #2</Text>
                </View>
            </Page>
        </Document>
    );
}
PdfDocument.displayName = 'PdfDocument';
PdfDocument.propTypes = {
    data: PropTypes.object,
};
export default PdfDocument;