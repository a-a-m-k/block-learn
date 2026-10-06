// Next.js only ships types for `*.module.css`, so plain stylesheet imports have
// no declaration. TypeScript 6 checks side-effect imports by default (TS2882).
declare module "*.css";
