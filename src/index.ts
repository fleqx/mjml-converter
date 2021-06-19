import { createServer, shouldMinify } from './utils';

const app = createServer(shouldMinify());

app.listen(3000);
