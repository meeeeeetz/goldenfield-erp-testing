# Plan: Force Single-Page A4 Print Fit (Metzeler-print.js)

## Goal
Make the Metzeler attendance table (~43 rows + headers/footers) fit cleanly on exactly ONE A4 page in both Portrait and Landscape print orientations, with zero overflow to Page 2.

## Affected File
- `main-landing-page/Metzeler Folder/Metzeler-print.js` — the `@media print` CSS block (lines 153-227) and the inline row-height assignment in `buildLuckysheetPrintTable()` (line 1169).

## Root Cause (confirmed from code)
- CSS `height: auto !important` on `tr` (line 222) and `td` (line 215) **overrides** the JS-computed inline `height: rh px` set at line 1169. So `rowScale` calculated by `doPrint()` has **no effect** on printed row heights.
- `white-space: normal` + `line-height: normal` + `padding: 4px` lets cell text wrap and expand rows beyond the saved `rowlen` height.
- `@page` margin is 6mm (line 917), leaving limited vertical space.

## Decisions (all resolved — recommended answers below)

| Decision | Recommended Choice | Rationale |
|----------|-------------------|-----------|
| @page margins | **5mm** on all sides | Maximizes printable area: Portrait ≈ 287mm usable height, Landscape ≈ 200mm usable height |
| Base font-size in print | **10px** on `td` | Compact but readable; can be overridden per-orientation |
| Line-height | **1.1** on `td` | Tight vertical packing without overlap |
| Cell padding | **1px top/bottom, 3px left/right** | Minimal vertical space, keeps horizontal readability |
| Row height enforcement | **Remove `height: auto !important` from `tr`** so inline `rh` from JS takes effect | Allows `rowScale` to actually compress rows |
| Text overflow | **`overflow: hidden` on `td`** | Prevents wrapped text from expanding rows beyond allocated height |
| Orientation-specific tuning | `@media print and (orientation: portrait)` + `@media print and (orientation: landscape)` | Portrait needs smaller font/less padding; Landscape has less height so needs more aggressive compression |
| Last-resort scaling | **`transform: scale()` on container** only if compression alone still exceeds 1 page | Guarantees fit even for dense templates |

## Proposed Changes (all inside `loadPrintStyles()` CSS block, lines 153-227)

### 1. @page rules (lines 150-151)
Replace static 6mm margins with orientation-aware 5mm margins. The JS at line 917 already dynamically rewrites `@page` — keep that mechanism but change the default from `6mm` to `5mm`.

### 2. td compression (lines 204-218)
- `padding: 1px 3px !important;` (was `padding: 4px !important;`)
- `line-height: 1.1 !important;` (was `line-height: normal !important;`)
- `font-size: 10px !important;` (add new)
- `overflow: hidden !important;` (add new — prevents content from expanding row)
- `white-space: nowrap !important;` or keep `normal` — recommend `normal` with `overflow: hidden` so text wraps but is clipped at row boundary

### 3. tr height enforcement (lines 220-224)
- Remove `height: auto !important;` so inline `height: rh px` from JS takes effect
- Keep `min-height: 0 !important;` and `page-break-inside: avoid !important;`
- Add `overflow: hidden !important;` on tr as safety

### 4. Orientation-specific rules (add after line 224, before `.print-only`)
```
@media print and (orientation: portrait) {
    #print-sheet-content table td { font-size: 10px !important; padding: 1px 3px !important; line-height: 1.1 !important; }
}
@media print and (orientation: landscape) {
    #print-sheet-content table td { font-size: 9px !important; padding: 0.5px 2px !important; line-height: 1.0 !important; }
}
```

### 5. Container safety (line 172-187)
- Add `page-break-inside: avoid !important;` to `#print-sheet-content` (already on table, add to wrapper too)
- Keep `overflow: visible !important;` so content isn't clipped at container level

## What NOT to change
- Screen view (`@media screen` block, lines 229-231) — untouched
- Luckysheet editor container (`#luckysheet-print-container`) — untouched
- `rowScale` JS logic — keep as-is; the CSS changes make it actually take effect
- Stored `rowlen` data — never modified by printing

## Validation Steps
1. `node --check` on Metzeler-print.js (syntax)
2. Open browser, load Weekly Attendance template, click Print
3. In print preview, confirm "1 of 1 pages" in both Portrait and Landscape
4. Confirm borders on columns AI (34) and AJ (35) still render
5. Confirm text is readable (not overlapping/clipped unacceptably)
6. Confirm on-screen UI is unchanged (switch back to screen view)

## Rollback
Restore `height: auto !important` on `tr`/`td`, restore `padding: 4px`, `line-height: normal`, remove orientation-specific rules, revert `@page` margin to 6mm.
