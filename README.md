# Ayşenur’s English Workspace

A friendly three-day A1 grammar-revision cycle for an adult English learner. It uses short explanations, practical vocabulary, supportive retry feedback, browser-local progress, and repeatable dialogue simulations. No other learner’s content or profile is included.

## Current archive state

The local revision package is ready for review. It has not been committed, pushed, published, or deployed.

Revision packages are data-driven three-day packages placed under `public/homeworks/<package-id>/homework.json`. They use the approved Architecture v2 metadata, a privacy-safe opaque ID, the multiskill section family, and guided dialogue practice. There is no final quiz or exam. Lesson evidence and explicit teacher instruction determine content; this repository contains no lesson source data.

## Vocabulary register

`content/vocabulary-master.json` is the source-only register for the ten vocabulary items assigned to each homework. It is deliberately not included in the student-facing website bundle. Because this repository is public, it is not a private file; it is only hidden from the learner interface.

## Local work and contact
Answers, drafts, completion and review items stay in the current browser, separated by stable package and activity IDs. Browser storage is not an account or backup. No backend, submissions, analytics, automatic contact, or LearnerState update exists.

The Send to teacher control is an explicitly disabled placeholder. No teacher email or WhatsApp destination is configured. No backend, submissions, analytics or automatic contact exists. Free writing and speaking use self-review checklists; no automatic language grading is claimed.

## Archive contract
Add each future lesson as a new folder under `public/homeworks` with a unique `YYYY-MM-DD-<opaque suffix>` ID. Never overwrite earlier packages, remove old folders, or change their local-storage keys. Run `npm run homeworks:index` to rebuild the latest-first lesson switcher. Private meeting bindings and transcripts belong outside this public repository.

## Build and publish
npm install, then npm run build. GitHub Actions publishes dist to GitHub Pages from main at /aysenur-homework/.
