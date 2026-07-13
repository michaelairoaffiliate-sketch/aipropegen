/*
==========================================================
 ProposalPilot AI Professional Edition
 Modern Professional Template
 Version: 1.0.0
==========================================================
*/

class ModernTemplate {

    constructor(pdf) {

        this.pdf = pdf;

        this.components = new PDFComponents(pdf);

    }

    render() {

        this.drawCover();

        this.pdf.addPage();

        this.drawExecutiveSummary();

        this.pdf.addPage();

        this.drawProjectOverview();

        this.pdf.addPage();

        this.drawBusinessObjectives();

    }

    drawCover() {

    const doc = this.pdf.doc;
    const proposal = this.pdf.proposal;

    // ======================================================
    // PREMIUM HEADER
    // ======================================================

    doc.setFillColor(37, 99, 235);

    doc.rect(
        0,
        0,
        this.pdf.pageWidth,
        48,
        "F"
    );

    // White Accent Line

    doc.setFillColor(255,255,255);

    doc.rect(
        0,
        58,
        this.pdf.pageWidth,
        1.2,
        "F"
    );

    // ======================================================
    // LOGO
    // ======================================================

    try {

        const logoWidth = 48;
        const logoHeight = 48;

        doc.addImage(
            this.pdf.logo,
            "PNG",
            (this.pdf.pageWidth - logoWidth) / 2,
            7,
            logoWidth,
            logoHeight
        );

    } catch (e) {

        console.warn("Logo not loaded.");

    }

    // ======================================================
    // PROPOSAL TITLE
    // ======================================================

    doc.setFont("helvetica","bold");
    doc.setFontSize(26);
    doc.setTextColor(30);

    doc.text(
        proposal.project.title || "Business Proposal",
        this.pdf.pageWidth / 2,
        78,
        { align: "center" }
    );

    doc.setFont("helvetica","bold");
    doc.setFontSize(16);
    doc.setTextColor(120);

    doc.text(
        "PROPOSAL",
        this.pdf.pageWidth / 2,
        92,
        { align: "center" }
    );

    // ======================================================
    // PREPARED FOR
    // ======================================================

    doc.setFont("helvetica","normal");
    doc.setFontSize(11);
    doc.setTextColor(120);

    doc.text(
        "Prepared Exclusively For",
        this.pdf.pageWidth / 2,
        105,
        { align: "center" }
    );

    doc.setFont("helvetica","bold");
    doc.setFontSize(21);
    doc.setTextColor(25);

    doc.text(
        proposal.client.name || "",
        this.pdf.pageWidth / 2,
        116,
        { align: "center" }
    );

    doc.setFont("helvetica","normal");
    doc.setFontSize(13);
    doc.setTextColor(100);

    doc.text(
        proposal.client.company || "",
        this.pdf.pageWidth / 2,
        125,
        { align: "center" }
    );

    // ======================================================
    // PREPARED BY
    // ======================================================

    doc.setFont("helvetica","bold");
    doc.setFontSize(11);
    doc.setTextColor(120);

    doc.text(
        "PREPARED BY",
        this.pdf.pageWidth / 2,
        170,
        { align: "center" }
    );

    doc.setFont("helvetica","bold");
    doc.setFontSize(20);
    doc.setTextColor(30);

    doc.text(
        proposal.company.name,
        this.pdf.pageWidth / 2,
        181,
        { align: "center" }
    );

    doc.setFont("helvetica","normal");
    doc.setFontSize(11);
    doc.setTextColor(100);

    doc.text(
        proposal.company.edition,
        this.pdf.pageWidth / 2,
        188,
        { align: "center" }
    );

    doc.setFont("helvetica","normal");
    doc.setFontSize(9);
    doc.setTextColor(130);

    doc.text(
        proposal.company.website,
        this.pdf.pageWidth / 2,
        194,
        { align: "center" }
    );

    // ======================================================
    // PROPOSAL INFORMATION
    // ======================================================

    doc.setFont("helvetica","normal");
    doc.setFontSize(11);
    doc.setTextColor(110);

    if (proposal.proposal.number) {

        doc.text(
            `Proposal No. ${proposal.proposal.number}`,
            this.pdf.pageWidth / 2,
            226,
            { align: "center" }
        );

    }

    if (proposal.proposal.issueDate) {

        doc.text(
            `Issue Date ${proposal.proposal.issueDate}`,
            this.pdf.pageWidth / 2,
            233,
            { align: "center" }
        );

    }

    if (proposal.proposal.validUntil) {

        doc.text(
            `Valid Until ${proposal.proposal.validUntil}`,
            this.pdf.pageWidth / 2,
            240,
            { align: "center" }
        );

    }

    this.pdf.drawFooter();

}

    drawExecutiveSummary() {

        this.components.sectionHeader(
            "Executive Summary",
            "Prepared exclusively for your business"
        );

    }

    drawProjectOverview() {

        this.components.sectionHeader(
            "Project Overview",
            "Understanding your project"
        );

    }

    drawBusinessObjectives() {

        this.components.sectionHeader(
            "Business Objectives",
            "The primary goals of this proposal"
        );

    }

}

window.ModernTemplate = ModernTemplate;
