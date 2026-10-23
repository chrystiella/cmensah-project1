/*
CS 146 - Assignment 2 CSS Grader

How to use:
1. Place this file in the same directory as your HTML file (ex: index.html).
2. Add/Replace the following line to/at the bottom of the HTML file, just before the closing </body> tag:
    
        <script src="css-grader.js"></script>

3. Open your page using Live Server.
4. Open your browser's developer tools (Usually right-click -> Inspect or F12)
5. Refresh the page and check the console tab to see your grading results!

Important Notes about HTML, Browsers, and Live Server:
- This grader checks the linked external stylesheet and the rendered page (DOM).
- If you see errors about stylesheet access, make sure:
    * You are using Live Server (http://, not file://)
    * Your CSS file is properly linked in the <head> of your HTML
    * Your CSS file is in the same directory as your HTML file
- Some items (such as the commented specificity example and overall visual clarity) will be verified manually.
*/

async function gradeCSS() {

    console.log("CSS Grader loaded successfully. :)");
    console.log("");
    console.log("-----Grading Criteria-----");

    let earned = 0;

    const allSheets = document.styleSheets;
    let rules = [];

    try {
        rules = allSheets[0].cssRules;
    } catch (e) {
        console.warn("Unable to access stylesheet rules :( - ", e);
        console.warn("Hint: Make sure you are running with Live Server (http://) and the stylesheet is properly linked.");
        return;
    }

    let cssText = "";
    for (let rule of rules) {
        cssText += rule.cssText + "\n";
    }

    console.log("1.");
    if (allSheets.length > 0) {
        earned += 5;
        console.log("\ta. External stylesheet linked: [5/5]");
    } else {
        console.warn("\ta. No external stylesheet linked: [0/5] !!!");
    }

    console.log("2.");
    if (cssText.includes("font-family") && cssText.includes("font-size")) {
        earned += 5;
        console.log("\ta. Base font-family and font-size set: [5/5]");
    } else {
        console.warn("\ta. Base font-family and font-size not set: [0/5] !!!");
    }

    if (cssText.includes("background-color") && cssText.includes("color")) {
        earned += 5;
        console.log("\tb. Background color and text color set: [5/5]");
    } else {
        console.warn("\tb. Background color and text color not set: [0/5] !!!");
    }

    let matches = cssText.match(/\b(h1|h2|p)/g);
    if (matches && matches.length > 2) {
        earned += 5;
        console.log("\tc. Heading and paragraph styling applied: [5/5]");
    } else {
        console.warn("\tc. Heading and paragraph styling not applied: [0/5] !!!");
    }

    matches = cssText.match(/\b(ul|ol|li)/g);
    if (matches && matches.length >= 2) {
        earned += 5;
        console.log("\td. List styling applied: [5/5]");
    } else {
        console.warn("\td. List styling not applied: [0/5] !!!", matches);
    }

    if (cssText.includes("img") || cssText.includes("image")) {
        earned += 5;
        console.log("\te. Image styling applied: [5/5]");
    } else {
        console.warn("\te. Image styling not applied: [0/5] !!!");
    }

    console.log("3.");
    matches = cssText.match(/\b(h1|h2|p|ul|ol|li|img)\b/g);
    if (matches && matches.length >= 3) {
        earned += 10;
        console.log("\ta. At least 3 element selectors used: [10/10]");
    } else {
        console.warn("\ta. At least 3 element selectors not used: [0/10] !!!");
    }

    matches = cssText.match(/(?<![\w-])\.[a-zA-Z][\w-]*/g);
    if (matches && matches.length >= 1) {
        earned += 5;
        console.log("\tb. At least 1 class selector used: [5/5]");
    } else {
        console.warn("\tb. At least 1 class selector not used: [0/5] !!!");
    }

    const classCounts = new Map();
    const elementsWithClass = document.querySelectorAll("[class]");
    for (const el of elementsWithClass) {
        const classAttr = el.getAttribute("class") || "";
        const classList = classAttr.split(/\s+/).map(s => s.trim()).filter(Boolean);
        for (const c of classList) {
            classCounts.set(c, (classCounts.get(c) || 0) + 1);
        }
    }

    let reusedClass = "";
    for (const [c, count] of classCounts.entries()) {
        if (count >= 2) {
            reusedClass = c;
            break;
        }
    }

    if (reusedClass) {
        earned += 5;
        console.log(`\tc. Class reused on multiple elements (ex: .${reusedClass}): [5/5]`);
    } else {
        console.warn("\tc. Class not reused on at least 2 multiple elements (in HTML): [0/5] !!!");
    }

    matches = cssText.match(/#[a-zA-Z][\w-]*/g);
    if (matches && matches.length >= 1) {
        earned += 5;
        console.log("\td. At least 1 ID selector used: [5/5]");
    } else {
        console.warn("\td. At least 1 ID selector not used: [0/5] !!!");
    }

    matches = cssText.match(/\[[a-zA-Z][\w-]*[^\]]*\]/g);
    if (matches && matches.length >= 1) {
        earned += 5;
        console.log("\te. At least 1 attribute selector used: [5/5]");
    } else {
        console.warn("\te. At least 1 attribute selector not used: [0/5] !!!");
    }

    matches = cssText.match(/:hover|:link|:active|:visited/g);
    if (matches && matches.includes(":hover") && matches.length >= 2) {
        earned += 5;
        console.log("\tf. Pseudo-class selectors used (:hover and one of :link, :active, :visited): [5/5]");
    } else {
        console.warn("\tf. Pseudo-class selectors not used (:hover and one of :link, :active, :visited): [0/5] !!!");
    }

    const selectorsOnly = cssText.replace(/\{[\s\S]*?\}/g, '|');
    const flatSelectors = selectorsOnly.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ');
    matches = flatSelectors.match(/[>+~]|[\w.#\]:]\s+[\w.#[:]/g);
    if (matches && matches.length >= 1) {
        earned += 5;
        console.log("\tg. Contextual selector used (ex: #bio ul li): [5/5]", matches);
    } else {
        console.warn("\tg. Contextual selector not used (ex: #bio ul li): [0/5] !!!");
    }

    console.log("4.");
    let marginMatches = cssText.match(/margin/g);
    let paddingMatches = cssText.match(/padding/g);
    if (marginMatches && paddingMatches && (marginMatches.length + paddingMatches.length) >= 6) {
        earned += 5;
        console.log("\ta. At least 3 different elements have margins/padding applied: [5/5]", marginMatches.length, "margin rules and", paddingMatches.length, "padding rules found");
    } else {
        console.warn("\ta. Less than 3 different elements have margins/padding applied: [0/5] !!!");
    }

    if (cssText.includes("border")) {
        earned += 5;
        console.log("\tb. Border styling applied to visually separate at least one section or major component: [5/5]");
    } else {
        console.warn("\tb. Border styling not applied to visually separate at least one section or major component: [0/5] !!!");
    }

    if (cssText.includes("width:") || cssText.includes("max-width:")) {
        earned += 5;
        console.log("\tc. Width or max-width applied to at least one section/container element to improve layout: [5/5]");
    } else {
        console.warn("\tc. Width or max-width not applied to at least one section/container element to improve layout: [0/5] !!!");
    }

    if (cssText.includes("box-sizing: border-box")) {
        earned += 5;
        console.log("\td. Box-sizing used correctly to layout elements: [5/5]");
    } else {
        console.warn("\td. Box-sizing not used correctly to layout elements: [0/5] !!!");
    }

    console.log("5.");
    console.log("\ta. CSS comment included that describes the overall design and styling choices: [10/10] (check manually)");
    earned += 10;

    console.log("CSS Score: ", earned);
    console.log("Canvas Score: " + (earned / 20) + "/5");
}

gradeCSS();
