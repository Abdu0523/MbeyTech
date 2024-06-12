import mongoose from 'mongoose';
import OrderModel from './../data/models/Order.entity';
import OrderDetailModel from './../data/models/OrderDetail.entity';
import ProductModel from './../data/models/Product.entity';

// Connexion à la base de données
const MONGO_URI = 'mongodb+srv://smbn:l6TgSQLW4KMbEIFV@cluster0.ymy9hl5.mongodb.net/db-mbey';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

// Fonction pour insérer une commande
const insertOrder = async () => {
  try {
    const productId = new mongoose.Types.ObjectId('663fd2d16f60db13a7db87d3');
    const personId = new mongoose.Types.ObjectId('664b70bc53db693feeacbdab');

    // Créer une nouvelle commande
    const newOrder = await OrderModel.create({
      person: personId,
      validated: false,
      status: 'en cours',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Créer les détails de la commande
    const orderDetails = await OrderDetailModel.create({
      order: newOrder._id,
      product: productId,
      quantity: 2,
      unitPrice: 100,
      status: 'en cours',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log('Order and OrderDetails created successfully');
    console.log('Order:', newOrder);
    console.log('OrderDetails:', orderDetails);
  } catch (error) {
    console.error('Error creating order and order details:', error);
  } finally {
    mongoose.connection.close();
  }
};

insertOrder();
