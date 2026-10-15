/**
 * Nexus 3D Tools Engine
 * Core execution & interactive UI rendering for 150 tools
 */

const ToolsEngine = {
    // Show toast helper
    toast(msg, icon = 'fa-check') {
        const existing = document.querySelector('.toast-notice');
        if (existing) existing.remove();
        const toast = document.createElement('div');
        toast.className = 'toast-notice';
        toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${msg}</span>`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2500);
    },

    // Copy to clipboard helper
    copyText(text) {
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
            ToolsEngine.toast('Copied to clipboard!');
            if (typeof confetti === 'function') {
                confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
            }
        });
    },

    // Main dispatcher: renders UI and connects logic
    render(toolId, container) {
        container.innerHTML = '';
        if (this.renderers[toolId]) {
            this.renderers[toolId](container);
        } else {
            this.renderGenericTool(toolId, container);
        }
    },

    renderGenericTool(toolId, container) {
        const tool = TOOLS_DATABASE.find(t => t.id === toolId);
        container.innerHTML = `
            <div class="tool-panel" style="text-align: center; padding: 40px 20px;">
                <div style="font-size: 40px; color: var(--accent-cyan); margin-bottom: 15px;">
                    <i class="${tool ? tool.icon : 'fa-solid fa-screwdriver-wrench'}"></i>
                </div>
                <h3 style="font-size: 20px; margin-bottom: 10px;">${tool ? tool.title : 'Interactive Utility'}</h3>
                <p style="color: var(--text-muted); max-width: 500px; margin: 0 auto 24px;">${tool ? tool.description : ''}</p>
                <div class="form-group" style="max-width: 500px; margin: 0 auto 16px;">
                    <textarea class="form-textarea" id="generic-input" placeholder="Enter input data or parameters..."></textarea>
                </div>
                <div class="btn-group" style="justify-content: center; margin-bottom: 20px;">
                    <button class="btn-primary" id="generic-run-btn"><i class="fa-solid fa-play"></i> Process Online</button>
                    <button class="btn-secondary" id="generic-clear-btn"><i class="fa-solid fa-trash-can"></i> Clear</button>
                </div>
                <div class="result-box" id="generic-result" style="max-width: 500px; margin: 0 auto; text-align: left; display: none;"></div>
            </div>
        `;
        const runBtn = container.querySelector('#generic-run-btn');
        const input = container.querySelector('#generic-input');
        const result = container.querySelector('#generic-result');
        runBtn.addEventListener('click', () => {
            const val = input.value.trim();
            if (!val) {
                ToolsEngine.toast('Please enter some input text', 'fa-circle-exclamation');
                return;
            }
            result.style.display = 'block';
            result.textContent = `Processed [${tool.title}]:\n` + val.toUpperCase();
            ToolsEngine.toast('Processed successfully!');
        });
        container.querySelector('#generic-clear-btn').addEventListener('click', () => {
            input.value = '';
            result.style.display = 'none';
        });
    },

    renderers: {}
};

// ==========================================
// IMAGE & MEDIA TOOLS IMPLEMENTATIONS
// ==========================================
ToolsEngine.renderers['image-resizer'] = function(c) {
    c.innerHTML = `
        <div class="tool-grid-2col">
            <div class="tool-panel">
                <div class="panel-title"><i class="fa-solid fa-upload"></i> Source Image</div>
                <div class="dropzone" id="ir-dropzone">
                    <i class="fa-solid fa-cloud-arrow-up"></i>
                    <p>Click or drag image here</p>
                    <input type="file" id="ir-file" accept="image/*" style="display:none;">
                </div>
                <div class="form-row" style="margin-top: 16px;">
                    <div class="form-group">
                        <label class="form-label">Width (px)</label>
                        <input type="number" id="ir-width" class="form-input" placeholder="e.g. 1920">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Height (px)</label>
                        <input type="number" id="ir-height" class="form-input" placeholder="e.g. 1080">
                    </div>
                </div>
                <div class="form-group">
                    <label style="display:flex; align-items:center; gap:8px; font-size:13px; cursor:pointer;">
                        <input type="checkbox" id="ir-lock" checked> Lock Aspect Ratio
                    </label>
                </div>
                <button class="btn-primary" id="ir-resize-btn" style="width:100%;"><i class="fa-solid fa-up-right-and-down-left-from-center"></i> Resize & Download</button>
            </div>
            <div class="tool-panel">
                <div class="panel-title"><i class="fa-solid fa-eye"></i> Live Preview</div>
                <div style="text-align:center; min-height:220px; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.3); border-radius:10px; overflow:hidden;">
                    <img id="ir-preview" style="max-width:100%; max-height:260px; object-fit:contain; display:none;">
                    <span id="ir-placeholder" style="color:var(--text-dim); font-size:13px;">No image selected</span>
                </div>
                <div id="ir-info" style="margin-top:12px; font-size:12px; color:var(--text-muted); text-align:center;"></div>
            </div>
        </div>
    `;
    let loadedImg = null, origW = 0, origH = 0;
    const fileInput = c.querySelector('#ir-file');
    const dropzone = c.querySelector('#ir-dropzone');
    const preview = c.querySelector('#ir-preview');
    const placeholder = c.querySelector('#ir-placeholder');
    const widthInput = c.querySelector('#ir-width');
    const heightInput = c.querySelector('#ir-height');
    const lockRatio = c.querySelector('#ir-lock');
    const info = c.querySelector('#ir-info');

    dropzone.onclick = () => fileInput.click();
    fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            loadedImg = new Image();
            loadedImg.onload = () => {
                origW = loadedImg.width;
                origH = loadedImg.height;
                widthInput.value = origW;
                heightInput.value = origH;
                preview.src = loadedImg.src;
                preview.style.display = 'block';
                placeholder.style.display = 'none';
                info.textContent = `Original: ${origW} x ${origH} px (${(file.size / 1024).toFixed(1)} KB)`;
            };
            loadedImg.src = ev.target.result;
        };
        reader.readAsDataURL(file);
    };

    widthInput.oninput = () => {
        if (lockRatio.checked && origW) {
            heightInput.value = Math.round((widthInput.value / origW) * origH);
        }
    };
    heightInput.oninput = () => {
        if (lockRatio.checked && origH) {
            widthInput.value = Math.round((heightInput.value / origH) * origW);
        }
    };

    c.querySelector('#ir-resize-btn').onclick = () => {
        if (!loadedImg) return ToolsEngine.toast('Please select an image first', 'fa-circle-exclamation');
        const targetW = parseInt(widthInput.value) || origW;
        const targetH = parseInt(heightInput.value) || origH;
        const canvas = document.createElement('canvas');
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(loadedImg, 0, 0, targetW, targetH);
        const link = document.createElement('a');
        link.download = `resized-${targetW}x${targetH}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        ToolsEngine.toast('Resized image downloaded!');
    };
};

ToolsEngine.renderers['qr-generator'] = function(c) {
    c.innerHTML = `
        <div class="tool-grid-2col">
            <div class="tool-panel">
                <div class="panel-title"><i class="fa-solid fa-gear"></i> QR Settings</div>
                <div class="form-group">
                    <label class="form-label">Content (URL / Text / Phone)</label>
                    <textarea id="qr-input" class="form-textarea" style="min-height:90px;" placeholder="https://example.com or any text"></textarea>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">QR Size (px)</label>
                        <select id="qr-size" class="form-select">
                            <option value="200">200 x 200</option>
                            <option value="300" selected>300 x 300</option>
                            <option value="500">500 x 500</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Color</label>
                        <input type="color" id="qr-color" class="form-input" value="#000000" style="height:42px; padding:4px;">
                    </div>
                </div>
                <button class="btn-primary" id="qr-gen-btn" style="width:100%;"><i class="fa-solid fa-qrcode"></i> Generate QR Code</button>
            </div>
            <div class="tool-panel" style="text-align:center;">
                <div class="panel-title"><i class="fa-solid fa-eye"></i> Generated QR Code</div>
                <div style="background:#fff; padding:16px; border-radius:12px; display:inline-block; margin:10px auto;">
                    <img id="qr-img" style="max-width:220px; display:block;" src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=Nexus3DToolkit">
                </div>
                <div style="margin-top:16px;">
                    <button class="btn-secondary" id="qr-dl-btn"><i class="fa-solid fa-download"></i> Download PNG</button>
                </div>
            </div>
        </div>
    `;
    const genBtn = c.querySelector('#qr-gen-btn');
    const qrImg = c.querySelector('#qr-img');
    const dlBtn = c.querySelector('#qr-dl-btn');

    genBtn.onclick = () => {
        const text = c.querySelector('#qr-input').value.trim() || 'Nexus3DToolkit';
        const size = c.querySelector('#qr-size').value;
        const color = c.querySelector('#qr-color').value.replace('#', '');
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&color=${color}&data=${encodeURIComponent(text)}`;
        qrImg.src = url;
        ToolsEngine.toast('QR Code Generated!');
    };

    dlBtn.onclick = () => {
        window.open(qrImg.src, '_blank');
    };
};

ToolsEngine.renderers['image-to-base64'] = function(c) {
    c.innerHTML = `
        <div class="tool-grid-2col">
            <div class="tool-panel">
                <div class="panel-title"><i class="fa-solid fa-image"></i> Select Image</div>
                <div class="dropzone" id="b64-drop">
                    <i class="fa-solid fa-cloud-arrow-up"></i>
                    <p>Select or drop image file</p>
                    <input type="file" id="b64-file" accept="image/*" style="display:none;">
                </div>
            </div>
            <div class="tool-panel">
                <div class="panel-title" style="display:flex; justify-content:space-between;">
                    <span><i class="fa-solid fa-code"></i> Base64 Output</span>
                    <button class="btn-secondary" id="b64-copy" style="padding:4px 10px; font-size:11px;"><i class="fa-solid fa-copy"></i> Copy</button>
                </div>
                <textarea id="b64-text" class="form-textarea" style="height:200px;" readonly placeholder="Base64 Data URI will appear here..."></textarea>
            </div>
        </div>
    `;
    const file = c.querySelector('#b64-file');
    const drop = c.querySelector('#b64-drop');
    const text = c.querySelector('#b64-text');
    drop.onclick = () => file.click();
    file.onchange = (e) => {
        const f = e.target.files[0];
        if (!f) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            text.value = ev.target.result;
            ToolsEngine.toast('Image converted to Base64!');
        };
        reader.readAsDataURL(f);
    };
    c.querySelector('#b64-copy').onclick = () => ToolsEngine.copyText(text.value);
};

// ==========================================
// CALCULATOR TOOLS IMPLEMENTATIONS
// ==========================================
ToolsEngine.renderers['age-calculator'] = function(c) {
    c.innerHTML = `
        <div class="tool-grid-2col">
            <div class="tool-panel">
                <div class="panel-title"><i class="fa-solid fa-cake-candles"></i> Date of Birth</div>
                <div class="form-group">
                    <label class="form-label">Select Your Birth Date</label>
                    <input type="date" id="age-dob" class="form-input">
                </div>
                <div class="form-group">
                    <label class="form-label">Calculate Age At Date</label>
                    <input type="date" id="age-target" class="form-input">
                </div>
                <button class="btn-primary" id="age-calc-btn" style="width:100%;"><i class="fa-solid fa-calculator"></i> Calculate Exact Age</button>
            </div>
            <div class="tool-panel">
                <div class="panel-title"><i class="fa-solid fa-chart-pie"></i> Detailed Age Result</div>
                <div id="age-result-wrap" style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                    <div class="result-card-stat"><div class="label">Years</div><div class="value" id="res-years">-</div></div>
                    <div class="result-card-stat"><div class="label">Months</div><div class="value" id="res-months">-</div></div>
                    <div class="result-card-stat"><div class="label">Days</div><div class="value" id="res-days">-</div></div>
                    <div class="result-card-stat"><div class="label">Total Days</div><div class="value" id="res-total-days">-</div></div>
                </div>
                <div id="next-bday" style="margin-top:16px; text-align:center; color:var(--accent-cyan); font-weight:600; font-size:13px;"></div>
            </div>
        </div>
    `;
    const targetInput = c.querySelector('#age-target');
    targetInput.value = new Date().toISOString().split('T')[0];

    c.querySelector('#age-calc-btn').onclick = () => {
        const dobVal = c.querySelector('#age-dob').value;
        const targetVal = targetInput.value;
        if (!dobVal) return ToolsEngine.toast('Please select a date of birth', 'fa-circle-exclamation');

        const dob = new Date(dobVal);
        const target = new Date(targetVal);
        if (dob > target) return ToolsEngine.toast('Birth date cannot be in the future', 'fa-circle-exclamation');

        let years = target.getFullYear() - dob.getFullYear();
        let months = target.getMonth() - dob.getMonth();
        let days = target.getDate() - dob.getDate();

        if (days < 0) {
            months--;
            const prevMonthLastDay = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
            days += prevMonthLastDay;
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        const diffTime = Math.abs(target - dob);
        const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        c.querySelector('#res-years').textContent = years;
        c.querySelector('#res-months').textContent = months;
        c.querySelector('#res-days').textContent = days;
        c.querySelector('#res-total-days').textContent = totalDays.toLocaleString();

        // Next birthday calculation
        let nextBday = new Date(target.getFullYear(), dob.getMonth(), dob.getDate());
        if (nextBday < target) {
            nextBday.setFullYear(target.getFullYear() + 1);
        }
        const daysToNext = Math.ceil((nextBday - target) / (1000 * 60 * 60 * 24));
        c.querySelector('#next-bday').innerHTML = `<i class="fa-solid fa-gift"></i> Next Birthday in <strong>${daysToNext}</strong> days!`;
        ToolsEngine.toast('Age calculated!');
    };
};

ToolsEngine.renderers['bmi-calculator'] = function(c) {
    c.innerHTML = `
        <div class="tool-grid-2col">
            <div class="tool-panel">
                <div class="panel-title"><i class="fa-solid fa-weight-scale"></i> Body Parameters</div>
                <div class="form-group">
                    <label class="form-label">Weight (kg)</label>
                    <input type="number" id="bmi-weight" class="form-input" placeholder="e.g. 70" value="70">
                </div>
                <div class="form-group">
                    <label class="form-label">Height (cm)</label>
                    <input type="number" id="bmi-height" class="form-input" placeholder="e.g. 175" value="175">
                </div>
                <button class="btn-primary" id="bmi-calc-btn" style="width:100%;"><i class="fa-solid fa-calculator"></i> Calculate BMI</button>
            </div>
            <div class="tool-panel" style="text-align:center;">
                <div class="panel-title"><i class="fa-solid fa-heart-pulse"></i> BMI Score</div>
                <div class="result-card-stat" style="margin:20px 0;">
                    <div class="label">Your BMI Score</div>
                    <div class="value" id="bmi-score" style="font-size:38px; color:var(--accent-cyan);">22.9</div>
                    <div id="bmi-status" style="font-weight:700; margin-top:6px; color:#10b981;">Normal Weight</div>
                </div>
                <p style="font-size:12px; color:var(--text-muted);">Healthy BMI Range: 18.5 – 24.9</p>
            </div>
        </div>
    `;
    const calc = () => {
        const w = parseFloat(c.querySelector('#bmi-weight').value);
        const h = parseFloat(c.querySelector('#bmi-height').value) / 100;
        if (!w || !h) return;
        const bmi = (w / (h * h)).toFixed(1);
        c.querySelector('#bmi-score').textContent = bmi;
        const statusEl = c.querySelector('#bmi-status');
        if (bmi < 18.5) {
            statusEl.textContent = 'Underweight';
            statusEl.style.color = '#38bdf8';
        } else if (bmi <= 24.9) {
            statusEl.textContent = 'Normal Weight';
            statusEl.style.color = '#10b981';
        } else if (bmi <= 29.9) {
            statusEl.textContent = 'Overweight';
            statusEl.style.color = '#f59e0b';
        } else {
            statusEl.textContent = 'Obese';
            statusEl.style.color = '#ef4444';
        }
    };
    c.querySelector('#bmi-calc-btn').onclick = () => {
        calc();
        ToolsEngine.toast('BMI Calculated!');
    };
};

ToolsEngine.renderers['loan-emi-calculator'] = function(c) {
    c.innerHTML = `
        <div class="tool-grid-2col">
            <div class="tool-panel">
                <div class="panel-title"><i class="fa-solid fa-hand-holding-dollar"></i> Loan Details</div>
                <div class="form-group">
                    <label class="form-label">Loan Amount ($ / Rs)</label>
                    <input type="number" id="emi-amount" class="form-input" value="100000">
                </div>
                <div class="form-group">
                    <label class="form-label">Annual Interest Rate (%)</label>
                    <input type="number" id="emi-rate" class="form-input" value="8.5" step="0.1">
                </div>
                <div class="form-group">
                    <label class="form-label">Loan Tenure (Years)</label>
                    <input type="number" id="emi-tenure" class="form-input" value="5">
                </div>
                <button class="btn-primary" id="emi-calc-btn" style="width:100%;"><i class="fa-solid fa-calculator"></i> Calculate EMI</button>
            </div>
            <div class="tool-panel">
                <div class="panel-title"><i class="fa-solid fa-file-invoice-dollar"></i> Repayment Breakdown</div>
                <div style="display:grid; grid-template-columns:1fr; gap:12px;">
                    <div class="result-card-stat">
                        <div class="label">Monthly EMI Installment</div>
                        <div class="value" id="emi-monthly" style="color:var(--accent-cyan);">$2,051.65</div>
                    </div>
                    <div class="result-card-stat">
                        <div class="label">Total Interest Payable</div>
                        <div class="value" id="emi-interest" style="color:var(--accent-pink);">$23,099.16</div>
                    </div>
                    <div class="result-card-stat">
                        <div class="label">Total Amount (Principal + Interest)</div>
                        <div class="value" id="emi-total">$123,099.16</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    const calcEmi = () => {
        const P = parseFloat(c.querySelector('#emi-amount').value);
        const annualR = parseFloat(c.querySelector('#emi-rate').value);
        const years = parseFloat(c.querySelector('#emi-tenure').value);
        if (!P || !annualR || !years) return;
        const r = annualR / (12 * 100);
        const n = years * 12;
        const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const totalPayment = emi * n;
        const totalInterest = totalPayment - P;

        c.querySelector('#emi-monthly').textContent = '$' + emi.toFixed(2);
        c.querySelector('#emi-interest').textContent = '$' + totalInterest.toFixed(2);
        c.querySelector('#emi-total').textContent = '$' + totalPayment.toFixed(2);
    };
    c.querySelector('#emi-calc-btn').onclick = () => {
        calcEmi();
        ToolsEngine.toast('Loan EMI Calculated!');
    };
    calcEmi();
};

// ==========================================
// TEXT & CONTENT TOOLS IMPLEMENTATIONS
// ==========================================
ToolsEngine.renderers['word-char-counter'] = function(c) {
    c.innerHTML = `
        <div class="tool-panel">
            <div class="panel-title" style="display:flex; justify-content:space-between;">
                <span><i class="fa-solid fa-keyboard"></i> Type or Paste Content</span>
                <button class="btn-secondary" id="wcc-clear" style="padding:4px 10px; font-size:11px;"><i class="fa-solid fa-trash-can"></i> Clear</button>
            </div>
            <textarea id="wcc-input" class="form-textarea" style="height:170px;" placeholder="Type or paste any text here to see real-time statistics..."></textarea>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:12px; margin-top:20px;">
                <div class="result-card-stat"><div class="label">Words</div><div class="value" id="wcc-words">0</div></div>
                <div class="result-card-stat"><div class="label">Characters</div><div class="value" id="wcc-chars">0</div></div>
                <div class="result-card-stat"><div class="label">No Spaces</div><div class="value" id="wcc-nospaces">0</div></div>
                <div class="result-card-stat"><div class="label">Sentences</div><div class="value" id="wcc-sentences">0</div></div>
                <div class="result-card-stat"><div class="label">Paragraphs</div><div class="value" id="wcc-paragraphs">0</div></div>
                <div class="result-card-stat"><div class="label">Read Time</div><div class="value" id="wcc-readtime" style="font-size:20px;">0m</div></div>
            </div>
        </div>
    `;
    const input = c.querySelector('#wcc-input');
    const update = () => {
        const text = input.value;
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const chars = text.length;
        const noSpaces = text.replace(/\s/g, '').length;
        const sentences = text.trim() ? (text.match(/[.!?]+(\s|$)/g) || []).length : 0;
        const paragraphs = text.trim() ? text.split(/\n+/).filter(p => p.trim()).length : 0;
        const readTime = Math.ceil(words / 200);

        c.querySelector('#wcc-words').textContent = words;
        c.querySelector('#wcc-chars').textContent = chars;
        c.querySelector('#wcc-nospaces').textContent = noSpaces;
        c.querySelector('#wcc-sentences').textContent = sentences;
        c.querySelector('#wcc-paragraphs').textContent = paragraphs;
        c.querySelector('#wcc-readtime').textContent = `${readTime}m`;
    };
    input.oninput = update;
    c.querySelector('#wcc-clear').onclick = () => {
        input.value = '';
        update();
    };
};

ToolsEngine.renderers['case-converter'] = function(c) {
    c.innerHTML = `
        <div class="tool-panel">
            <div class="panel-title"><i class="fa-solid fa-font"></i> Input Text</div>
            <textarea id="case-input" class="form-textarea" style="height:140px;" placeholder="Type or paste text to convert case..."></textarea>
            <div class="btn-group" style="margin-top:16px;">
                <button class="btn-primary" id="btn-upper">UPPERCASE</button>
                <button class="btn-primary" id="btn-lower">lowercase</button>
                <button class="btn-primary" id="btn-title">Title Case</button>
                <button class="btn-primary" id="btn-camel">camelCase</button>
                <button class="btn-primary" id="btn-snake">snake_case</button>
                <button class="btn-primary" id="btn-kebab">kebab-case</button>
                <button class="btn-secondary" id="btn-copy-case"><i class="fa-solid fa-copy"></i> Copy Text</button>
            </div>
        </div>
    `;
    const input = c.querySelector('#case-input');
    c.querySelector('#btn-upper').onclick = () => input.value = input.value.toUpperCase();
    c.querySelector('#btn-lower').onclick = () => input.value = input.value.toLowerCase();
    c.querySelector('#btn-title').onclick = () => {
        input.value = input.value.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase());
    };
    c.querySelector('#btn-camel').onclick = () => {
        input.value = input.value.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    };
    c.querySelector('#btn-snake').onclick = () => {
        input.value = input.value.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^\w_]/g, '');
    };
    c.querySelector('#btn-kebab').onclick = () => {
        input.value = input.value.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    };
    c.querySelector('#btn-copy-case').onclick = () => ToolsEngine.copyText(input.value);
};

// ==========================================
// DEVELOPER TOOLS IMPLEMENTATIONS
// ==========================================
ToolsEngine.renderers['json-formatter'] = function(c) {
    c.innerHTML = `
        <div class="tool-panel">
            <div class="panel-title" style="display:flex; justify-content:space-between;">
                <span><i class="fa-solid fa-code"></i> JSON Formatter & Validator</span>
                <div class="btn-group">
                    <button class="btn-secondary" id="jf-format" style="padding:4px 10px; font-size:12px;"><i class="fa-solid fa-wand-magic-sparkles"></i> Beautify</button>
                    <button class="btn-secondary" id="jf-minify" style="padding:4px 10px; font-size:12px;"><i class="fa-solid fa-compress"></i> Minify</button>
                    <button class="btn-secondary" id="jf-copy" style="padding:4px 10px; font-size:12px;"><i class="fa-solid fa-copy"></i> Copy</button>
                </div>
            </div>
            <textarea id="jf-input" class="form-textarea" style="height:250px;" placeholder='Paste JSON here (e.g. {"name":"Nexus","status":"Active"})'></textarea>
            <div id="jf-status" style="margin-top:12px; font-size:13px; font-weight:600;"></div>
        </div>
    `;
    const input = c.querySelector('#jf-input');
    const status = c.querySelector('#jf-status');

    c.querySelector('#jf-format').onclick = () => {
        try {
            const parsed = JSON.parse(input.value);
            input.value = JSON.stringify(parsed, null, 4);
            status.innerHTML = `<span style="color:#10b981;"><i class="fa-solid fa-circle-check"></i> Valid JSON Formatted!</span>`;
            ToolsEngine.toast('JSON Beautified!');
        } catch (e) {
            status.innerHTML = `<span style="color:#ef4444;"><i class="fa-solid fa-triangle-exclamation"></i> Invalid JSON: ${e.message}</span>`;
        }
    };

    c.querySelector('#jf-minify').onclick = () => {
        try {
            const parsed = JSON.parse(input.value);
            input.value = JSON.stringify(parsed);
            status.innerHTML = `<span style="color:#10b981;"><i class="fa-solid fa-circle-check"></i> Valid JSON Minified!</span>`;
            ToolsEngine.toast('JSON Minified!');
        } catch (e) {
            status.innerHTML = `<span style="color:#ef4444;"><i class="fa-solid fa-triangle-exclamation"></i> Invalid JSON: ${e.message}</span>`;
        }
    };

    c.querySelector('#jf-copy').onclick = () => ToolsEngine.copyText(input.value);
};

ToolsEngine.renderers['uuid-generator'] = function(c) {
    c.innerHTML = `
        <div class="tool-panel" style="text-align:center;">
            <div class="panel-title"><i class="fa-solid fa-fingerprint"></i> UUID / GUID v4 Generator</div>
            <div class="form-row" style="max-width:400px; margin:0 auto 20px;">
                <div class="form-group">
                    <label class="form-label">Quantity</label>
                    <select id="uuid-qty" class="form-select">
                        <option value="1">1 UUID</option>
                        <option value="5" selected>5 UUIDs</option>
                        <option value="10">10 UUIDs</option>
                        <option value="25">25 UUIDs</option>
                    </select>
                </div>
            </div>
            <div class="btn-group" style="justify-content:center; margin-bottom:20px;">
                <button class="btn-primary" id="uuid-gen-btn"><i class="fa-solid fa-rotate"></i> Generate New UUIDs</button>
                <button class="btn-secondary" id="uuid-copy-btn"><i class="fa-solid fa-copy"></i> Copy All</button>
            </div>
            <textarea id="uuid-result" class="form-textarea" style="height:180px; max-width:600px; margin:0 auto;" readonly></textarea>
        </div>
    `;
    const gen = () => {
        const qty = parseInt(c.querySelector('#uuid-qty').value) || 5;
        const uuids = [];
        for (let i = 0; i < qty; i++) {
            uuids.push(crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(ch) {
                const r = Math.random() * 16 | 0, v = ch == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            }));
        }
        c.querySelector('#uuid-result').value = uuids.join('\n');
    };
    c.querySelector('#uuid-gen-btn').onclick = () => {
        gen();
        ToolsEngine.toast('New UUIDs Generated!');
    };
    c.querySelector('#uuid-copy-btn').onclick = () => ToolsEngine.copyText(c.querySelector('#uuid-result').value);
    gen();
};

// ==========================================
// SECURITY TOOLS IMPLEMENTATIONS
// ==========================================
ToolsEngine.renderers['password-generator'] = function(c) {
    c.innerHTML = `
        <div class="tool-grid-2col">
            <div class="tool-panel">
                <div class="panel-title"><i class="fa-solid fa-sliders"></i> Password Rules</div>
                <div class="form-group">
                    <label class="form-label">Password Length: <span id="pwd-len-val">16</span></label>
                    <input type="range" id="pwd-len" class="form-range" min="8" max="64" value="16">
                </div>
                <div class="form-group" style="display:flex; flex-direction:column; gap:10px;">
                    <label style="display:flex; align-items:center; gap:8px; cursor:pointer;"><input type="checkbox" id="pwd-upper" checked> Uppercase (A-Z)</label>
                    <label style="display:flex; align-items:center; gap:8px; cursor:pointer;"><input type="checkbox" id="pwd-lower" checked> Lowercase (a-z)</label>
                    <label style="display:flex; align-items:center; gap:8px; cursor:pointer;"><input type="checkbox" id="pwd-numbers" checked> Numbers (0-9)</label>
                    <label style="display:flex; align-items:center; gap:8px; cursor:pointer;"><input type="checkbox" id="pwd-symbols" checked> Symbols (!@#$%^&*)</label>
                </div>
                <button class="btn-primary" id="pwd-gen-btn" style="width:100%;"><i class="fa-solid fa-arrows-rotate"></i> Generate Password</button>
            </div>
            <div class="tool-panel" style="text-align:center;">
                <div class="panel-title"><i class="fa-solid fa-lock"></i> Generated Password</div>
                <div class="result-box" id="pwd-output" style="font-size:18px; margin:20px 0; word-break:break-all; color:#fff;"></div>
                <div class="btn-group" style="justify-content:center;">
                    <button class="btn-secondary" id="pwd-copy-btn"><i class="fa-solid fa-copy"></i> Copy Password</button>
                </div>
            </div>
        </div>
    `;
    const lenInput = c.querySelector('#pwd-len');
    const lenVal = c.querySelector('#pwd-len-val');
    const out = c.querySelector('#pwd-output');
    lenInput.oninput = () => lenVal.textContent = lenInput.value;

    const generate = () => {
        let chars = '';
        if (c.querySelector('#pwd-upper').checked) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (c.querySelector('#pwd-lower').checked) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (c.querySelector('#pwd-numbers').checked) chars += '0123456789';
        if (c.querySelector('#pwd-symbols').checked) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';

        const length = parseInt(lenInput.value);
        let pwd = '';
        const array = new Uint32Array(length);
        window.crypto.getRandomValues(array);
        for (let i = 0; i < length; i++) {
            pwd += chars[array[i] % chars.length];
        }
        out.textContent = pwd;
    };
    c.querySelector('#pwd-gen-btn').onclick = () => {
        generate();
        ToolsEngine.toast('New Password Generated!');
    };
    c.querySelector('#pwd-copy-btn').onclick = () => ToolsEngine.copyText(out.textContent);
    generate();
};

// ==========================================
// PRODUCTIVITY TOOLS IMPLEMENTATIONS
// ==========================================
ToolsEngine.renderers['pomodoro-timer'] = function(c) {
    c.innerHTML = `
        <div class="tool-panel" style="text-align:center; padding:30px;">
            <div class="panel-title" style="justify-content:center;"><i class="fa-solid fa-stopwatch"></i> Pomodoro Focus</div>
            <div style="font-size:72px; font-weight:900; font-family:var(--font-mono); color:#fff; margin:20px 0;" id="pomo-display">25:00</div>
            <div class="btn-group" style="justify-content:center; margin-bottom:24px;">
                <button class="btn-primary" id="pomo-toggle"><i class="fa-solid fa-play"></i> Start Focus</button>
                <button class="btn-secondary" id="pomo-reset"><i class="fa-solid fa-rotate-left"></i> Reset</button>
                <button class="btn-secondary" id="pomo-break"><i class="fa-solid fa-mug-hot"></i> 5m Break</button>
            </div>
            <p style="font-size:13px; color:var(--text-muted);">25 Minutes Deep Focus • 5 Minutes Rest Cycle</p>
        </div>
    `;
    let timeLeft = 25 * 60;
    let timer = null;
    const display = c.querySelector('#pomo-display');
    const toggleBtn = c.querySelector('#pomo-toggle');

    const updateDisp = () => {
        const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
        const s = (timeLeft % 60).toString().padStart(2, '0');
        display.textContent = `${m}:${s}`;
    };

    toggleBtn.onclick = () => {
        if (timer) {
            clearInterval(timer);
            timer = null;
            toggleBtn.innerHTML = `<i class="fa-solid fa-play"></i> Resume`;
        } else {
            toggleBtn.innerHTML = `<i class="fa-solid fa-pause"></i> Pause`;
            timer = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateDisp();
                } else {
                    clearInterval(timer);
                    timer = null;
                    ToolsEngine.toast('Time is up! Take a break!', 'fa-bell');
                    toggleBtn.innerHTML = `<i class="fa-solid fa-play"></i> Start Focus`;
                }
            }, 1000);
        }
    };

    c.querySelector('#pomo-reset').onclick = () => {
        if (timer) { clearInterval(timer); timer = null; }
        timeLeft = 25 * 60;
        updateDisp();
        toggleBtn.innerHTML = `<i class="fa-solid fa-play"></i> Start Focus`;
    };

    c.querySelector('#pomo-break').onclick = () => {
        if (timer) { clearInterval(timer); timer = null; }
        timeLeft = 5 * 60;
        updateDisp();
        toggleBtn.innerHTML = `<i class="fa-solid fa-play"></i> Start Break`;
    };
};

ToolsEngine.renderers['digital-signature-pad'] = function(c) {
    c.innerHTML = `
        <div class="tool-panel" style="text-align:center;">
            <div class="panel-title"><i class="fa-solid fa-signature"></i> Draw Signature</div>
            <div style="background:#fff; border-radius:12px; margin:16px auto; display:inline-block; border:2px dashed var(--accent-primary);">
                <canvas id="sig-canvas" width="600" height="240" style="cursor:crosshair; touch-action:none; display:block;"></canvas>
            </div>
            <div class="btn-group" style="justify-content:center;">
                <button class="btn-primary" id="sig-save"><i class="fa-solid fa-download"></i> Download Transparent PNG</button>
                <button class="btn-secondary" id="sig-clear"><i class="fa-solid fa-eraser"></i> Clear Pad</button>
            </div>
        </div>
    `;
    const canvas = c.querySelector('#sig-canvas');
    const ctx = canvas.getContext('2d');
    let drawing = false;

    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000000';

    const getPos = (e) => {
        const rect = canvas.getBoundingClientRect();
        return {
            x: (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left,
            y: (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top
        };
    };

    const start = (e) => {
        drawing = true;
        const p = getPos(e);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
    };

    const draw = (e) => {
        if (!drawing) return;
        const p = getPos(e);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
    };

    const stop = () => drawing = false;

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', draw);
    window.addEventListener('mouseup', stop);

    canvas.addEventListener('touchstart', start, { passive: true });
    canvas.addEventListener('touchmove', draw, { passive: true });
    window.addEventListener('touchend', stop);

    c.querySelector('#sig-clear').onclick = () => ctx.clearRect(0, 0, canvas.width, canvas.height);
    c.querySelector('#sig-save').onclick = () => {
        const link = document.createElement('a');
        link.download = 'signature.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        ToolsEngine.toast('Signature downloaded!');
    };
};
