---
id: 160_software_development_process
type: note
course: CCICOMP
topic: "16.0 Software Development Process"
status: completed
---

# 16.0 Software Development Process

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CCICOMP]] #[[Software Engineering]] #[[SDLC]] #[[M7]]

---

## Overview

This document outlines the Software Development Lifecycle (SDLC), presenting the structured approaches, methodologies, and best practices used to build high-quality software efficiently. It covers the six core phases of development—from initial requirements gathering to long-term maintenance—and discusses popular methodologies like Waterfall, Agile, and DevOps.

## Key Definitions
 **Software Development Process (SDLC):** The structured approach to developing software applications. Its purpose is to ensure that software is built efficiently, meets user needs reliably, and remains maintainable over time. **Software Requirements Specification (SRS):** A comprehensive document created during the requirements gathering phase that clearly defines the software’s intended functionality and constraints. **High-Level Design (HLD):** The overarching architecture and structure of the proposed software system. **Low-Level Design (LLD):** The detailed design of specific components, modules, and algorithms. **Technical Debt:** The implied cost of additional rework caused by choosing an easy, fast solution now instead of using a better approach that would take longer.

## Theoretical Framework

### The 6 Phases of the Software Development Process

1. **Requirements Gathering**
**Goal:** Understand what the client or end-user needs.
**Activities:** Interview stakeholders, analyze business requirements, create the SRS document.
2. **Design**
**Goal:** Develop a blueprint for the software (HLD and LLD).
**Outcome:** Design documents, architectural diagrams, and models.
3. **Development**
**Goal:** Code the software based on the design blueprints.
**Activities:** Write code using appropriate languages/tools, enforce coding standards, and use version control (e.g., Git).
4. **Testing**
**Goal:** Verify and validate that the software functions correctly and is free of major bugs.
**Types:** Unit Testing, Integration Testing, System Testing, User Acceptance Testing (UAT).
5. **Deployment**
**Goal:** Release the live software to the end-users.
**Considerations:** Deployment strategies (direct, phased, parallel), rollbacks, and infrastructure setup.
6. **Maintenance**
**Goal:** Keep the software functional and up-to-date post-deployment.
**Types:** Corrective (bug fixes), Adaptive (compatibility updates), Perfective (feature improvements), Preventive (future-proofing).

### Popular Methodologies
 **Waterfall Model:** A linear, sequential approach where each phase must be completed before the next begins. Good for highly structured projects with fixed requirements. **Agile Methodology:** An iterative, adaptable approach (e.g., Scrum, Kanban) that promotes flexibility and continuous feedback. **DevOps:** A methodology combining software development (Dev) and IT operations (Ops) to enable continuous integration and continuous delivery (CI/CD). **Lean:** Focuses on maximizing value and efficiency by minimizing waste throughout the development process.

### Best Practices and Tools
 **Tooling:** JIRA/Trello (Requirements), Visual Studio/Eclipse (IDE), Git/SVN (Version Control), Selenium/JUnit (Testing), Jenkins/GitHub Actions (CI/CD). **Best Practices:**
Maintain clear documentation (code comments, design docs).
Implement regular and automated testing.
Consistently use version control.
Strive for continuous improvement in both the software and the team processes.

## Multiple Choice Questions

1. What is the Software Development Process (SDLC)?
    - **A)** The physical manufacturing of computer hardware.
    - **B)** A structured approach to developing software applications efficiently to meet user needs reliably.
    - **C)** A methodology strictly used for marketing software products.
    - **D)** The random, unstructured coding of algorithms by individuals.

2. Which document is created during the requirements gathering phase to define functionality and constraints?
    - **A)** High-Level Design (HLD)
    - **B)** Software Requirements Specification (SRS)
    - **C)** End-User License Agreement (EULA)
    - **D)** Unit Testing Blueprint

3. What does "Technical Debt" refer to in software development?
    - **A)** The financial cost of purchasing software licenses.
    - **B)** The implied cost of additional rework caused by choosing a fast, easy solution over a better, long-term approach.
    - **C)** The money owed to freelance software developers.
    - **D)** The hardware maintenance fees for server hosting.

4. Which phase of the SDLC involves writing code based on design blueprints?
    - **A)** Deployment
    - **B)** Requirements Gathering
    - **C)** Testing
    - **D)** Development

5. What is the goal of the Testing phase?
    - **A)** To write the initial source code.
    - **B)** To interview stakeholders for business requirements.
    - **C)** To verify and validate that the software functions correctly and is free of major bugs.
    - **D)** To deploy the live software to end-users.

6. Which methodology is characterized by a linear, sequential approach where each phase must be completed before the next?
    - **A)** Agile
    - **B)** DevOps
    - **C)** Waterfall Model
    - **D)** Lean

7. What is the defining characteristic of the Agile methodology?
    - **A)** It is a highly rigid process with fixed requirements.
    - **B)** It is an iterative, adaptable approach that promotes flexibility and continuous feedback.
    - **C)** It requires completing all testing before any development begins.
    - **D)** It focuses entirely on IT operations rather than development.

8. What methodology combines software development and IT operations to enable continuous integration and continuous delivery (CI/CD)?
    - **A)** Lean
    - **B)** Waterfall
    - **C)** DevOps
    - **D)** Kanban

9. What is a High-Level Design (HLD)?
    - **A)** The overarching architecture and structure of the proposed software system.
    - **B)** The detailed algorithms used in a single code module.
    - **C)** The final executable machine code file.
    - **D)** The marketing plan for the software release.

10. Which type of maintenance involves adding feature improvements after deployment?
    - **A)** Corrective
    - **B)** Preventive
    - **C)** Adaptive
    - **D)** Perfective

### Answer Key & Explanations

1. **B**. The SDLC is the structured approach to developing software efficiently and reliably.
2. **B**. The SRS is a comprehensive document created during requirements gathering detailing functionality and constraints.
3. **B**. Technical debt is the implied cost of future rework caused by taking a fast, easy approach now instead of a better one.
4. **D**. The Development phase involves coding the software based on the design blueprints.
5. **C**. The goal of Testing is to verify/validate functionality and ensure the software is free of major bugs.
6. **C**. The Waterfall Model is a linear, sequential approach where each phase must finish before the next begins.
7. **B**. Agile is an iterative, adaptable approach (like Scrum or Kanban) promoting flexibility and continuous feedback.
8. **C**. DevOps combines software development (Dev) and IT operations (Ops) for CI/CD.
9. **A**. HLD refers to the overarching architecture and structure of the proposed software system.
10. **D**. Perfective maintenance focuses on feature improvements.

## References & Navigation

- **Previous Topic:** [[Cybersecurity Awareness]]
- **Next Topic:** [[Introduction to Databases]]
- **Related Notes:** [[Process and Importance of Programming]], [[Design Principles]]
