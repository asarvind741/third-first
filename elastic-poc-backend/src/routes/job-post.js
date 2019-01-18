import jobpostController from '../controllers/jobPostController';

module.exports = app => {
    let job = '/job-posts/';
    app.post(`${job}create`, jobpostController.createJobPost);
}