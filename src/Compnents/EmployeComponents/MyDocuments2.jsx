import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#E4E4E4',


    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        alignItems: 'center'
    },
    image: {
        width: 100,
        height: 100
    },
    textSize: {
        fontSize: 18
    },
    companyTitle: {
        marginTop: 10
    },
    dateTime: {
        textAlign: "right",
        padding: 8
    }
});

const MyDocuments2 = () => {
    <Document>
        <Page size="A4" style={styles.page}>
          
            <View style={styles.dateTime}>
                <Text>{new Date().toLocaleDateString()}</Text>
            </View>
        </Page>
    </Document>
};

export default MyDocuments2;