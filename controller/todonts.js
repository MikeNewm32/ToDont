const express = require('express');
const router = express.Router();
const data = require('../data');

/* INDEX TODONTS */
router.get('/', function(req,res) {
  res.render('todonts/index', {
    todonts: data.seededTodonts
  });
});

/* NEW TODONT */
router.get('/new', (req, res) => {
  res.render('todonts/new');
})

/* SHOW TODONT */
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const todont = data.seededTodonts[id];
  res.render('todonts/show',{
    todont: todont,
    id: id
  });
});

/* EDIT TODONT */
router.get('/:id/edit', (req, res) => {
  const id = req.params.id;
  const todont = data.seededTodonts[id];
  res.render("todonts/edit", {
    todont: todont,
    id: id
  })
});

/* UPDATE TODONT */
router.put('/:id', (req, res) => {
  // We have the ID
  const id = req.params.id;
  // Use the id to grab specific index in array
  const todont = data.seededTodonts[id];
  // Update the description and urgent values
  todont.description = req.body.description;
  todont.urgent = req.body.urgent;
  // redirect back to individual todont
  res.method = "GET";
  res.redirect(`/todonts/${id}`);
});

/* SAVE TODONT */
router.post('/', (req, res) => {
  console.log(req.body);

  const newTodont = {
    description: req.body.description,
    urgent: req.body.urgent
  };
  data.seededTodonts.push(newTodont);

  res.redirect("/todonts");
});

/* DELETE TODONT */
router.delete('/:id', (req, res) => {
  data.seededTodonts.splice(req.params.id, 1);

  res.method= "GET";
  res.redirect("/todonts");
});


module.exports = router;