var pigeon = require('../models/pigeon');

// List of all pigeons
exports.pigeon_list = function(req, res) {
    res.send('NOT IMPLEMENTED: pigeon list');
};
// for a specific pigeon.
exports.pigeon_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: pigeon detail: ' + req.params.id);
};
// Handle pigeon create on POST.
exports.pigeon_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: pigeon create POST');
};
// Handle pigeon delete from on DELETE.
exports.pigeon_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: pigeon delete DELETE ' + req.params.id);
};
// Handle pigeon update form on PUT.
exports.pigeon_update_put = function(req, res) {
    res.send('NOT IMPLEMENTED: pigeon update PUT' + req.params.id);
};