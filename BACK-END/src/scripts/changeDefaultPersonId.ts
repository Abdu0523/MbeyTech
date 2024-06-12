import mongoose from 'mongoose';
import ProductModel from '../data/models/Product.entity'; // Assurez-vous que le chemin est correct vers votre modèle

async function changeDefaultPersonId() {
  // Connectez-vous à votre base de données MongoDB
  await mongoose.connect('mongodb+srv://smbn:l6TgSQLW4KMbEIFV@cluster0.ymy9hl5.mongodb.net/db-mbey', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  });

  try {
    const oldPersonId = "60d0fe4f5311236168a109ca"; // L'ancien ID par défaut de votre collection `Personne`
    const newPersonId = "666334a3feeba35de22a64b2"; // Le nouvel ID par défaut de votre collection `Personne`

    // Mettez à jour tous les documents qui ont l'ancien ID par défaut
    await ProductModel.updateMany(
      { person: oldPersonId },
      { $set: { 'person.$': newPersonId } } // Utilisation de l'opérateur $ pour mettre à jour le tableau
    );

    console.log("Mise à jour du personId réussie !");
  } catch (error) {
    console.error("Erreur lors de la mise à jour du personId :", error);
  } finally {
    // Déconnectez-vous de la base de données
    await mongoose.disconnect();
  }
}

changeDefaultPersonId();
