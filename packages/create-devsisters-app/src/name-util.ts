export const validateKebab = (text: string) => /^([a-z0-9]+-?)+$/.test(text);
export const kebab2pascal = (text: string) => text.replace(/([^-]+)(?:-|$)/g, (_, $0: string) => $0[0].toUpperCase() + $0.substr(1));
export const kebab2camel = (text: string) => { const pascal = kebab2pascal(text); return pascal[0].toLowerCase() + pascal.substr(1); };
