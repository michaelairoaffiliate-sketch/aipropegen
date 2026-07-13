// ======================================================
// ProposalPilot AI Professional Edition
// Proposal Engine
// ======================================================

class ProposalEngine {

    constructor(data) {

        // Build the proposal model
        this.proposal = new ProposalModel(data);

        // Create the PDF generator
        this.pdf = new ProposalPDF(this.proposal);

    }

    // ======================================================
    // Generate Proposal
    // ======================================================

    generate() {

        this.pdf.render();

    }

}

window.ProposalEngine = ProposalEngine;
