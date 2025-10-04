# Ranger Homebrew Character Creator

A self-contained character builder for a homebrew Ranger.

## ✨ Highlights
- JSON “databases” for species, backgrounds, feats, armor, instincts, edges, etc.
- Fixed AC calculation (armor rules, shields, Defense FS, heavy armor proficiency logic, STR requirements).
- “Adaptive Edge Casting” section:
  - Per-level slot tracking from `data/slotProgression.json`
  - Prepare/known list from `data/edges.json`
  - Search, add/remove prepared edges, enforce prepared limit (configurable), expend/restore slots

## 🚀 Run locally
Open `index.html` with a simple server (so `fetch()` for JSON works):
```bash
# python 3
python -m http.server 5173

# then visit http://localhost:5173
