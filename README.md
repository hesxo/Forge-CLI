# Forge CLI

**Forge CLI** by Hasal Dharmagunawardana

> AI-Powered Git Automation & Release Tool

`forge-cli` is a powerful Node.js CLI that automates your git workflow while keeping everything organized. It uses AI to help with release flows, simplifies branch management, and can automatically log every release to a Google Sheet.

[![npm version](https://img.shields.io/npm/v/@hesxo/forge-cli.svg)](https://www.npmjs.com/package/@hesxo/forge-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Key Features](#key-features)
- [Usage & Commands](#usage--commands)
- [Google Sheets Integration](#google-sheets-integration)
- [Why Forge?](#why-forge)

---

## Quick Start

You can run Forge directly without installation:

```bash
npx @hesxo/forge-cli
```

Or install it globally for daily use (run with `forge-cli`):

```bash
npm install -g @hesxo/forge-cli
# or
pnpm add -g @hesxo/forge-cli
```

Once installed, run `forge-cli` in any git repository to start the interactive menu.

---

## Configuration

Forge is designed to be zero-friction. When you run it for the first time, it will interactively ask for the necessary credentials and save them securely to your global configuration (for example, under your home directory).

**Required:**

- **OpenAI API Key**: Used to analyze git data and power AI features.

**Optional:**

- **Google Sheets Webhook URL**: Used to log release history automatically.

You can modify these settings at any time by running:

```bash
forge-cli settings
```

Or selecting "⚙️ Settings" from the main menu.

---

## Key Features

### 🤖 AI-Powered Release Flow

Forge guides you through your core release workflow using AI-backed automation and prompts.

### 🏷️ Semantic Versioning Ready

- Helps you structure predictable release flows.
- Plays nicely with semantic versioning and tagging strategies.

### 📊 Release Logging (Google Sheets)

Keep a permanent record of every deployment. Forge can send a structured payload (User, Branch, Type, Message, Technical Description) to your Google Sheet via a simple webhook.

### 🌿 Smart Branch Management

- **Safe Switch**: Optionally stash changes before switching branches and restore them after.
- **Cleanup**: Easily manage and clean up local branches.

### ⏪ Visual Undo & Rollback

Forge provides a clean, visual history of your recent commits and allows you to explore rollback/reset options with confirmation prompts.

---

## Usage & Commands

You can use Forge in **Interactive Mode** (recommended) or via **Direct Commands**.

### Interactive Mode

Just type `forge` or `forge-cli` to enter the interactive dashboard.

### CLI Commands

| Command          | Description                                          |
| :--------------- | :--------------------------------------------------- |
| `forge release`  | Run the release flow (build / tag / push / log)     |
| `forge build`    | Run `install` and `build` scripts from `package.json` |
| `forge branch`   | Manage branches (switch, update, clean up)          |
| `forge stash`    | Interactive stash management (save, apply, drop)    |
| `forge undo`     | Visual commit history and rollback/reset tools      |
| `forge sync`     | Fetch and pull changes with one command             |
| `forge settings` | View or update API keys and configurations          |

---

## Google Sheets Integration

To enable the automatic changelog/release logger, follow these steps to deploy a simple Webhook.

### 1. Create the Sheet

Go to [sheets.new](https://sheets.new) and create a blank spreadsheet.

### 2. Add the Script

Click **Extensions** > **Apps Script** in the top menu. Remove any existing code and paste this:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  // Appends: Timestamp | User | Branch | Type | Message | Description
  sheet.appendRow([
    new Date(),
    data.user,
    data.branch,
    data.type,
    data.message,
    data.description,
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ status: "success" }),
  ).setMimeType(ContentService.MimeType.JSON);
}
```

### 3. Deploy

1. Click the blue **Deploy** button > **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Description: `Forge Logger`
4. Execute as: **Me**
5. Who has access: **Anyone** (Important! This allows the CLI to send data without OAuth complexity).
6. Click **Deploy**.

### 4. Configure Forge

Copy the **Web app URL** (it starts with `https://script.google.com/...`).
Run `forge settings` and paste the URL when prompted.

---

## Why Forge?

Most release tools are just scripts. Forge is meant to be an **intelligent assistant for your Git workflow**.

- It doesn’t just run commands; it guides you through safe, repeatable workflows.
- It protects your work-in-progress when working with branches.
- It makes it easy to keep a human-readable trail of what changed and why.

### Requirements

- Node.js 18.0.0 or higher
- Git

---

**forge-cli** is published on npm as `forge-cli`.
