import { createServer } from "./utils";

const app = createServer(true);

app.then((app) => app.listen(3000))