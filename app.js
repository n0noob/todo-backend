const bodyParser = require('body-parser');
      express = require('express');
      morgan = require('morgan');
      config = require('./config');
      cors = require('cors');

require('./config/db');

let app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('common'));

app.use(require('./routes'));

app.listen(config.PORT, () => {
  console.log(`App started listening at http://localhost:${config.PORT}`);
});

