let express = require('express');
let app = express();
let port = 3000;
app.use(express.static('./dist')); //  "public" off of current is root

app.listen(port, () => {console.log(`server is running on http://localhost:${port}`)})