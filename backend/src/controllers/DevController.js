const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const mountDevData = require('../utils/mountDevData');

module.exports = {

    async index(request, response){
        const devs = await Dev.find();
        return response.json(devs);
    },

    async store(request, response) {
    
        const {github_username} = request.body;

        let dev = await Dev.findOne({github_username});
        
        //se dev não existir criar um novo
        if(!dev){
            let devData = await mountDevData(request.body);
            
            dev = await Dev.create({
                github_username: devData.github_username,
                name: devData.name,
                avatar_url: devData.avatar_url,
                bio: devData.bio,
                techs: devData.techs,
                location: devData.location
            })
        }
    
        return response.json(dev);
    },

    async store2(request, response) {
        const {github_username, techs, latitude, longitude} = request.body;
    
        let dev = await Dev.findOne({github_username});

        //se dev não existir criar um novo
        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        
            const {name = login, avatar_url, bio} = apiResponse.data;
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })
        }
    
        return response.json(dev);
    },

    async update(request, response) {
        const {techs, latitude, longitude} = request.body;
    
        let dev = await Dev.findById(request.params.id);

        //se dev existir, ele é atualizado
        if(dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${dev.github_username}`);
           
            const {name = login, avatar_url, bio} = apiResponse.data;
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };
        
            dev = await dev.update({
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })
        }
    
        return response.json(dev);
    },

    async destroy(request, response){
        const dev = await Dev.findOneAndRemove(request.params.id)
        return response.json(dev);
    },
};