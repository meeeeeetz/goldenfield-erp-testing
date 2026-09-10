if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['metz-print'] = (container) => {
    container.innerHTML = `
        <div class="module-dashboard">
            <div style="display: flex; justify-content: space-between; align-items: center; gap: 12px; width: 100%;">
                <h2>Print</h2>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <select class="modal-select" style="width: auto; min-width: 160px;">
                        <option value="">Select Template</option>
                    </select>
                    <button class="btn-primary" style="padding: 8px 12px; font-size: 13px;">+ New</button>
                    <button class="btn-secondary" style="padding: 8px 12px; font-size: 13px;">Clear</button>
                    <button class="btn-primary" style="padding: 8px 12px; font-size: 13px;">Save</button>
                    <button class="btn-danger" style="padding: 8px 12px; font-size: 13px;">Delete</button>
                </div>
            </div>
            <div class="card" style="margin-top: 10px; padding: 20px;">
                <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #1a1f2e;">Print Page</h3>
                <div id="print-page-toolbar" class="ql-toolbar ql-snow" style="border: 1px solid #D6D6D6; border-radius: 6px 6px 0 0; background: #fff;">
                    <span class="ql-formats">
                        <select class="ql-header" title="Heading">
                            <option value="1">Heading 1</option>
                            <option value="2">Heading 2</option>
                            <option value="3">Heading 3</option>
                            <option selected>Normal</option>
                        </select>
                    </span>
                    <span class="ql-formats">
                        <button class="ql-bold" title="Bold"></button>
                        <button class="ql-italic" title="Italic"></button>
                        <button class="ql-underline" title="Underline"></button>
                        <button class="ql-strike" title="Strikethrough"></button>
                    </span>
                    <span class="ql-formats">
                        <button class="ql-list" value="ordered" title="Ordered list"></button>
                        <button class="ql-list" value="bullet" title="Bullet list"></button>
                        <button class="ql-indent" value="-1" title="Decrease indent"></button>
                        <button class="ql-indent" value="+1" title="Increase indent"></button>
                    </span>
                    <span class="ql-formats">
                        <button class="ql-align" value="" title="Align left"></button>
                        <button class="ql-align" value="center" title="Align center"></button>
                        <button class="ql-align" value="right" title="Align right"></button>
                        <button class="ql-align" value="justify" title="Justify"></button>
                    </span>
                    <span class="ql-formats">
                        <button class="ql-clean" title="Clear formatting"></button>
                    </span>
                    <span class="ql-formats">
                        <button id="print-portrait-btn" class="print-orientation-btn" title="Portrait" style="width: 32px; height: 28px; display: inline-flex; align-items: center; justify-content: center;">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"></rect><line x1="6" y1="8" x2="18" y2="8"></line></svg>
                        </button>
                        <button id="print-landscape-btn" class="print-orientation-btn" title="Landscape" style="width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center;">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"></rect><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        </button>
                    </span>
                </div>
                <div id="print-quill-editor" class="ql-container ql-snow" style="background: #f3f4f6; border: 1px solid #D6D6D6; border-top: none; border-radius: 0 0 6px 6px; min-height: 500px; font-size: 14px; overflow: hidden;">
                    <div id="print-quill-inner" style="min-height: 500px; padding: 40px; margin: 0 auto; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.1); box-sizing: border-box; overflow: auto;">
                </div>
            </div>
        </div>
    `;
};

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'metz-print';
    const render = ModuleComponents[currentTab] || ModuleComponents['metz-print'];
    render(contentArea);

    if (typeof Quill !== 'undefined') {
        const printQuillInner = document.getElementById('print-quill-inner');
        if (printQuillInner && !printQuillInner.__quillInitialized) {
            new Quill(printQuillInner, {
                theme: 'snow',
                modules: {
                    toolbar: {
                        container: '#print-page-toolbar'
                    }
                },
                placeholder: 'Start typing your print page content...'
            });
            printQuillInner.__quillInitialized = true;
        }
    }

    const portraitBtn = document.getElementById('print-portrait-btn');
    const landscapeBtn = document.getElementById('print-landscape-btn');
    const printQuillInner = document.getElementById('print-quill-inner');

    function setPrintOrientation(orientation) {
        if (!printQuillInner) return;
        const portraitBtn = document.getElementById('print-portrait-btn');
        const landscapeBtn = document.getElementById('print-landscape-btn');
        
        if (orientation === 'landscape') {
            printQuillInner.style.width = '297mm';
            printQuillInner.style.maxWidth = '297mm';
            printQuillInner.style.height = '210mm';
            printQuillInner.style.minHeight = '210mm';
            printQuillInner.style.maxHeight = '210mm';
            if (portraitBtn) portraitBtn.classList.remove('active');
            if (landscapeBtn) landscapeBtn.classList.add('active');
        } else {
            printQuillInner.style.width = '210mm';
            printQuillInner.style.maxWidth = '210mm';
            printQuillInner.style.height = '297mm';
            printQuillInner.style.minHeight = '297mm';
            printQuillInner.style.maxHeight = '297mm';
            if (landscapeBtn) landscapeBtn.classList.remove('active');
            if (portraitBtn) portraitBtn.classList.add('active');
        }
    }

    if (portraitBtn) {
        portraitBtn.addEventListener('click', () => setPrintOrientation('portrait'));
    }
    if (landscapeBtn) {
        landscapeBtn.addEventListener('click', () => setPrintOrientation('landscape'));
    }

    setPrintOrientation('portrait');
}
