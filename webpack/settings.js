import {join, dirname} from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PATH_SRC = join(__dirname, "../src");
const PATH_BUILD = join(__dirname, "../build");
const PATH_DIST = join(__dirname, "../dist");
const PATH_ASSETS = join(__dirname, "../assets");
const PATH_SRC_INDEX = join(PATH_SRC, "./react/index.jsx");
const PATH_NODE_MODULES = join(__dirname, "../node_modules");
const PATH_POST_CSS_CONFIG = join(__dirname, "../postcss.config.cjs")
const PATH_INDEX_HTML = join(__dirname, "../assets/index.html")
const HOST = "localhost";
const PORT = 2000;

export {
  PATH_SRC,
  PATH_BUILD,
  PATH_DIST,
  PATH_ASSETS,
  PATH_SRC_INDEX,
  PATH_NODE_MODULES,
  HOST,
  PORT,
  PATH_POST_CSS_CONFIG,
  PATH_INDEX_HTML
};