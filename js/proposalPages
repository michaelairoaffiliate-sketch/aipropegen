/*
==========================================================
 ProposalPilot AI Professional Edition
 Proposal Pages
 Version: 2.0.0
==========================================================
*/

class ProposalPages {

    constructor(pdf) {

        this.pdf = pdf;

        this.components = new PDFComponents(pdf);

    }

    // ==========================================
    // COVER PAGE
    // ==========================================

    drawCover() {

        console.log("Cover Page");

    }

    // ==========================================
    // EXECUTIVE SUMMARY
    // ==========================================

    drawExecutiveSummary() {

        this.components.sectionHeader(
            "Executive Summary",
            "Prepared exclusively for your business"
        );

    }

    // ==========================================
    // PROJECT OVERVIEW
    // ==========================================

    drawProjectOverview() {

        this.components.sectionHeader(
            "Project Overview",
            "Understanding your business requirements"
        );

    }

    // ==========================================
    // BUSINESS OBJECTIVES
    // ==========================================

    drawBusinessObjectives() {

        this.components.sectionHeader(
            "Business Objectives",
            "The primary goals of this proposal"
        );

    }

}

// Global Export

window.ProposalPages = ProposalPages;
