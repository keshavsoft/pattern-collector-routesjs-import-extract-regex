import getAllMatches from "pattern-collector-routesjs-import";

// const parseRegex = /import\s*\{[^}]*router\s+as\s+(\w+)[^}]*\}\s*from\s*['"]\.\/([^/]+)\/routes\.js['"];/;
// take care here this regex will only filter relative imports not npm 

const parseRegex = /import\s*\{[^}]*router\s+as\s+(\w+)[^}]*\}\s*from\s*['"]\.\/([^/]+)\/.*['"]/;
const showLog = false;

const startFunc = ({ fileContent, inShowLog, showLogStep1 }) => {

    const matches = getAllMatches({
        fileContent,
        showLog: showLogStep1
    });

    if (inShowLog) console.log("matches : ", matches);
    if (showLog) console.log("matches : ", matches);

    return matches.map(match => {
        const clean = match.line.replace(/[\r\n]/g, '');

        const parts = clean.match(parseRegex);

        if (parts) {
            return {
                variable: parts[1],
                folderName: parts[2],
                line: match.line,
                lineNumber: match.lineNumber
            };
        };

        return null;

    }).filter(Boolean);
};

export default startFunc;