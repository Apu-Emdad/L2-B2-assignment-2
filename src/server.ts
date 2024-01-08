import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

const main = async () => {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`app is listening on port http://localhost:${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

main();
