import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});

app.listen(port, (err?: Error) => {
  if (err) {
    console.error('Error occurred:', err);
    return;
  }
  console.log(`Server is listening on port ${port}`);
});
