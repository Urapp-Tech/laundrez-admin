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
        backgroundColor: '#ffffff'
    },
});

function PdfDocument(props) {
    // console.log('pdf props', props.data);
    return (
        <Document>
            <Page style={styles.page}>
                <View>
                    <Text>
                        Order Details:
                        {props.data}
                    </Text>
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