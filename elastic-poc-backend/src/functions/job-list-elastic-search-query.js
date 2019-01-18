import client from './elastic-connection';



// let searchJobPosts = () => {
    client.search({
        index: 'jobposts',
        type: 'jobpost',
        body: {
            query: {
                match_phrase_prefix: {
                    jobType: 'Full-Time'
                }
            }
        }
    }, function (err, response, status) {

        if (err) {
            console.log('Error occured', err);
        }
        else {
            console.log(response)
            return response.hits.hits
        }
    })
// }


// module.exports = {
//     searchJobPosts
// }