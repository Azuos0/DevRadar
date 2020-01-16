const axios = require('axios');
const parseStringAsArray = require('./parseStringAsArray');

module.exports = async function montarDevData(data, github_username = null){
    if(!github_username){
        github_username = data.github_username;        
    }

    const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        
    const {name = login, avatar_url, bio} = apiResponse.data;
        
    const techsArray = parseStringAsArray(data.techs);
        
    const location = {
        type: 'Point',
        coordinates: [data.longitude, data.latitude]
    };

    const dev = {
        github_username: github_username,
        name: name,
        avatar_url: avatar_url,
        techs: techsArray,
        bio: bio,
        location: location
    }
    
    return dev;
}