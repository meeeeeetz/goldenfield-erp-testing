# Plan: Ensure All Rows Fit on One Printed Page (Metzeler-print.js)

## Goal
Make the Metzeler attendance template print so all rows fit on exactly one page, with no content spilling to a second page. Row heights stay at natural (saved) height and are only scaled DOWN if total content exceeds the page. Row heights remain fully editable in Luckysheet — `rowScale` is print-time only, never modifies stored `rowlen` data.

## Affected Files
- `main-landing-page/Metzeler Folder/Metzeler-print.js` — `doPrint()` (lines 796-980) and `buildLuckysheetPrintTable()` (lines 982-1216)

## User Decision
- **No upscaling**: When content is shorter than the page, rows stay at natural height with white space at the bottom.
- **Downscaling only**: When content exceeds the page, `rowScale < 1.0` shrinks rows proportionally to fit.
- Row heights remain editable in Luckysheet (stored `rowlen` data is never modified by printing).

## Current Behavior
- `rowScale = Math.min(1, printableHeightPx / totalRowHeight)` — scales down only, never up (already matches user preference)
- `rowlen` config stores only custom row heights; missing rows default to 19px
- Row height per row: `rh = rowHeights[r] || 19 * rowScale` — **bug**: rows with saved heights don't get `rowScale` applied
- Columns use percentage widths summing to 100% (should fit horizontally)
- CSS `@page` margin: 6mm all sides; `td { min-height: 19px }` — could block downscaling below 19px
- Table has `page-break-inside: avoid`

## Proposed Changes

### 1. Row height calculation (doPrint, lines 850-870)
Keep `Math.min(1, ...)` cap (downscale only). But improve `totalRowHeight` to include ALL rows:
- For rows with entry in `rowlen`: use that value
- For rows without entry: use saved default (19px)

### 2. Row height application (buildLuckysheetPrintTable, lines 1164-1166)
- Current: `rh = rowHeights[r] != null ? rowHeights[r] : 19 * rowScale`
  - **Bug**: rows with saved heights skip `rowScale`, so downscaling doesn't apply to them
- Change: always apply `rowScale` to every row:
  - `rh = (rowHeights[r] != null ? rowHeights[r] : 19) * rowScale`

### 3. Remove/override td min-height CSS conflict
- Current CSS: `#print-sheet-content ... td { min-height: 19px !important; }`
- If `rowScale` < 1, rows could be shorter than 19px but CSS forces 19px minimum, defeating downscaling
- Change `min-height: 19px` to `min-height: 0` (or remove the rule) so scaled row heights take effect

### 4. Horizontal fit verification (already mostly handled)
- Column widths are percentages summing to 100% — should fit on one page horizontally
- Verify no `page-break-inside: avoid` on `td`/`tr` causes row splitting across pages

## Validation
1. `node --check` on Metzeler-print.js (syntax)
2. Open browser DevTools → Console, load Weekly Attendance template, click Print
3. Verify `PRINT DEBUG` logs show correct row heights and scale factor
4. Print to PDF and confirm:
   - All rows (including rows 7, 11, 15...) appear on ONE page
   - Borders on columns AI (34) and AJ (35) render
   - No content spills to page 2
   - Row heights are proportionally scaled DOWN when content exceeds page

## Rollback
Revert `rh` assignment to original `rowHeights[r] || 19 * rowScale` and restore `td { min-height: 19px }`.
