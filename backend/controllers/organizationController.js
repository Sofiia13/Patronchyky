const orgModel = require('../models/organizationModel');

const getOrganizationInfo = async (req, res) => {
    try {
        const orgId = req.params.id;
        const organization = await orgModel.findById(orgId).select('_id name description');
        return res.status(200).json(organization);
    } catch (error) {
        return res.status(500).json({ Error: error });
    }
};


module.exports = {
    getOrganizationInfo
};
