var express = require('express');
const router = express.Router();

router.get('/videocanvas', (req,res) => {
    res.sendFile('/home/dawe/node_js/public/videocanvas/videocanvas.html');
});

module.exports = router;