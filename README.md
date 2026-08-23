# Seong-hoCho.github.io

Personal daily dashboard (to-dos, study plan, routine, habits, sleep, spaced-repetition
review, Google Calendar sync) served as a static page via GitHub Pages.

## Structure

```
├── index.html
├── daily-dashboard.html   ← dashboard app (single file for now, see assets/*/README.md)
├── data/
│   └── public-demo.json   ← fake/sample data only, safe to be public
├── assets/
│   ├── css/
│   └── js/
├── README.md
└── .gitignore
```

## Privacy note

**This repo is public** (it's a `github.io` user site, which GitHub Pages requires to be
public on the free plan). Nothing committed here should be real personal data.

The dashboard's real state (study plan, deadlines, journal, sleep log, etc.) lives only in
the browser's `localStorage` (key `daily-dashboard-v1`). `data/public-demo.json` is sample
data only, for previewing the UI — it is not read by the deployed dashboard by default.

If you need the real plan data synced across devices, point the dashboard's "plan URL"
setting at a private, authenticated source (e.g. the existing Google Apps Script bridge),
never at a file committed to this repo.

Do not commit `plan.json`, `dashboard-*.json`, or any other export/backup of real data —
`.gitignore` blocks the common filenames, but it only prevents new commits; a file already
removed from history is a manual step (see the repo's private cleanup notes).
