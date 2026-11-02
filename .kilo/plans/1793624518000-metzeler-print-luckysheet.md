# Plan: Luckysheet Integration for Metzeler Print Subtab

**Plan file:** `.kilo/plans/1793624518000-metzeler-print-luckysheet.md`
**Target file:** `main-landing-page/Metzeler Folder/Metzeler-print.js`
**Backend:** Already implemented (no changes needed)
- Database: `my-erp-database/metzeler-database/metzeler-print-templates.sql` (table `metzeler_print_templates`: id SERIAL PK, filename VARCHAR, content_payload JSONB, created_at, updated_at)
- Controller: `my-erp-backend/Controllers/main-metzeler-controller/metzeler-print-controller.js` (getAllTemplates, getTemplateById, createTemplate, updateTemplate, deleteTemplate)
- Routes: `my-erp-backend/routes/metzelerRoutes/metzeler-print-routes.js` (GET /, GET /:id, POST /, PUT /:id, DELETE /:id), registered in `server.js` at `/api/metzeler/print/templates`

---

## Goal

Replace the current contenteditable table builder in `Metzeler-print.js` with a full Luckysheet spreadsheet grid, while keeping the same template management button workflow (Select/New/Clear/Save/Delete) and backend persistence.

---

## Current State (already built)

- Backend API `GET/POST/PUT/DELETE /api/metzeler/print/templates` is live and returns/stores `content_payload` JSONB.
- Frontend currently renders a contenteditable `<table>` with Insert Table / Add Row / Add Column / Merge Cells buttons and Quill-style toolbar.
- `currentTemplateId` tracks the loaded template; save does PUT (overwrite) if loaded, POST (prompt filename) if new.

---

## Design Decisions

1. **Luckysheet via CDN** — Luckysheet is not installed in the project. Load CSS/JS dynamically from unpkg CDN inside `initializeModule` so no npm install or build step is required.
   - CSS: `luckysheet.css`, `pluginsCss.css`
   - JS: `jquery` (peer dep), `jquery.mousewheel`, `luckysheet.umd.js`
2. **Luckysheet replaces the sheet container** — `#print-sheet-container` div becomes the Luckysheet container (`container: 'luckysheet-print-container'`). Existing table-builder DOM logic is removed.
3. **Payload format** — `content_payload` stores `{ sheetData: <luckysheet sheet JSON array>, orientation: 'portrait'|'landscape' }`. Luckysheet's `getluckysheetfile()` returns the sheet config array suitable for `data:` on reload.
4. **Orientation still stored** alongside sheet data (portrait/landscape buttons remain).
5. **Print CSS** — `@media print` hides Luckysheet UI (toolbar, formula bar, sheet tabs, scrollbars, scroll containers) and prints only the cell grid with crisp borders on A4/Letter.

---

## Implementation Steps

### Step 1: Add dynamic dependency loader
Create `loadLuckysheetAssets()` that injects `<link>` and `<script>` tags into `<head>` and returns a Promise resolving when `window.luckysheet` and `jQuery` are available.

Order:
1. `<link rel="stylesheet"> luckysheet.css`
2. `<link rel="stylesheet"> pluginsCss.css`
3. `<script src="jquery.min.js">`
4. `<script src="jquery.mousewheel.min.js">`
5. `<script src="luckysheet.umd.js">`
6. Poll `window.luckysheet` until defined.

CDN base: `https://unpkg.com/luckysheet@latest/` (or pinned version).

### Step 2: Update module HTML
Replace the `#print-quill-editor` / `#print-sheet-container` contenteditable div with:
```html
<div id="luckysheet-print-container"></div>
```
Keep the existing toolbar buttons (Insert Table / Row / Col / Merge become no-ops or are repurposed — Luckysheet has native equivalents). Keep New / Clear / Save / Delete / Select Template / Orientation buttons.

### Step 3: Luckysheet init/destroy lifecycle
- `initLuckysheet(data)` — `luckysheet.create({ container: 'luckysheet-print-container', data: data || [], ... })` with mergeCells enabled, showGridLines true, editable true.
- `destroyLuckysheet()` — `luckysheet.destroy('luckysheet-print-container')` (or the appropriate destroy API), clear container innerHTML.
- Track `luckysheetInstance` / `luckysheetSheetId` for API calls.

### Step 4: Button handlers
- **New:** destroy instance → blank init → `currentTemplateId = null` → clear dropdown selection → disable Delete.
- **Clear:** confirm → `luckysheet.clearSheet()` (or set all cell values empty) → keep grid structure.
- **Save:** `const file = luckysheet.getluckysheetfile()` → payload `{ sheetData: file, orientation }` → if `currentTemplateId` → `PUT /:id` (silent overwrite + toast); else `prompt()` filename → `POST /` → refresh dropdown, select new id, enable Delete.
- **Select Template:** `GET /api/metzeler/print/templates` populate dropdown; on change `GET /:id` → `luckysheet.create({ container, data: savedPayload.sheetData })` → set orientation → enable Delete.
- **Delete:** confirm → `DELETE /:id` → destroy Luckysheet → blank init → refresh dropdown → disable Delete.

### Step 5: Print CSS (`@media print`)
Hide Luckysheet chrome:
- `.luckysheet-toolbar`, `.luckysheet-formula-bar`, `.luckysheet-sheet-container`, `.luckysheet-scroll-container-x/y`, `.luckysheet-cell-selected`, scrollbars
- Show only `.luckysheet-cell` grid with `border: 1px solid #000`, `border-collapse: collapse`
- Container padding/margin reset to 0 for full-page print

### Step 6: Remove old table-builder code
Delete `insertTable`, `addRowAbove`, `addRowBelow`, `addColumnLeft`, `addColumnRight`, `mergeCells`, `createTable`, `getTable`, `cellIndex`, `rowIndex`, `focusedCell` tracking, `print-toolbar-btn` styles, and the old contenteditable container styles. Luckysheet provides these natively.

---

## Backend

No changes required. Existing routes/controller/table fully support the Luckysheet JSON payload stored in `content_payload`.

---

## Validation Checklist

- [ ] Luckysheet CSS/JS load without console errors
- [ ] Blank grid renders on module load
- [ ] Select Template populates dropdown from backend
- [ ] Selecting a template loads its sheet data into Luckysheet
- [ ] New creates a blank grid, clears `currentTemplateId`
- [ ] Clear empties cells but keeps grid
- [ ] Save on loaded template → PUT (no prompt) → toast
- [ ] Save on new sheet → prompt filename → POST → appears in dropdown
- [ ] Delete removes record, clears grid, refreshes dropdown
- [ ] `@media print` hides toolbars and prints grid only
- [ ] Orientation (portrait/landscape) saved and restored with template

---

## Open Questions (for implementation agent)

1. **Luckysheet version** — pin to a specific version (e.g., `2.5.12`) or use `@latest`? Recommendation: pin to `2.5.12` for stability.
2. **Destroy API** — Luckysheet's destroy method signature may vary by version; verify `luckysheet.destroy(containerId)` works or use the sheet manager to clear.
3. **Auth token** — frontend already reads `goldenfield_auth_token` from localStorage; confirm super admin has a valid token when testing.

---

## Files to Modify

| File | Change |
|------|--------|
| `main-landing-page/Metzeler Folder/Metzeler-print.js` | Full rewrite: remove table builder, add Luckysheet loader/init/destroy, wire buttons to Luckysheet API, add print CSS |

## Files to NOT Modify

| File | Reason |
|------|--------|
| `my-erp-backend/routes/metzelerRoutes/metzeler-print-routes.js` | Already implemented |
| `my-erp-backend/Controllers/main-metzeler-controller/metzeler-print-controller.js` | Already implemented |
| `my-erp-database/metzeler-database/metzeler-print-templates.sql` | Already implemented |
| `my-erp-backend/server.js` | Route already registered |
