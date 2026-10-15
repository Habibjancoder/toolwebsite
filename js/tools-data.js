/**
 * NexusTools 3D - Complete Registry of 150+ Tools
 * All tools are 100% client-side, zero backend required.
 */

const TOOL_CATEGORIES = {
    all: { id: "all", name: "All Tools", icon: "fa-solid fa-shapes", count: 150 },
    image: { id: "image", name: "Image & Media", icon: "fa-solid fa-image", count: 18 },
    calculators: { id: "calculators", name: "Calculators & Math", icon: "fa-solid fa-calculator", count: 25 },
    text: { id: "text", name: "Text & Content", icon: "fa-solid fa-font", count: 25 },
    developer: { id: "developer", name: "Developer & Code", icon: "fa-solid fa-code", count: 25 },
    converter: { id: "converter", name: "Unit Converters", icon: "fa-solid fa-arrow-right-arrow-left", count: 20 },
    security: { id: "security", name: "Security & Network", icon: "fa-solid fa-shield-halved", count: 17 },
    productivity: { id: "productivity", name: "Productivity & Life", icon: "fa-solid fa-compass-drafting", count: 20 }
};

const TOOLS_DATABASE = [
    // ==========================================
    // 1. IMAGE & MEDIA TOOLS (1-18)
    // ==========================================
    {
        id: "image-resizer",
        title: "Image Resizer",
        category: "image",
        icon: "fa-solid fa-up-right-and-down-left-from-center",
        description: "Resize any JPG, PNG or WEBP to exact pixel dimensions with aspect ratio lock.",
        tags: ["image", "resize", "scale", "dimensions", "photo"]
    },
    {
        id: "image-compressor",
        title: "Image Compressor",
        category: "image",
        icon: "fa-solid fa-file-zipper",
        description: "Compress images with custom quality slider to drastically reduce file size.",
        tags: ["compress", "image", "size", "optimizaton", "shrink"]
    },
    {
        id: "image-converter",
        title: "Image Format Converter",
        category: "image",
        icon: "fa-solid fa-arrows-rotate",
        description: "Convert images between PNG, JPEG, WEBP and BMP in high fidelity.",
        tags: ["convert", "png", "jpg", "webp", "format"]
    },
    {
        id: "image-to-base64",
        title: "Image to Base64",
        category: "image",
        icon: "fa-solid fa-code-compare",
        description: "Convert images to Base64 Data URI strings for web embedding.",
        tags: ["base64", "data uri", "embed", "css image"]
    },
    {
        id: "base64-to-image",
        title: "Base64 to Image",
        category: "image",
        icon: "fa-solid fa-photo-film",
        description: "Decode Base64 strings back to downloadable image files.",
        tags: ["decode", "base64", "preview", "download"]
    },
    {
        id: "image-filters",
        title: "Photo Filters & Studio",
        category: "image",
        icon: "fa-solid fa-wand-magic-sparkles",
        description: "Apply brightness, contrast, blur, grayscale, sepia, invert and hue effects.",
        tags: ["filter", "photo editor", "effects", "contrast", "brightness"]
    },
    {
        id: "color-palette-extractor",
        title: "Image Color Extractor",
        category: "image",
        icon: "fa-solid fa-palette",
        description: "Extract dominant color swatches and hex codes from any uploaded image.",
        tags: ["color", "palette", "extract", "hex", "design"]
    },
    {
        id: "qr-generator",
        title: "QR Code Generator",
        category: "image",
        icon: "fa-solid fa-qrcode",
        description: "Generate high-res QR codes for URLs, WiFi, texts, and WhatsApp with download.",
        tags: ["qr code", "barcode", "generator", "link", "wifi"]
    },
    {
        id: "qr-scanner",
        title: "QR Code Scanner",
        category: "image",
        icon: "fa-solid fa-expand",
        description: "Scan QR codes from image files or webcam directly in the browser.",
        tags: ["qr scan", "camera", "read qr", "barcode"]
    },
    {
        id: "meme-generator",
        title: "Meme Generator",
        category: "image",
        icon: "fa-solid fa-face-grin-squint-tears",
        description: "Create viral memes with custom top and bottom text, font styles, and stickers.",
        tags: ["meme", "funny", "caption", "generator"]
    },
    {
        id: "favicon-generator",
        title: "Favicon Generator",
        category: "image",
        icon: "fa-solid fa-icons",
        description: "Generate 16x16, 32x32, 48x48 and 128x128 icons for your website.",
        tags: ["favicon", "icon", "website", "ico"]
    },
    {
        id: "aspect-ratio-calc",
        title: "Aspect Ratio Calculator",
        category: "image",
        icon: "fa-solid fa-crop",
        description: "Calculate 16:9, 4:3, 21:9 dimensions or custom proportions instantly.",
        tags: ["aspect ratio", "dimensions", "16:9", "screen"]
    },
    {
        id: "svg-to-png",
        title: "SVG to PNG Converter",
        category: "image",
        icon: "fa-solid fa-bezier-curve",
        description: "Render vector SVG graphics into raster high-resolution PNG images.",
        tags: ["svg", "vector", "raster", "png", "convert"]
    },
    {
        id: "watermark-adder",
        title: "Image Watermark Adder",
        category: "image",
        icon: "fa-solid fa-stamp",
        description: "Stamp your photos with text or transparent watermark copyright overlays.",
        tags: ["watermark", "protect", "stamp", "copyright"]
    },
    {
        id: "image-flipper",
        title: "Flip & Rotate Image",
        category: "image",
        icon: "fa-solid fa-rotate",
        description: "Rotate 90°, 180°, 270° and flip horizontally or vertically.",
        tags: ["rotate", "flip", "mirror", "orientation"]
    },
    {
        id: "css-gradient-gen",
        title: "CSS Gradient Generator",
        category: "image",
        icon: "fa-solid fa-fill-drip",
        description: "Design linear, radial and mesh glowing gradients with instant CSS code.",
        tags: ["css", "gradient", "ui", "background", "colors"]
    },
    {
        id: "color-converter",
        title: "HEX to RGB & HSL Converter",
        category: "image",
        icon: "fa-solid fa-eye-dropper",
        description: "Convert colors between HEX, RGB, HSL, HSV and CMYK color spaces.",
        tags: ["hex", "rgb", "hsl", "color converter", "cmyk"]
    },
    {
        id: "ascii-art-gen",
        title: "ASCII Art Generator",
        category: "image",
        icon: "fa-solid fa-terminal",
        description: "Convert photos or text into creative ASCII symbol and character art.",
        tags: ["ascii", "text art", "retro", "cli"]
    },

    // ==========================================
    // 2. CALCULATORS & MATHEMATICS (19-43)
    // ==========================================
    {
        id: "scientific-calculator",
        title: "Scientific Calculator",
        category: "calculators",
        icon: "fa-solid fa-calculator",
        description: "Full-featured scientific calculator with sin, cos, tan, log, sqrt and memory.",
        tags: ["calc", "math", "scientific", "trigonometry", "logarithm"]
    },
    {
        id: "age-calculator",
        title: "Age & Birthday Calculator",
        category: "calculators",
        icon: "fa-solid fa-cake-candles",
        description: "Find exact age in years, months, weeks, days, hours, and next birthday countdown.",
        tags: ["age", "birthday", "days", "calendar"]
    },
    {
        id: "bmi-calculator",
        title: "BMI & Ideal Weight Calculator",
        category: "calculators",
        icon: "fa-solid fa-weight-scale",
        description: "Calculate Body Mass Index, health category, and healthy target weight range.",
        tags: ["bmi", "fitness", "health", "weight", "diet"]
    },
    {
        id: "loan-emi-calculator",
        title: "Loan EMI & Mortgage Calc",
        category: "calculators",
        icon: "fa-solid fa-money-bill-transfer",
        description: "Calculate monthly EMI installments, total payable interest, and breakdown.",
        tags: ["loan", "emi", "mortgage", "bank", "interest"]
    },
    {
        id: "percentage-calculator",
        title: "Percentage Calculator",
        category: "calculators",
        icon: "fa-solid fa-percent",
        description: "Calculate X% of Y, percentage increase/decrease, and ratios in one click.",
        tags: ["percent", "ratio", "math", "discount"]
    },
    {
        id: "compound-interest-calc",
        title: "Compound Interest Calculator",
        category: "calculators",
        icon: "fa-solid fa-chart-line",
        description: "Calculate compound growth on investments with annual, monthly or daily compounding.",
        tags: ["compound", "invest", "wealth", "interest", "finance"]
    },
    {
        id: "simple-interest-calc",
        title: "Simple Interest Calculator",
        category: "calculators",
        icon: "fa-solid fa-sack-dollar",
        description: "Standard simple interest calculation (P * R * T / 100) with detailed summary.",
        tags: ["simple interest", "principal", "finance", "rate"]
    },
    {
        id: "discount-calculator",
        title: "Discount & Sale Calculator",
        category: "calculators",
        icon: "fa-solid fa-tag",
        description: "Compute final discounted price, total savings, and post-tax totals.",
        tags: ["discount", "shopping", "sale", "save", "tax"]
    },
    {
        id: "bmr-calorie-calc",
        title: "BMR & Calorie Calculator",
        category: "calculators",
        icon: "fa-solid fa-fire-flame-curved",
        description: "Basal Metabolic Rate & daily caloric needs for weight loss, maintenance or gain.",
        tags: ["bmr", "calories", "metabolism", "diet", "gym"]
    },
    {
        id: "tip-splitter",
        title: "Tip & Bill Splitter",
        category: "calculators",
        icon: "fa-solid fa-receipt",
        description: "Calculate restaurant tips and split the bill evenly per person.",
        tags: ["tip", "bill split", "restaurant", "dining"]
    },
    {
        id: "gpa-calculator",
        title: "GPA & CGPA Calculator",
        category: "calculators",
        icon: "fa-solid fa-graduation-cap",
        description: "Calculate 4.0 scale semester GPA and cumulative CGPA across courses.",
        tags: ["gpa", "cgpa", "grade", "university", "college"]
    },
    {
        id: "sales-tax-calc",
        title: "Sales Tax & GST Calculator",
        category: "calculators",
        icon: "fa-solid fa-file-invoice-dollar",
        description: "Add or remove GST / Sales Tax to calculate net and gross amounts.",
        tags: ["tax", "gst", "vat", "finance", "billing"]
    },
    {
        id: "date-difference-calc",
        title: "Date Duration Calculator",
        category: "calculators",
        icon: "fa-solid fa-calendar-days",
        description: "Count days, weeks, months, business days between any two dates.",
        tags: ["date", "duration", "calendar", "days between"]
    },
    {
        id: "pregnancy-due-calc",
        title: "Pregnancy Due Date Calculator",
        category: "calculators",
        icon: "fa-solid fa-baby",
        description: "Calculate estimated due date based on Last Menstrual Period (LMP) or conception.",
        tags: ["pregnancy", "due date", "baby", "health"]
    },
    {
        id: "body-fat-calc",
        title: "Body Fat Percentage Calc",
        category: "calculators",
        icon: "fa-solid fa-person",
        description: "Estimate body fat percentage using US Navy circumference tape method.",
        tags: ["body fat", "fitness", "navy method", "health"]
    },
    {
        id: "water-intake-calc",
        title: "Daily Water Intake Calculator",
        category: "calculators",
        icon: "fa-solid fa-bottle-water",
        description: "Calculate optimal daily water hydration based on weight and activity levels.",
        tags: ["water", "hydration", "health", "daily intake"]
    },
    {
        id: "speed-distance-time",
        title: "Speed, Distance & Time",
        category: "calculators",
        icon: "fa-solid fa-gauge-high",
        description: "Solve for any variable in Speed = Distance / Time with multiple units.",
        tags: ["speed", "distance", "time", "physics", "travel"]
    },
    {
        id: "fuel-cost-calc",
        title: "Fuel Cost & Mileage Calc",
        category: "calculators",
        icon: "fa-solid fa-gas-pump",
        description: "Estimate road trip fuel costs, liters needed, and cost per passenger.",
        tags: ["fuel", "mileage", "trip", "gas", "car"]
    },
    {
        id: "prime-number-calc",
        title: "Prime Number Checker",
        category: "calculators",
        icon: "fa-solid fa-hashtag",
        description: "Check if any number is prime, view factors, or generate prime lists.",
        tags: ["prime", "math", "factors", "number theory"]
    },
    {
        id: "random-number-gen",
        title: "Random Number Generator",
        category: "calculators",
        icon: "fa-solid fa-shuffle",
        description: "Generate cryptographically fair random numbers within custom ranges.",
        tags: ["random", "rng", "lottery", "dice"]
    },
    {
        id: "permutations-combinations",
        title: "Permutations & Combinations",
        category: "calculators",
        icon: "fa-solid fa-layer-group",
        description: "Compute nPr (permutations), nCr (combinations), and n! factorials.",
        tags: ["permutation", "combination", "factorial", "math"]
    },
    {
        id: "gcd-lcm-calc",
        title: "GCD & LCM Calculator",
        category: "calculators",
        icon: "fa-solid fa-divide",
        description: "Find Greatest Common Divisor and Least Common Multiple of multiple numbers.",
        tags: ["gcd", "lcm", "divisor", "multiples", "math"]
    },
    {
        id: "quadratic-solver",
        title: "Quadratic Equation Solver",
        category: "calculators",
        icon: "fa-solid fa-square-root-variable",
        description: "Find real and complex roots for ax² + bx + c = 0 with step-by-step discriminant.",
        tags: ["quadratic", "algebra", "roots", "equation"]
    },
    {
        id: "fraction-simplifier",
        title: "Fraction Simplifier & Decimal",
        category: "calculators",
        icon: "fa-solid fa-fraction",
        description: "Reduce fractions to simplest forms and convert to exact decimals.",
        tags: ["fraction", "simplifier", "decimal", "math"]
    },
    {
        id: "statistics-calc",
        title: "Mean, Median & Mode Calc",
        category: "calculators",
        icon: "fa-solid fa-chart-simple",
        description: "Calculate average (mean), median, mode, variance, and standard deviation.",
        tags: ["statistics", "mean", "median", "mode", "std dev"]
    },

    // ==========================================
    // 3. TEXT & CONTENT TOOLS (44-68)
    // ==========================================
    {
        id: "word-char-counter",
        title: "Word & Character Counter",
        category: "text",
        icon: "fa-solid fa-list-ol",
        description: "Count words, characters, characters without spaces, sentences and paragraphs.",
        tags: ["word count", "character count", "essay", "stats"]
    },
    {
        id: "case-converter",
        title: "Text Case Converter",
        category: "text",
        icon: "fa-solid fa-text-height",
        description: "Convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case.",
        tags: ["case", "uppercase", "lowercase", "camelcase", "slug"]
    },
    {
        id: "slug-generator",
        title: "URL Slug Generator",
        category: "text",
        icon: "fa-solid fa-link",
        description: "Generate clean, SEO-friendly URL slugs from any headline or text.",
        tags: ["slug", "url", "seo", "permalink"]
    },
    {
        id: "lorem-ipsum-gen",
        title: "Lorem Ipsum Generator",
        category: "text",
        icon: "fa-solid fa-paragraph",
        description: "Generate standard placeholder dummy text by paragraphs, sentences, or words.",
        tags: ["lorem ipsum", "placeholder", "dummy text", "design"]
    },
    {
        id: "duplicate-line-remover",
        title: "Duplicate Line Remover",
        category: "text",
        icon: "fa-solid fa-filter-circle-xmark",
        description: "Remove duplicate lines from lists or text documents while preserving order.",
        tags: ["duplicate", "deduplicate", "list", "clean text"]
    },
    {
        id: "text-reverser",
        title: "Text Reverser & Inverter",
        category: "text",
        icon: "fa-solid fa-arrows-left-right",
        description: "Reverse words, reverse letters, or flip your text upside-down.",
        tags: ["reverse", "invert", "flip text", "fun"]
    },
    {
        id: "text-to-speech",
        title: "Text to Speech (TTS)",
        category: "text",
        icon: "fa-solid fa-volume-high",
        description: "Listen to any text spoken in natural human voices with speed & pitch control.",
        tags: ["tts", "speech", "voice", "audio", "listen"]
    },
    {
        id: "speech-to-text",
        title: "Voice to Text Typer",
        category: "text",
        icon: "fa-solid fa-microphone",
        description: "Dictate text into your browser using live voice recognition speech-to-text.",
        tags: ["dictation", "speech to text", "voice typing", "audio"]
    },
    {
        id: "markdown-previewer",
        title: "Markdown Live Editor",
        category: "text",
        icon: "fa-brands fa-markdown",
        description: "Write Markdown with live HTML preview and export to HTML or raw markdown.",
        tags: ["markdown", "editor", "preview", "html"]
    },
    {
        id: "text-diff-checker",
        title: "Text Diff & Compare",
        category: "text",
        icon: "fa-solid fa-code-compare",
        description: "Compare two blocks of text side-by-side to highlight added, removed, or changed lines.",
        tags: ["diff", "compare", "text compare", "revisions"]
    },
    {
        id: "morse-code-translator",
        title: "Morse Code Translator",
        category: "text",
        icon: "fa-solid fa-ellipsis",
        description: "Encode text to Morse code and decode Morse with live sound beep playback.",
        tags: ["morse", "code", "telegraph", "audio beep"]
    },
    {
        id: "binary-translator",
        title: "Binary to Text / Text to Binary",
        category: "text",
        icon: "fa-solid fa-0",
        description: "Convert text to 8-bit binary 010101 codes and decode binary to English.",
        tags: ["binary", "01", "decode", "ascii"]
    },
    {
        id: "base64-text-encoder",
        title: "Base64 Text Encoder / Decoder",
        category: "text",
        icon: "fa-solid fa-shield",
        description: "Encode any text string into Base64 or decode Base64 data strings safely.",
        tags: ["base64", "encode", "decode", "crypto"]
    },
    {
        id: "url-encoder-decoder",
        title: "URL Encoder & Decoder",
        category: "text",
        icon: "fa-solid fa-globe",
        description: "Encode special characters into %20 URL percent-encoding and decode back.",
        tags: ["url encode", "percent encoding", "uri", "web"]
    },
    {
        id: "html-entity-coder",
        title: "HTML Entity Encoder / Decoder",
        category: "text",
        icon: "fa-solid fa-code",
        description: "Escape HTML characters (&amp;, &lt;, &gt;) for safe display in code.",
        tags: ["html entities", "escape", "unescape", "security"]
    },
    {
        id: "rot13-cipher",
        title: "ROT13 & Caesar Cipher",
        category: "text",
        icon: "fa-solid fa-key",
        description: "Obfuscate text using ROT13 or shift Caesar cipher with custom shift key.",
        tags: ["rot13", "caesar", "cipher", "cryptography"]
    },
    {
        id: "read-time-calc",
        title: "Reading & Speech Time Calc",
        category: "text",
        icon: "fa-solid fa-clock",
        description: "Estimate average reading duration and speaking speech duration for speeches/articles.",
        tags: ["reading time", "speech duration", "words per minute"]
    },
    {
        id: "line-sorter",
        title: "Line Sorter & Alphabetizer",
        category: "text",
        icon: "fa-solid fa-arrow-down-a-z",
        description: "Sort lines alphabetically (A-Z, Z-A), by length, or natural number sorting.",
        tags: ["sort", "alphabetize", "order", "list"]
    },
    {
        id: "find-replace-tool",
        title: "Multi-line Find & Replace",
        category: "text",
        icon: "fa-solid fa-magnifying-glass-arrow-right",
        description: "Find and replace text patterns across multiline documents with Regex toggle.",
        tags: ["find replace", "regex", "search text", "bulk edit"]
    },
    {
        id: "invisible-char-detector",
        title: "Invisible Character Cleaner",
        category: "text",
        icon: "fa-solid fa-ghost",
        description: "Detect and remove zero-width spaces, hidden Unicode, and rogue spaces.",
        tags: ["invisible characters", "zero width", "unicode", "sanitize"]
    },
    {
        id: "string-byte-calc",
        title: "String Byte & Memory Size",
        category: "text",
        icon: "fa-solid fa-memory",
        description: "Calculate exact byte size in UTF-8, UTF-16, and ASCII formats.",
        tags: ["byte size", "utf8", "memory", "string size"]
    },
    {
        id: "text-to-ascii-hex",
        title: "Text to ASCII & Hex Values",
        category: "text",
        icon: "fa-solid fa-table-cells",
        description: "Translate each character to its ASCII decimal and hexadecimal values.",
        tags: ["ascii", "hex", "unicode values", "char code"]
    },
    {
        id: "word-frequency-counter",
        title: "Word Frequency & Density",
        category: "text",
        icon: "fa-solid fa-chart-column",
        description: "Analyze most frequent words and their percentage density in your text.",
        tags: ["word frequency", "density", "seo", "text analysis"]
    },
    {
        id: "whitespace-remover",
        title: "Whitespace & Linebreak Remover",
        category: "text",
        icon: "fa-solid fa-broom",
        description: "Strip extra spaces, tabs, or blank lines to compress text to a single block.",
        tags: ["whitespace", "tabs", "blank lines", "cleaner"]
    },
    {
        id: "random-item-picker",
        title: "Random List Item Picker",
        category: "text",
        icon: "fa-solid fa-hand-pointer",
        description: "Pick one or more random lucky winners or choices from any list of lines.",
        tags: ["random picker", "giveaway", "lottery", "winner"]
    },

    // ==========================================
    // 4. DEVELOPER & CODE TOOLS (69-93)
    // ==========================================
    {
        id: "json-formatter",
        title: "JSON Formatter & Validator",
        category: "developer",
        icon: "fa-solid fa-code-commit",
        description: "Prettify, validate syntax, collapse, and minify JSON with error pointer.",
        tags: ["json", "formatter", "prettify", "validate", "minify"]
    },
    {
        id: "json-to-csv",
        title: "JSON to CSV Converter",
        category: "developer",
        icon: "fa-solid fa-file-csv",
        description: "Transform JSON arrays into tabular CSV format with instant download.",
        tags: ["json to csv", "convert", "table", "export"]
    },
    {
        id: "csv-to-json",
        title: "CSV to JSON Converter",
        category: "developer",
        icon: "fa-solid fa-file-code",
        description: "Parse CSV spreadsheets into clean JSON objects and arrays.",
        tags: ["csv to json", "parse", "spreadsheet", "data"]
    },
    {
        id: "html-minifier",
        title: "HTML Minifier & Beautifier",
        category: "developer",
        icon: "fa-brands fa-html5",
        description: "Minify HTML to reduce page load time or beautify nested HTML tags.",
        tags: ["html", "minify", "beautify", "web dev"]
    },
    {
        id: "css-minifier",
        title: "CSS Minifier & Formatter",
        category: "developer",
        icon: "fa-brands fa-css3-alt",
        description: "Compress stylesheet CSS code or expand and format cleanly.",
        tags: ["css", "minify", "beautify", "stylesheet"]
    },
    {
        id: "js-minifier",
        title: "JavaScript Minifier & Formatter",
        category: "developer",
        icon: "fa-brands fa-js",
        description: "Minify JavaScript code or format with clean indentation and spacing.",
        tags: ["javascript", "minify", "beautify", "code"]
    },
    {
        id: "sql-formatter",
        title: "SQL Query Formatter",
        category: "developer",
        icon: "fa-solid fa-database",
        description: "Format SELECT, INSERT, UPDATE, JOIN SQL statements for easy reading.",
        tags: ["sql", "database", "query", "format"]
    },
    {
        id: "regex-tester",
        title: "Regex Tester & Cheat Sheet",
        category: "developer",
        icon: "fa-solid fa-asterisk",
        description: "Test regular expressions with flags (g, i, m) and match highlights.",
        tags: ["regex", "regular expression", "test", "pattern"]
    },
    {
        id: "uuid-generator",
        title: "UUID / GUID v4 Generator",
        category: "developer",
        icon: "fa-solid fa-fingerprint",
        description: "Generate single or bulk RFC4122 compliant UUID v4 identifiers.",
        tags: ["uuid", "guid", "v4", "unique id"]
    },
    {
        id: "hash-generator",
        title: "Cryptographic Hash Generator",
        category: "developer",
        icon: "fa-solid fa-hashtag",
        description: "Generate SHA-256, SHA-512, SHA-1, and MD5 cryptographic hashes.",
        tags: ["hash", "sha256", "sha512", "md5", "crypto"]
    },
    {
        id: "jwt-decoder",
        title: "JWT Debugger & Decoder",
        category: "developer",
        icon: "fa-solid fa-shield-virus",
        description: "Decode JSON Web Tokens to inspect Header, Payload, and expiration timestamps.",
        tags: ["jwt", "token", "auth", "decoder"]
    },
    {
        id: "meta-tags-gen",
        title: "Meta Tags & SEO Generator",
        category: "developer",
        icon: "fa-solid fa-tags",
        description: "Generate complete HTML meta tags for SEO, Google, Open Graph and Twitter cards.",
        tags: ["meta tags", "seo", "open graph", "social media"]
    },
    {
        id: "robots-txt-gen",
        title: "Robots.txt Generator",
        category: "developer",
        icon: "fa-solid fa-robot",
        description: "Create search engine crawler rules for Googlebot, Bingbot with custom directives.",
        tags: ["robots.txt", "seo", "crawler", "googlebot"]
    },
    {
        id: "htaccess-generator",
        title: ".htaccess Code Generator",
        category: "developer",
        icon: "fa-solid fa-server",
        description: "Generate Apache .htaccess rules for HTTPS redirect, www/non-www, and gzip caching.",
        tags: ["htaccess", "apache", "redirect", "https", "hostinger"]
    },
    {
        id: "user-agent-parser",
        title: "User Agent Inspector",
        category: "developer",
        icon: "fa-solid fa-laptop-code",
        description: "Parse browser User Agent string to identify OS, browser engine, and device type.",
        tags: ["user agent", "browser", "os", "device"]
    },
    {
        id: "http-status-codes",
        title: "HTTP Status Code Reference",
        category: "developer",
        icon: "fa-solid fa-network-wired",
        description: "Search and learn all HTTP codes (200 OK, 301 Redirect, 404 Not Found, 500 Error).",
        tags: ["http status", "200", "404", "500", "api"]
    },
    {
        id: "markdown-table-gen",
        title: "Markdown Table Generator",
        category: "developer",
        icon: "fa-solid fa-table",
        description: "Design tabular data visually and copy clean Markdown table code.",
        tags: ["markdown table", "table", "generator", "docs"]
    },
    {
        id: "table-to-csv",
        title: "HTML Table to CSV Converter",
        category: "developer",
        icon: "fa-solid fa-file-export",
        description: "Extract data from raw HTML tables and convert directly into CSV or JSON.",
        tags: ["html table", "csv", "table scraper", "export"]
    },
    {
        id: "css-box-shadow-gen",
        title: "CSS Box Shadow Generator",
        category: "developer",
        icon: "fa-solid fa-sun",
        description: "Design multi-layer glowing or soft shadows with blur, spread, and inset controls.",
        tags: ["box shadow", "css", "shadow", "glow", "ui design"]
    },
    {
        id: "css-border-radius-gen",
        title: "Fancy Border Radius Generator",
        category: "developer",
        icon: "fa-solid fa-shapes",
        description: "Create organic 8-point blob shapes and copy CSS border-radius code.",
        tags: ["border radius", "blob", "css shape", "ui"]
    },
    {
        id: "css-flexbox-playground",
        title: "CSS Flexbox Playground",
        category: "developer",
        icon: "fa-solid fa-boxes-stacked",
        description: "Visualize flex-direction, justify-content, align-items with generated CSS code.",
        tags: ["flexbox", "css", "layout", "cheatsheet"]
    },
    {
        id: "css-grid-generator",
        title: "CSS Grid Code Generator",
        category: "developer",
        icon: "fa-solid fa-border-all",
        description: "Set rows, columns, and gaps visually to generate modern CSS Grid stylesheets.",
        tags: ["grid", "css grid", "layout", "web design"]
    },
    {
        id: "keycode-viewer",
        title: "JavaScript KeyCode Viewer",
        category: "developer",
        icon: "fa-solid fa-keyboard",
        description: "Press any key on your keyboard to instantly see key, code, which, and keyCode.",
        tags: ["keycode", "javascript", "keyboard", "event.key"]
    },
    {
        id: "curl-to-fetch",
        title: "cURL to JavaScript Fetch",
        category: "developer",
        icon: "fa-solid fa-terminal",
        description: "Convert command-line cURL commands into JavaScript fetch() or Python requests.",
        tags: ["curl", "fetch", "api", "converter"]
    },
    {
        id: "unix-timestamp-calc",
        title: "Unix Timestamp Converter",
        category: "developer",
        icon: "fa-solid fa-stopwatch-20",
        description: "Convert Unix Epoch seconds/milliseconds to human readable date and vice versa.",
        tags: ["unix", "epoch", "timestamp", "datetime"]
    },

    // ==========================================
    // 5. UNIT & MEASUREMENT CONVERTERS (94-113)
    // ==========================================
    {
        id: "length-converter",
        title: "Length & Distance Converter",
        category: "converter",
        icon: "fa-solid fa-ruler-horizontal",
        description: "Convert meters, kilometers, miles, yards, feet, inches, centimeters, and millimeters.",
        tags: ["length", "distance", "meters", "miles", "feet"]
    },
    {
        id: "weight-converter",
        title: "Weight & Mass Converter",
        category: "converter",
        icon: "fa-solid fa-scale-balanced",
        description: "Convert kilograms, grams, pounds (lbs), ounces (oz), stones, and metric tons.",
        tags: ["weight", "mass", "kg", "pounds", "grams"]
    },
    {
        id: "temperature-converter",
        title: "Temperature Converter",
        category: "converter",
        icon: "fa-solid fa-temperature-half",
        description: "Instant conversion between Celsius (°C), Fahrenheit (°F), and Kelvin (K).",
        tags: ["temperature", "celsius", "fahrenheit", "kelvin"]
    },
    {
        id: "area-converter",
        title: "Area Measurement Converter",
        category: "converter",
        icon: "fa-solid fa-vector-square",
        description: "Convert square meters, square feet, acres, hectares, and square kilometers.",
        tags: ["area", "square feet", "acres", "hectares", "land"]
    },
    {
        id: "volume-converter",
        title: "Volume & Liquid Converter",
        category: "converter",
        icon: "fa-solid fa-flask",
        description: "Convert liters, milliliters, US gallons, quarts, pints, and fluid ounces.",
        tags: ["volume", "liquid", "liters", "gallons", "ounces"]
    },
    {
        id: "data-storage-converter",
        title: "Digital Data Storage Converter",
        category: "converter",
        icon: "fa-solid fa-hard-drive",
        description: "Convert Bits, Bytes, KB, MB, GB, TB, and Petabytes (binary & decimal).",
        tags: ["data", "gigabytes", "megabytes", "bytes", "storage"]
    },
    {
        id: "data-transfer-speed",
        title: "Data Transfer Speed Converter",
        category: "converter",
        icon: "fa-solid fa-wifi",
        description: "Convert internet speeds: Mbps, Kbps, Gbps, MB/s, and calculate download times.",
        tags: ["speed", "mbps", "download time", "internet"]
    },
    {
        id: "time-duration-converter",
        title: "Time Units Converter",
        category: "converter",
        icon: "fa-solid fa-hourglass-half",
        description: "Convert milliseconds, seconds, minutes, hours, days, weeks, and years.",
        tags: ["time", "hours", "minutes", "seconds", "duration"]
    },
    {
        id: "speed-converter",
        title: "Speed & Velocity Converter",
        category: "converter",
        icon: "fa-solid fa-gauge",
        description: "Convert km/h, mph, m/s, knots, and Mach speed.",
        tags: ["speed", "kmh", "mph", "knots", "velocity"]
    },
    {
        id: "pressure-converter",
        title: "Pressure Units Converter",
        category: "converter",
        icon: "fa-solid fa-compress",
        description: "Convert Pascal (Pa), Bar, PSI, Standard Atmosphere (atm), and Torr.",
        tags: ["pressure", "psi", "bar", "pascal", "atm"]
    },
    {
        id: "energy-converter",
        title: "Energy & Work Converter",
        category: "converter",
        icon: "fa-solid fa-bolt",
        description: "Convert Joules, Calories, Kilocalories (food cal), Kilowatt-hours (kWh), and BTU.",
        tags: ["energy", "calories", "joules", "kwh", "btu"]
    },
    {
        id: "power-converter",
        title: "Power Units Converter",
        category: "converter",
        icon: "fa-solid fa-plug",
        description: "Convert Watts, Kilowatts, Horsepower (hp), and Foot-pounds/second.",
        tags: ["power", "watts", "horsepower", "kw"]
    },
    {
        id: "angle-converter",
        title: "Angle Units Converter",
        category: "converter",
        icon: "fa-solid fa-circle-notch",
        description: "Convert Degrees, Radians, Gradians, and Arcminutes.",
        tags: ["angle", "degrees", "radians", "math"]
    },
    {
        id: "fuel-economy-converter",
        title: "Fuel Economy Converter",
        category: "converter",
        icon: "fa-solid fa-gas-pump",
        description: "Convert MPG (US), MPG (UK), Liters per 100km (L/100km), and km/L.",
        tags: ["fuel economy", "mpg", "l/100km", "mileage"]
    },
    {
        id: "shoe-size-converter",
        title: "Shoe Size International",
        category: "converter",
        icon: "fa-solid fa-shoe-prints",
        description: "Convert men's and women's shoe sizes between US, UK, EU, and CM.",
        tags: ["shoe size", "us to eu", "sizing", "footwear"]
    },
    {
        id: "roman-numeral-converter",
        title: "Roman Numeral Converter",
        category: "converter",
        icon: "fa-solid fa-monument",
        description: "Convert numbers to Roman Numerals (MMXXVI) and Roman numerals to numbers.",
        tags: ["roman numerals", "latin", "numbers", "history"]
    },
    {
        id: "number-to-words-calc",
        title: "Number to Words Speller",
        category: "converter",
        icon: "fa-solid fa-spell-check",
        description: "Convert numerical amounts into English written words and currency checks.",
        tags: ["number to words", "cheque", "spelling", "currency"]
    },
    {
        id: "cooking-converter",
        title: "Kitchen & Cooking Converter",
        category: "converter",
        icon: "fa-solid fa-kitchen-set",
        description: "Convert tablespoons, teaspoons, cups, grams, and ounces for recipe baking.",
        tags: ["cooking", "tablespoons", "cups", "baking", "recipe"]
    },
    {
        id: "torque-converter",
        title: "Torque Converter",
        category: "converter",
        icon: "fa-solid fa-gears",
        description: "Convert Newton-meters (N·m), Pound-feet (ft-lb), and Inch-pounds (in-lb).",
        tags: ["torque", "newton meter", "foot pound", "mechanics"]
    },
    {
        id: "density-converter",
        title: "Density Converter",
        category: "converter",
        icon: "fa-solid fa-cubes",
        description: "Convert kg/m³, g/cm³, lb/ft³, and lb/in³ densities.",
        tags: ["density", "kg/m3", "physics", "material"]
    },

    // ==========================================
    // 6. SECURITY, NETWORK & SEO (114-130)
    // ==========================================
    {
        id: "password-generator",
        title: "Strong Password Generator",
        category: "security",
        icon: "fa-solid fa-shield-halved",
        description: "Generate unbreakable secure passwords with customizable symbols, numbers, and entropy.",
        tags: ["password", "generator", "security", "strong password"]
    },
    {
        id: "password-strength-meter",
        title: "Password Strength Analyzer",
        category: "security",
        icon: "fa-solid fa-lock",
        description: "Analyze crack-time estimates, entropy score, and common vulnerability checks.",
        tags: ["password check", "strength", "entropy", "security audit"]
    },
    {
        id: "ip-info-lookup",
        title: "IP Address & Client Network Info",
        category: "security",
        icon: "fa-solid fa-network-wired",
        description: "Inspect your public IP, user location approximation, and network interfaces.",
        tags: ["ip address", "my ip", "network", "geolocation"]
    },
    {
        id: "whois-lookup-helper",
        title: "Domain WHOIS & DNS Helper",
        category: "security",
        icon: "fa-solid fa-earth-americas",
        description: "Quickly view registrar details, nameservers, and WHOIS lookup links for any domain.",
        tags: ["whois", "domain", "dns", "registrar"]
    },
    {
        id: "dns-lookup-sim",
        title: "DNS Records Explorer",
        category: "security",
        icon: "fa-solid fa-diagram-project",
        description: "Explore A, AAAA, MX, CNAME, TXT, and NS DNS records instructions and lookup tool.",
        tags: ["dns", "mx record", "cname", "txt record"]
    },
    {
        id: "website-ping-test",
        title: "Website Latency & Ping Test",
        category: "security",
        icon: "fa-solid fa-satellite-dish",
        description: "Test client-to-server HTTP response times and ping latency in milliseconds.",
        tags: ["ping", "latency", "response time", "network speed"]
    },
    {
        id: "utm-link-builder",
        title: "UTM Campaign URL Builder",
        category: "security",
        icon: "fa-solid fa-bullhorn",
        description: "Create Google Analytics UTM tracking links with source, medium, campaign, and term.",
        tags: ["utm", "marketing", "analytics", "campaign"]
    },
    {
        id: "privacy-policy-gen",
        title: "Privacy Policy Generator",
        category: "security",
        icon: "fa-solid fa-user-shield",
        description: "Generate standard compliant website privacy policy text ready to paste.",
        tags: ["privacy policy", "legal", "gdpr", "terms", "hostinger"]
    },
    {
        id: "terms-conditions-gen",
        title: "Terms & Conditions Generator",
        category: "security",
        icon: "fa-solid fa-file-contract",
        description: "Generate customized website Terms of Service agreement in markdown or text.",
        tags: ["terms and conditions", "tos", "legal", "agreement"]
    },
    {
        id: "disclaimer-generator",
        title: "Website Disclaimer Generator",
        category: "security",
        icon: "fa-solid fa-triangle-exclamation",
        description: "Create professional legal and affiliate disclaimers for blogs and e-commerce.",
        tags: ["disclaimer", "legal", "affiliate", "website"]
    },
    {
        id: "keyword-density-checker",
        title: "SEO Keyword Density Analyzer",
        category: "security",
        icon: "fa-solid fa-magnifying-glass-chart",
        description: "Analyze 1-word, 2-word, and 3-word phrase density to prevent SEO keyword stuffing.",
        tags: ["keyword density", "seo", "content", "ranking"]
    },
    {
        id: "ssl-checker-helper",
        title: "SSL Certificate Inspector",
        category: "security",
        icon: "fa-solid fa-certificate",
        description: "Check HTTPS status, certificate validation requirements, and security headers.",
        tags: ["ssl", "https", "certificate", "tls", "security"]
    },
    {
        id: "screen-resolution-checker",
        title: "Screen & Viewport Inspector",
        category: "security",
        icon: "fa-solid fa-display",
        description: "Detect live screen resolution, device pixel ratio (DPR), viewport, and color depth.",
        tags: ["screen resolution", "viewport", "dpr", "monitor"]
    },
    {
        id: "favicon-grabber",
        title: "Website Favicon Grabber",
        category: "security",
        icon: "fa-solid fa-image",
        description: "Fetch and download high-resolution favicon icons from any website domain.",
        tags: ["favicon grabber", "icon", "download favicon", "domain"]
    },
    {
        id: "browser-fingerprint-check",
        title: "Browser Fingerprint Inspector",
        category: "security",
        icon: "fa-solid fa-fingerprint",
        description: "View your unique Canvas, WebGL, and browser entropy fingerprint indicators.",
        tags: ["fingerprint", "privacy", "tracking", "canvas hash"]
    },
    {
        id: "serp-previewer",
        title: "Google SERP Search Preview",
        category: "security",
        icon: "fa-brands fa-google",
        description: "Preview how your title, meta description, and URL will look on Google Search.",
        tags: ["serp", "google preview", "seo snippet", "search"]
    },
    {
        id: "open-graph-previewer",
        title: "Social Share & OG Preview",
        category: "security",
        icon: "fa-solid fa-share-nodes",
        description: "Preview social preview cards for Facebook, Twitter, and LinkedIn shares.",
        tags: ["open graph", "social card", "twitter card", "preview"]
    },

    // ==========================================
    // 7. PRODUCTIVITY & DAILY LIFE (131-150)
    // ==========================================
    {
        id: "pomodoro-timer",
        title: "Pomodoro Focus Timer",
        category: "productivity",
        icon: "fa-solid fa-stopwatch",
        description: "Productivity timer with 25-minute focus, 5-minute break cycles, and audio alerts.",
        tags: ["pomodoro", "focus", "study", "productivity", "timer"]
    },
    {
        id: "stopwatch-lap-timer",
        title: "Precision Stopwatch & Laps",
        category: "productivity",
        icon: "fa-solid fa-clock-rotate-left",
        description: "Millisecond-accurate digital stopwatch with unlimited lap split tracking.",
        tags: ["stopwatch", "timer", "lap", "sports"]
    },
    {
        id: "countdown-event-timer",
        title: "Event Countdown Clock",
        category: "productivity",
        icon: "fa-solid fa-hourglass-end",
        description: "Create live countdown timers to New Year, birthdays, launches, or custom dates.",
        tags: ["countdown", "event", "deadline", "timer"]
    },
    {
        id: "world-clock-tool",
        title: "World Clock & Timezone Planner",
        category: "productivity",
        icon: "fa-solid fa-earth-asia",
        description: "View synchronized live clocks in New York, London, Dubai, Tokyo, and Karachi.",
        tags: ["world clock", "timezone", "utc", "gmt", "time"]
    },
    {
        id: "digital-signature-pad",
        title: "Digital Signature Pad",
        category: "productivity",
        icon: "fa-solid fa-signature",
        description: "Draw your signature with touch/mouse and download transparent PNG image.",
        tags: ["signature", "draw", "sign", "transparent png"]
    },
    {
        id: "barcode-generator",
        title: "Barcode Generator (Code 128)",
        category: "productivity",
        icon: "fa-solid fa-barcode",
        description: "Create standard Code 128 barcodes for products, SKU inventory, and labels.",
        tags: ["barcode", "code 128", "inventory", "upc"]
    },
    {
        id: "coin-flipper-3d",
        title: "3D Coin Flipper",
        category: "productivity",
        icon: "fa-solid fa-coins",
        description: "Flip a 3D animated coin for heads or tails with physics toss and audio.",
        tags: ["coin flip", "heads tails", "probability", "decision"]
    },
    {
        id: "dice-roller-3d",
        title: "Polyhedral Dice Roller",
        category: "productivity",
        icon: "fa-solid fa-dice",
        description: "Roll D4, D6, D8, D10, D12, and D20 dice with real random outcomes.",
        tags: ["dice", "roll dice", "d6", "d20", "board game"]
    },
    {
        id: "decision-wheel-maker",
        title: "Random Choice Decision Wheel",
        category: "productivity",
        icon: "fa-solid fa-dharmachakra",
        description: "Spin the colorful animated wheel to make fair random choices from your list.",
        tags: ["decision wheel", "spin wheel", "picker", "random"]
    },
    {
        id: "metronome-bpm",
        title: "Musician's Metronome",
        category: "productivity",
        icon: "fa-solid fa-drum",
        description: "Keep tempo with customizable BPM (40 - 240), beat signatures, and click audio.",
        tags: ["metronome", "bpm", "tempo", "music"]
    },
    {
        id: "tone-frequency-gen",
        title: "Audio Frequency Tone Gen",
        category: "productivity",
        icon: "fa-solid fa-wave-square",
        description: "Generate pure sine, square, sawtooth and triangle sound frequencies (20Hz-20kHz).",
        tags: ["tone generator", "hz", "frequency", "audio test", "sound"]
    },
    {
        id: "typing-speed-test",
        title: "Typing Speed Test (WPM)",
        category: "productivity",
        icon: "fa-solid fa-keyboard",
        description: "Test words per minute (WPM), accuracy percentage, and test results in 60s.",
        tags: ["typing speed", "wpm", "words per minute", "keyboard test"]
    },
    {
        id: "zodiac-horoscope-calc",
        title: "Zodiac Sign & Astrology Finder",
        category: "productivity",
        icon: "fa-solid fa-star-and-crescent",
        description: "Find your Western Zodiac sun sign, element, lucky stone, and birth dates.",
        tags: ["zodiac", "horoscope", "astrology", "birthday"]
    },
    {
        id: "local-scratchpad-notes",
        title: "Quick Scratchpad Notes",
        category: "productivity",
        icon: "fa-solid fa-note-sticky",
        description: "Instant note-taking scratchpad with auto-save to browser local storage.",
        tags: ["scratchpad", "notes", "notepad", "autosave"]
    },
    {
        id: "todo-task-board",
        title: "Smart To-Do & Task List",
        category: "productivity",
        icon: "fa-solid fa-check-double",
        description: "Manage daily tasks with priority tags, progress stats, and persistent storage.",
        tags: ["todo", "tasks", "checklist", "productivity"]
    },
    {
        id: "ambient-white-noise",
        title: "Relaxing Ambient Sound Mixer",
        category: "productivity",
        icon: "fa-solid fa-cloud-rain",
        description: "Synthesized relaxing white noise, pink noise, rain, and ocean soundscapes.",
        tags: ["white noise", "relax", "sleep", "sound machine", "rain"]
    },
    {
        id: "unit-price-comparison",
        title: "Unit Price & Grocery Comparison",
        category: "productivity",
        icon: "fa-solid fa-cart-shopping",
        description: "Compare prices of two products by gram/liter to find the real cheaper deal.",
        tags: ["unit price", "shopping deal", "grocery", "savings"]
    },
    {
        id: "habit-streak-tracker",
        title: "Daily Habit Streak Tracker",
        category: "productivity",
        icon: "fa-solid fa-fire",
        description: "Track daily habits and build uninterrupted consecutive day streaks.",
        tags: ["habit tracker", "streak", "goals", "daily routine"]
    },
    {
        id: "battery-device-info",
        title: "Device & Battery Monitor",
        category: "productivity",
        icon: "fa-solid fa-battery-half",
        description: "View real-time battery charge level, charging status, and device memory specs.",
        tags: ["battery", "device info", "hardware", "charging"]
    },
    {
        id: "on-screen-ruler",
        title: "On-Screen Virtual Ruler",
        category: "productivity",
        icon: "fa-solid fa-ruler-combined",
        description: "Measure on-screen elements accurately in pixels, inches, and millimeters.",
        tags: ["ruler", "measure", "pixels", "screen ruler"]
    }
];

if (typeof module !== 'undefined') {
    module.exports = { TOOL_CATEGORIES, TOOLS_DATABASE };
}
