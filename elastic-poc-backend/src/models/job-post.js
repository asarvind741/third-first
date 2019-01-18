import mongoose from  'mongoose';
import mongoosastic from 'mongoosastic';

import client from '../functions/elastic-connection';

const Schema = mongoose.Schema;

const jobPost = new Schema({
    title: {
        type: String,
        es_type: 'text',
        required: true
    },
    description: {
        type: String,
        es_type: 'text',
        required: true
    },
    responsblities: {
        type: String,
        es_type: 'text',
        required: true
    },
    minSalary: {
        type: Number,
        required: true,
        trim: true
    },
    maxSalary: {
        type: Number,
        required: true,
        trim: true
    },
    jobType: {
        type: String,
        es_type: 'text',
        enum: ['Contract', 'Full-Time', 'Part-Time']
    },
    companyName: {
        type: String,
        es_type: 'text',
        required: true
    },
    preferredLocation: [{
        type: String,
        es_type: 'text'
    }]
}, {
    timestamps: true
})

jobPost.plugin(mongoosastic, {
    esClient: client
});

export default mongoose.model('JobPost', jobPost)