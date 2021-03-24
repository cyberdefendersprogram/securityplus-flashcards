const unified = require('unified');
const markdown = require('remark-parse');
const report = require('vfile-reporter');
const stringify = require('remark-stringify');
const gfm = require('remark-gfm');
const highlight = require('rehype-highlight.js');
const frontmatter = require('remark-frontmatter');

var processor = unified()
  .use(markdown)
  .use(gfm)
  .use(remark2rehype)
  .use(highlight)
  .use(stringify)
  .use(rehype2react, { createElement: React.createElement });
const format = require('rehype-format');
const remark2rehype = require('remark-rehype');
/**
 * * Read md snippet and return sanitized html
 */
module.exports = (md) => {
  unified()
    .use(markdown) // parses markdown file to mdast syntax tree (markdown -> mdast tree)
    .use(frontmatter) // plugin to support frontmatter (YAML, TOML)
    .use(gfm) // transformer that adds github markdown syntax (gfm transformer)
    .use(highlight) // plugin to highlight code blocks with highlight.js (via lowlight).
    .use(stringify) // compiles ast back to md (mdast tree -> markdown)
    .process(md, function (err, file) {
      console.error(report(err || file));
    });
};
