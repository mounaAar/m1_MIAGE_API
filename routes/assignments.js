const Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET)
function getAssignments(req, res) {
    Assignment.find((err, assignments) => {
        if (err) {
            res.send(err)
        }

        res.send(assignments);
    });
}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res) {
    let assignmentId = req.params.id;

    Assignment.findOne({ id: assignmentId }, (err, assignment) => {
        if (err) { res.send(err) }
        res.json(assignment);
    })
}

// Ajout d'un assignment (POST)
function postAssignment(req, res) {
    let assignment = new Assignment({
        id: req.body.id,
        nom: req.body.nom,
        dateDeRendu: req.body.dateDeRendu,
        rendu: req.body.rendu
    });

    try {
        console.log("POST assignment reçu :");
        console.log(assignment)
        assignment.save();
        res.json({ message: `${assignment.nom} saved!` })
    } catch (error) {
        res.send(error);
    }
}

// Update d'un assignment (PUT)
async function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);

    const { id, nom, dateDeRendu, rendu } = req.body;

    const assignment = await Assignment.findOne({ id });

    if (!assignment) {
        return res.status(404).json({ message: 'Assignment not found' });
    }

    if (nom) assignment.nom = nom;

    if (dateDeRendu) assignment.dateDeRendu = dateDeRendu;

    if (rendu) assignment.rendu = rendu;

    try {
        assignment.save();
        res.json({ message: 'Assignment updated' });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// suppression d'un assignment (DELETE)

// Suppression d'un assignment (DELETE)
async function deleteAssignment(req, res) {
    const id = req.params.id;
    console.log(`Received DELETE request for ID: ${id}`); // Ajoutez ce log

    try {
        const assignment = await Assignment.findByIdAndRemove(id);
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }
        console.log('Deleted assignment:', assignment); // Ajoutez ce log
        res.json({ message: 'Assignment deleted', assignment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };