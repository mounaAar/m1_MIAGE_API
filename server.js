let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let assignment = require('./routes/assignments');
let cors = require('cors');

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('debug', true);

// Remplacer par votre propre URI de connexion MongoDB
const uri = "mongodb+srv://mounaaarour:am@assignments.b8skd.mongodb.net/assignmentsDB";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

// Connexion à MongoDB
console.log("Démarrage de la connexion à MongoDB...");

try {
  mongoose.connect(uri, options);
  console.log("Connecté à la base MongoDB assignments dans le cloud !");
  console.log("URI de connexion = " + uri);
  console.log("Vérifiez avec http://localhost:8010/api/assignments que cela fonctionne");
} catch (e) {
  console.log("Erreur de connexion: ", e);
}

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Pour les formulaires
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

// Route pour la racine
app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API de gestion des devoirs');
});

// Les routes pour les assignments
const prefix = '/api';

app.route(prefix + '/assignments')
  .get(assignment.getAssignments);

app.route(prefix + '/assignments/:id')
  .get(assignment.getAssignment)
  .delete(assignment.deleteAssignment)
  .put(assignment.updateAssignment); 


app.route(prefix + '/assignments')
  .post(assignment.postAssignment)
  .get(assignment.getAssignments);
  
// On démarre le serveur
app.listen(port, "0.0.0.0", () => {
  console.log('Serveur démarré sur http://localhost:' + port);
});

module.exports = app;
