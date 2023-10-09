const express = require("express");
const router = express.Router();
const {getContacts, getContact, createContact, updateContact, deleteContact} = require("../controllers/contactController")


// router.route('/').get((req,res)=>{
//     res.status(200).json({msg:"get all contacts"})
// });

const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);
router.route('/').get(getContacts).post(createContact);

router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

// router.route('/').post(createContact);

// router.route('/:id').put(updateContact);

// router.route('/:id').delete(deleteContact);

module.exports = router;