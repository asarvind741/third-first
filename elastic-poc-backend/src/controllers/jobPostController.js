import JobPost from '../models/job-post';

JobPost.createMapping((err, mapping) => {
    if (err) {
        console.log('error creating mapping (you can safely ignore this)');
        console.log(err);
    } else {
        console.log('mapping created!');
        console.log(mapping);
        callSync();
    }
});

function callSync() {
    let stream = JobPost.synchronize();
    let count = 0;

    stream.on('data', function (err, doc) {
        if (err) throw err;
        count++;
    });
    stream.on('close', function () {
        console.log('indexed ' + count + ' documents!');
    });
    stream.on('error', function (err) {
        console.log(err);
    });
}

async function createJobPost(req, res) {
    const jobPost = await new JobPost(req.body).save();
    JobPost.on('es-indexed', (err, response) => {
        if (err) throw err;
        console.log(response);
    });

    if (!!jobPost) {
        res.json({
            status: 200,
            data: jobPost
        })

    } else {
        res.json({
            status: 401,
            message: 'Job post failed'
        })
    }

}

module.exports = {
    createJobPost
}