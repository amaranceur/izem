# UI/UX Pro Max — IZEM setup

Installed from [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill).

## Requirements

- **Node.js** — `uipro-cli` (global)
- **Python 3.x** — for design system search script

## Install (already done)

```powershell
npm install -g uipro-cli
cd d:\web\izem3d
uipro init --ai cursor
```

Skill files: `.cursor/skills/ui-ux-pro-max/`

## Project configuration

| File | Purpose |
|------|---------|
| `.cursor/rules/ui-ux-pro-max.mdc` | Cursor rule — when to use the skill |
| `design-system/izem/MASTER.md` | Generated design system baseline |
| `design-system/izem/pages/landing.md` | **IZEM brand overrides** (use this first) |

## Commands

```powershell
# Full design system (markdown)
python .cursor/skills/ui-ux-pro-max/scripts/search.py "energy drink youth landing" --design-system -p "IZEM" -f markdown

# Persist to design-system/izem/
python .cursor/skills/ui-ux-pro-max/scripts/search.py "energy drink youth landing" --design-system --persist -p "IZEM" --stack react

# React stack guidelines
python .cursor/skills/ui-ux-pro-max/scripts/search.py "scroll animation performance" --stack react

# UX / style lookup
python .cursor/skills/ui-ux-pro-max/scripts/search.py "accessibility motion" --domain ux
```

## Update / uninstall

```powershell
uipro update
uipro uninstall --ai cursor
```

## Usage in Cursor

Restart Cursor (or start a new agent chat). Ask naturally:

> Improve the IZEM hero section following our design system

The skill auto-applies on UI/UX requests when the agent reads `.cursor/skills/ui-ux-pro-max/SKILL.md`.
