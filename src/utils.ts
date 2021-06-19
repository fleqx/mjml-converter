import bodyParser from "body-parser";
import express from "express";
import mjml from "mjml";
import { minify as htmlMinify } from 'html-minifier';

export async function createServer(minify=true): Promise<express.Application> {
    const app: express.Application = express();
    app.use(bodyParser.json())

    app.post("/v1/render", (req, res) => {
        res.type('json')
        try {
            const input = req.body.mjml;
            let output = mjml(input, {}).html;

            if(minify) {
                output = htmlMinify(output, {
                    collapseWhitespace: true,
                    minifyCSS: false,
                    caseSensitive: true,
                    removeEmptyAttributes: true
                  })
            }

            res.json({html: output});
        } catch (error) {
            res.status(400)
            res.json({message: "there was an error rendering the mjml."})
        }
    });
    
    return app;
}
