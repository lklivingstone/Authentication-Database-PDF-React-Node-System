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

// key={row.tokenNumber}
//                     entryNumber= {row.entryNumber}
//                     name={row.name}
//                     number={row.number}
//                     tokenNumber= {row.tokenNumber}

const PDFFiles = ({ rows }) => {
    return (
       <Document>
        {rows.map((row)=> (
            <Page key={row.tokenNumber}>
                <Text>
                    Entry: {row.entryNumber}
                </Text>
                <Text>
                    Name: {row.name}
                </Text>
                <Text>
                    Number: {row.number}
                </Text>
                <Text>
                    Token: {row.tokenNumber}
                </Text>
            </Page>
        ))}
       </Document>
    )
}

export default PDFFiles