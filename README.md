# Ayşenur’s English Workspace

A three-day homework cycle for an adult English learner. The approved Homework 1 visual system is retained: serif task headings, slate header, rounded section cards, colour-coded skills, hints, retry feedback, progress and a review bank. No other learner’s content or profile is included.

## Current archive state

No homework has been published yet. The platform intentionally supports an empty archive; it never presents sample or placeholder homework as learner work.

Future real packages are data-driven three-day packages placed under `public/homeworks/<package-id>/homework.json`. They use the approved Architecture v1 metadata, a privacy-safe opaque ID, the multiskill section family, and a 10-question feedback-only Final Quiz. Lesson evidence and explicit teacher instruction determine content; this repository contains no lesson source data.

## Local work and contact
Answers, drafts, completion and review items stay in the current browser, separated by stable package and activity IDs. Browser storage is not an account or backup. No backend, submissions, analytics, automatic contact, or LearnerState update exists.

The Send to teacher control is an explicitly disabled placeholder. No teacher email or WhatsApp destination is configured. No backend, submissions, analytics or automatic contact exists. Free writing and speaking use self-review checklists; no automatic language grading is claimed.

## Archive contract
Add each future lesson as a new folder under `public/homeworks` with a unique `YYYY-MM-DD-<opaque suffix>` ID. Never overwrite earlier packages, remove old folders, or change their local-storage keys. Run `npm run homeworks:index` to rebuild the latest-first lesson switcher. Private meeting bindings and transcripts belong outside this public repository.

## Build and publish
npm install, then npm run build. GitHub Actions publishes dist to GitHub Pages from main at /aysenur-homework/.
