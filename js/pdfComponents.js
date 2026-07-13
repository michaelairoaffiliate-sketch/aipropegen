/*
==========================================================
 ProposalPilot AI Professional Edition
 PDF Components
 Version: 2.0.0
==========================================================
*/

class PDFComponents {

    constructor(pdf) {

        this.pdf = pdf;

    }
 
    sectionHeader(title, subtitle) {

        const doc = this.pdf.doc;

        doc.setFillColor(248,250,252);

        doc.rect(
            0,
            0,
            this.pdf.pageWidth,
            42,
            "F"
        );

        doc.setFillColor(37,99,235);

        doc.rect(
            0,
            0,
            8,
            42,
            "F"
        );

        doc.setFont("helvetica","bold");
        doc.setFontSize(22);
        doc.setTextColor(30);

        doc.text(
            title,
            20,
            24
        );

        doc.setFont("helvetica","normal");
        doc.setFontSize(10);
        doc.setTextColor(110);

        doc.text(
            subtitle,
            20,
            32
        );

    }

}

// Global Export

window.PDFComponents = PDFComponents;
