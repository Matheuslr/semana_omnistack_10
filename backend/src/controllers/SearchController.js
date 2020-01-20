const Dev = require('../models/Dev');
const parseStringAsArray = require('../controllers/utils/parseStringAsArray');

module.exports = { 
    async index(req, res){

        // search all devs in 10 km
        // search dev by techs

        const { latitude, longitude, techs } = req.query;
        const techsArray = parseStringAsArray(techs);
        let devs = ''
        if(!techs){
            devs = await Dev.find()
        } else{
            devs = await Dev.find({
                techs : {
                    $in: techsArray
                },
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [ longitude, latitude ],
                        },
                        $maxDistance: 10000,
                    },
                },
            });
        }

        return res.json({ devs });
    }
}