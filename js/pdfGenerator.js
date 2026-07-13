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

            primary: [37, 99, 235],

            secondary: [248, 250, 252],

            text: [30, 30, 30],

            gray: [110, 110, 110],

            white: [255, 255, 255],

            border: [225, 225, 225]

        };

    }

    render() {

        const template = new ModernTemplate(this);

        template.render();

        this.save();

    }

    // ======================================================
    // ADD PAGE
    // ======================================================

    addPage() {

        this.drawFooter();

        this.doc.addPage();

        this.drawHeader();

        this.y = this.margin;

    }

    // ======================================================
    // PAGE HEADER
    // ======================================================

    drawHeader() {

        this.doc.setFillColor(...this.theme.primary);

        this.doc.rect(
            0,
            0,
            this.pageWidth,
            18,
            "F"
        );

        this.doc.setFont(
            "helvetica",
            "bold"
        );

        this.doc.setFontSize(14);

        this.doc.setTextColor(...this.theme.white);

        this.doc.text(
            this.proposal.company.name,
            this.margin,
            12
        );

        this.doc.setTextColor(...this.theme.text);

        this.y = 28;

    }

    // ======================================================
    // PAGE FOOTER
    // ======================================================

    drawFooter() {

        this.doc.setDrawColor(...this.theme.border);

        this.doc.line(
            this.margin,
            this.pageHeight - 15,
            this.pageWidth - this.margin,
            this.pageHeight - 15
        );

        this.doc.setFont(
            "helvetica",
            "normal"
        );

        this.doc.setFontSize(9);

        this.doc.setTextColor(...this.theme.gray);

        this.doc.text(
            "Powered by ProposalPilot AI Professional Edition",
            this.margin,
            this.pageHeight - 8
        );

        this.doc.text(
            "Page " + this.doc.getCurrentPageInfo().pageNumber,
            this.pageWidth - this.margin,
            this.pageHeight - 8,
            {
                align: "right"
            }
        );

    }

    save() {

        const filename =
            `${this.proposal.client.name || "Proposal"}-Proposal.pdf`;

        this.doc.save(filename);

    }

}

window.ProposalPDF = ProposalPDF;
