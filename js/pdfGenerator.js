/*
==========================================================
 ProposalPilot AI Professional Edition
 PDF Generator
 Version: 2.0.0
==========================================================
*/

class ProposalPDF {

    constructor(proposalData) {

        this.proposal = proposalData;

        this.doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });

        this.pageWidth =
            this.doc.internal.pageSize.getWidth();

        this.pageHeight =
            this.doc.internal.pageSize.getHeight();

        this.margin = 20;

        this.y = this.margin;
// ======================================
// Load ProposalPilot AI Logo
// ======================================

this.logo = new Image();

this.logo.src = "assets/images/proposalpilot-logo.png";
// ======================================
// Theme
// ======================================

this.theme = {

    primary: [37,99,235],

    secondary: [248,250,252],

    text: [30,30,30],

    gray: [110,110,110],

    white: [255,255,255],

    border: [225,225,225]

};
    }

    render() {

    // Create the selected template
    const template = new ModernTemplate(this);

    // Render the complete proposal
    template.render();

    // Finish the PDF
    this.save();

}
    save() {

        const filename =
            `${this.proposal.client.name || "Proposal"}-Proposal.pdf`;

        this.doc.save(filename);

    }

}

// Global Export
window.ProposalPDF = ProposalPDF;
