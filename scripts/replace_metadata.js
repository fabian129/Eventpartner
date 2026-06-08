const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    for (const [search, replace] of replacements) {
        if (content.includes(search)) {
            content = content.replace(new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replace);
            changed = true;
        }
    }
    if (changed) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${filePath}`);
    }
}

const files = [
    {
        path: 'src/app/[locale]/about/page.tsx',
        replacements: [
            ["Europe's largest", "the world's largest"],
            ["across 36 countries", "across 175 countries"]
        ]
    },
    {
        path: 'src/app/[locale]/careers/CareersContent.tsx',
        replacements: [
            ["anywhere in Europe", "anywhere in the world"],
            ["in Europe.", "globally."]
        ]
    },
    {
        path: 'src/app/[locale]/careers/page.tsx',
        replacements: [
            ["across Europe.", "around the globe."]
        ]
    },
    {
        path: 'src/app/[locale]/faq/FaqPageContent.tsx',
        replacements: [
            ["across 36 European countries", "across 175 countries"],
            ["anywhere in Europe.", "anywhere around the globe."]
        ]
    },
    {
        path: 'src/app/[locale]/faq/page.tsx',
        replacements: [
            ["across 36 European countries.", "across 175 countries globally."]
        ]
    },
    {
        path: 'src/app/[locale]/layout.tsx',
        replacements: [
            ["across 36 European countries.", "across 175 countries globally."],
            ['"Europe"', '"Global"']
        ]
    },
    {
        path: 'src/app/[locale]/leadership/page.tsx',
        replacements: [
            ["Europe's largest", "the world's largest"],
            ["across 36 countries", "across 175 countries"]
        ]
    },
    {
        path: 'src/app/[locale]/security/page.tsx',
        replacements: [
            ["36 European markets", "175 global markets"]
        ]
    },
    {
        path: 'src/app/[locale]/vip/page.tsx',
        replacements: [
            ["36 European countries", "175 countries"]
        ]
    }
];

files.forEach(f => {
    replaceInFile(path.join(process.cwd(), f.path), f.replacements);
});
