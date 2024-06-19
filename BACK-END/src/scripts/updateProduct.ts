import mongoose from 'mongoose';
import ProductModel from '../data/models/Product.entity'; // Assurez-vous que le chemin est correct vers votre modèle

async function updateProducts() {
  // Connectez-vous à votre base de données MongoDB
  await mongoose.connect('mongodb+srv://smbn:l6TgSQLW4KMbEIFV@cluster0.ymy9hl5.mongodb.net/db-mbey', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  });

  try {
    // Mettez à jour tous les documents pour ajouter le champ `person` s'il n'existe pas
    const defaultPersonId = "60d0fe4f5311236168a109ca"; // Remplacez par un ObjectId par défaut de votre collection `Personne`
    
    await ProductModel.updateMany(
      { person: { $exists: false } }, // Condition pour les documents n'ayant pas le champ `person`
      { $set: { person: [defaultPersonId] } } // Ajoutez le champ `person` avec une valeur par défaut
    );

    console.log("Mise à jour des produits réussie !");
  } catch (error) {
    console.error("Erreur lors de la mise à jour des produits :", error);
  } finally {
    // Déconnectez-vous de la base de données
    await mongoose.disconnect();
  }
}

updateProducts();
