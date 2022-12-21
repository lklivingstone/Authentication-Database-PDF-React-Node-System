import { Page, Text, Image, Document, StyleSheet } from "@react-pdf/renderer"


const styles= StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35
    },
    text: {
        margin: 12,
        fontSize: 14,
    }
})

const PDFFile = ({ number, name, entryNumber, tokenNumber }) => {
    return (
       <Document>
        <Page>
            <Text>
                Entry: {entryNumber}
            </Text>
            <Text>
                Name: {name}
            </Text>
            <Text>
                Number: {number}
            </Text>
            <Text>
                Token: {tokenNumber}
            </Text>
        </Page>
       </Document>
    )
}

export default PDFFile