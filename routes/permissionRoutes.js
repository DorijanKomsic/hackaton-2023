const { addPermission } = require('../services/PermissionService');
const { removePermissions } = require('../services/PermissionService');
const { listPeopleWithPermissions } = require('../services/PermissionService');

const router = require('express').Router();

router.post('/add-permission', addPermission);
router.delete('/remove-permission', removePermissions);
router.get('/get-permissions', listPeopleWithPermissions);

module.exports = router;