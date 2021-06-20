import express from 'express';
import mjml from 'mjml';
import { minify as htmlMinify } from 'html-minifier';
import morgan from 'morgan';

export const createServer = (minify = true): express.Application => {
  const app: express.Application = express();
  app.use(express.json(), morgan('combined'));

  app.post('/v1/render', (req, res) => {
    res.type('json');
    try {
      const input = req.body.mjml;
      const output = mjml(input, {});
      let hmtlOutput = output.html;

      if (minify) {
        hmtlOutput = htmlMinify(output.html, {
          collapseWhitespace: true,
          minifyCSS: false,
          caseSensitive: true,
          removeEmptyAttributes: true
        });
      }

      res.json({ html: hmtlOutput, errors: output.errors });
    } catch (error) {
      res.status(400);
      res.json({ message: 'there was an error rendering the mjml.' });
    }
  });

  return app;
};

export const shouldMinify = (): boolean => {
  let shouldMinify = false;

  if (process.env.MINIFY === '1') {
    shouldMinify = true;
  }
  return shouldMinify;
};
