import { Server } from 'http';
import { createServer, shouldMinify } from './utils';
import request from 'supertest';

describe('POST /v1/render', () => {
  let server: Server;

  beforeAll(() => {
    server = createServer(true).listen(3000);
  });

  afterAll(() => {
    server.close();
  });

  it('responds with json', (done) => {
    request(server).post('/v1/render').expect('Content-Type', /json/).expect(400, done);
  });
});

describe('POST /v1/render (minify=true)', () => {
  let server: Server;

  beforeAll(() => {
    server = createServer(true).listen(3000);
  });

  afterAll(() => {
    server.close();
  });

  it('renders mjml', (done) => {
    request(server)
      .post('/v1/render')
      .send({
        mjml: '<mjml><mj-body><mj-section><mj-column><mj-text>Hello World!</mj-text></mj-column></mj-section></mj-body></mjml>'
      })
      .expect('Content-Type', /json/)
      .expect({
        html: '<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title></title><!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a { padding:0; }\n          body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }\n          table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }\n          img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }\n          p { display:block;margin:13px 0; }</style><!--[if mso]>\n        <noscript>\n        <xml>\n        <o:OfficeDocumentSettings>\n          <o:AllowPNG/>\n          <o:PixelsPerInch>96</o:PixelsPerInch>\n        </o:OfficeDocumentSettings>\n        </xml>\n        </noscript>\n        <![endif]--><!--[if lte mso 11]>\n        <style type="text/css">\n          .mj-outlook-group-fix { width:100% !important; }\n        </style>\n        <![endif]--><!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css"><style type="text/css">@import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);</style><!--<![endif]--><style type="text/css">@media only screen and (min-width:480px) {\n        .mj-column-per-100 { width:100% !important; max-width: 100%; }\n      }</style><style media="screen and (min-width:480px)">.moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }</style><style type="text/css"></style></head><body style="word-spacing:normal;"><div><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">Hello World!</div></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>'
      })
      .expect(200, done);
  });
});

describe('POST /v1/render (minify=false)', () => {
  let server: Server;

  beforeAll(() => {
    server = createServer(false).listen(3000);
  });

  afterAll(() => {
    server.close();
  });

  it('renders mjml', (done) => {
    request(server)
      .post('/v1/render')
      .send({
        mjml: '<mjml><mj-body><mj-section><mj-column><mj-text>Hello World!</mj-text></mj-column></mj-section></mj-body></mjml>'
      })
      .expect('Content-Type', /json/)
      .expect({
        html: '\n    <!doctype html>\n    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">\n      <head>\n        <title>\n          \n        </title>\n        <!--[if !mso]><!-->\n        <meta http-equiv="X-UA-Compatible" content="IE=edge">\n        <!--<![endif]-->\n        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\n        <meta name="viewport" content="width=device-width, initial-scale=1">\n        <style type="text/css">\n          #outlook a { padding:0; }\n          body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }\n          table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }\n          img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }\n          p { display:block;margin:13px 0; }\n        </style>\n        <!--[if mso]>\n        <noscript>\n        <xml>\n        <o:OfficeDocumentSettings>\n          <o:AllowPNG/>\n          <o:PixelsPerInch>96</o:PixelsPerInch>\n        </o:OfficeDocumentSettings>\n        </xml>\n        </noscript>\n        <![endif]-->\n        <!--[if lte mso 11]>\n        <style type="text/css">\n          .mj-outlook-group-fix { width:100% !important; }\n        </style>\n        <![endif]-->\n        \n      <!--[if !mso]><!-->\n        <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">\n        <style type="text/css">\n          @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);\n        </style>\n      <!--<![endif]-->\n\n    \n        \n    <style type="text/css">\n      @media only screen and (min-width:480px) {\n        .mj-column-per-100 { width:100% !important; max-width: 100%; }\n      }\n    </style>\n    <style media="screen and (min-width:480px)">\n      .moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }\n    </style>\n    \n  \n        <style type="text/css">\n        \n        \n        </style>\n        \n        \n      </head>\n      <body style="word-spacing:normal;">\n        \n        \n      <div\n         style=""\n      >\n        \n      \n      <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->\n    \n      \n      <div  style="margin:0px auto;max-width:600px;">\n        \n        <table\n           align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"\n        >\n          <tbody>\n            <tr>\n              <td\n                 style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;"\n              >\n                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->\n            \n      <div\n         class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"\n      >\n        \n      <table\n         border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"\n      >\n        <tbody>\n          \n              <tr>\n                <td\n                   align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"\n                >\n                  \n      <div\n         style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;"\n      >Hello World!</div>\n    \n                </td>\n              </tr>\n            \n        </tbody>\n      </table>\n    \n      </div>\n    \n          <!--[if mso | IE]></td></tr></table><![endif]-->\n              </td>\n            </tr>\n          </tbody>\n        </table>\n        \n      </div>\n    \n      \n      <!--[if mso | IE]></td></tr></table><![endif]-->\n    \n    \n      </div>\n    \n      </body>\n    </html>\n  '
      })
      .expect(200, done);
  });
});

describe('config', () => {
  it('not minify (default)', () => {
    expect(shouldMinify()).toEqual(false);
  });

  it('minify with MINIFY=1', () => {
    process.env.MINIFY = '1';
    expect(shouldMinify()).toEqual(true);
  });

  it('not minify with anything else', () => {
    process.env.MINIFY = 'enabled';
    expect(shouldMinify()).toEqual(false);
  });
});
