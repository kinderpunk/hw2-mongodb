import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function initMongoConnection() {
  const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } = process.env;

  console.log('MongoDB User:', MONGODB_USER);
  console.log('MongoDB Password:', MONGODB_PASSWORD);
  console.log('MongoDB URL:', MONGODB_URL);
  console.log('MongoDB DB:', MONGODB_DB);

  const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

  console.log('MongoDB URI:', uri);  // Перевірте формат URI

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Mongo connection error:', error);
    process.exit(1);
  }
}
