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
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        width: '100%'
    },
    section: {
        margin: 10,
        padding: 10,
        flex: 1
    },
    title1: {
        fontSize: 22
    },
    title2: {
        fontSize: 12
    },
    title3: {
        marginTop: 20,
        marginBottom: 10
    },
    ColumnNames: {
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: '#EB8725',
        color: 'white',
        paddingTop: 10,
        paddingBottom: 10 
    },
    TableEntry: {
        fontSize: 12,
        borderRight: 2,
        padding: 5,
        borderColor: '#EB8725' 
    },
    Table : {
        flexDirection: 'row',
        border: 2,
        borderColor: '#EB8725'
    }
});

function PdfDocument(/* props */) {
    // console.log('pdf props', props.data);
    return (
        <Document filename="somename.pdf" >
            <Page size="A3" style={styles.page} >
                <View style={styles.section}>
                    <Text style={styles.title1}>LaundrEZ</Text>
                    <Text style={styles.title2}>Date:12/12/2020</Text>
                    <Text style={styles.title3}>Order Details:</Text>
                    <View style={styles.ColumnNames}>
                        <Text style={[styles.TableEntry, { flex: 2 }]}>Name</Text>
                        <Text style={[styles.TableEntry, { flex: 2 }]}>Order#</Text>
                        <Text style={[styles.TableEntry, { flex: 7 }]}>Address</Text>
                        <Text style={[styles.TableEntry, { flex: 2 }]}>Order</Text>
                        <Text style={[styles.TableEntry, { flex: 1 }]}>Qty</Text>
                        <Text style={[styles.TableEntry, { flex: 2 }]}>PickUp</Text>
                        <Text style={[styles.TableEntry, { flex: 2 }]}>DropOff</Text>
                    </View>
                    <View style={styles.Table}>
                        <Text style={[styles.TableEntry, { flex: 2 }]}>Evaristo Lucena</Text>
                        <Text style={[styles.TableEntry, { flex: 2 }]}>EZ-588606</Text>
                        <Text style={[styles.TableEntry, { flex: 7 }]}>Apt 922 388 Richmond Street West, Apt 922, Toronto, Ontario
                        Instruction : 209
                            209</Text>
                        <View style={{ flex: 3 }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text style={[styles.TableEntry, { flex: 2 }]}>Wash & Fold 15 Lbs</Text>
                                <Text style={[styles.TableEntry, { flex: 1 }]}>1</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text style={[styles.TableEntry, { flex: 2 }]}>Bedsheets</Text>
                                <Text style={[styles.TableEntry, { flex: 1 }]}>2</Text>
                            </View>
                        </View>
                        <Text style={[styles.TableEntry, { flex: 2 }]}>9:00 - 10:00AM
                        12/05/2020</Text>
                        <Text style={[styles.TableEntry, { flex: 2, borderRight: 0 }]}>9:00 - 10:00AM
                        12/05/2020</Text>
                    </View>
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