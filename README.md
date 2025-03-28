# Postivie Incidence Reporting

## Overview
This project is part of a Master's thesis at ETH Zurich. The aim of the thesis is to explore the potential and requirements for positive incidence reporting in cybersecurity. While incident reporting is a well-established practice in many organizations, it typically focuses on negative events, such as breaches, failures, or vulnerabilities.

However, there is value in also capturing positive cybersecurity incidents, such as successful defense operations, resilience during attacks, or well-implemented best practices. These "positive" stories can offer insights into what contributes to secure and stable operations.

The first step in this project involves evaluating existing reporting tools to assess whether they support—or can be adapted to support—reporting of positive events. This prototype serves as a basis for comparison and helps identify the features needed to make positive incidence reporting effective and usable.

## System Design
For simplicity, the application is built as a frontend-only prototype that runs entirely locally in the browser.

The core idea is to provide a simple form-based interface for users to record cybersecurity incidents—both traditional (e.g., date, cause, damage) and positive events. All entries are stored locally, and users can edit their entries and export them as a JSON file, which can later be imported into a database if needed.

We intentionally avoid connecting to a backend or database for several reasons:
- This is an early-stage prototype, and we want to stay flexible during development.
- The tool is being tested by companies, some of which may be concerned about unintentionally sharing sensitive information. With this setup, all data stays local, and testers are fully in control—even if they use fictional examples.
- Avoids the need for user authentication, security, or database moderation, which are outside the scope of this thesis.
- Keeps the focus on feature exploration and usability, not infrastructure.
- The design is easily extendable. The current frontend can be quickly connected to a backend and database when needed.

## Page Setup
The React app consists of 5 pages:
- The Homepage
- A form to enter Positive Events in Cybersecurity
- A form to enter Cybersecurity Incidents
- A log to view and edit Positive Events
- A log to view and edit Incidents