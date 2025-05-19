# Positive Incidence Reporting

## Overview

This project is part of a Master's thesis at ETH Zurich. Its goal is to explore how cybersecurity incident data — especially **positive stories** — can be shared across organizations to improve collective awareness and resilience.

While traditional incident reporting focuses on negative events like breaches or misconfigurations, we believe that **positive incidents** (e.g., effective phishing training, successful system upgrades, or early threat detection) offer valuable lessons that should also be captured and shared.

This prototype demonstrates our vision for a **cybersecurity data-sharing platform**. In the intended real-world model, each organization would run its own **frontend and database**, giving them complete control over their data. Sharing is possible in multiple ways:
- **Public** – visible to all participants
- **Shared with specific users** – visible only to explicitly authorized accounts
- **Private** – kept entirely local

In this demo, we simulate this by allowing you to switch between example accounts (`accountA`, `accountB`, etc.). This multi-account simulation exists only in this POC version to show how permissions and visibility could work in a distributed environment. Real deployments would not include role switching but instead rely on authenticated access.

Shared data can be pseudonymous or anonymized. The goal is to foster useful knowledge exchange without forcing exposure of identity or internal context.

---

## System Design

This is a **proof-of-concept** (POC) application — built purely as a frontend simulation using React. There is **no backend** in this version. All data is stored in the browser (`sessionStorage`) and resettable.

In the envisioned full system:
- Each participant would host their own instance (frontend + database)
- A **central directory** or **hub** would act only as a connector — it never sees the actual shared data
- Public data would be fetchable directly from the central registry
- Private or selectively shared data could be fetched **peer-to-peer**, encrypted and authenticated via TLS (likely through a proxy server setup)
- Deletion or editing would involve sending update requests — but there is no guarantee others haven’t copied the data already. Sharing always implies a **trust tradeoff**

This design supports **decentralized control**, yet enables meaningful collaboration between organizations or teams.

---

## Key Features

- 🛡️ Log **positive stories** that highlight what went well
- 🛑 Log **incidents** or near misses in security operations
- 👤 Simulate multiple organizations via role switching (only in demo)
- 🔐 Apply **visibility controls**: public, private, or shared-with
- 📥 Download entries as JSON for archival or later import
- 🧼 Clear/reset data from the browser for testing fresh usage

---

## Page Setup

The app includes the following primary views:

1. 🏠 **Homepage** – Basic introduction (loaded from markdown)
2. 🛡️ **Positive Entry** – Submit successful cybersecurity efforts
3. 📗 **Positive Log** – Browse, edit, and filter logged stories
4. 🛑 **Incident Entry** – Submit conventional incident reports
5. 📕 **Incident Log** – View and manage incident records

---

## How It Works (Demo Mode)

- Default role: `viewer` (public-only access)
- Switch accounts to see visibility-based differences
- Data is stored in `sessionStorage`, cleared on browser reset
- Visibility:
  - `public`: shown to all roles
  - `shared`: shown only to allowed users
  - `private`: visible only to the creator

Note: switching roles is for simulation only — in a real deployment, each organization has its own app and user credentials.

---

## Development

To run locally:

```bash
npm install
npm run dev
