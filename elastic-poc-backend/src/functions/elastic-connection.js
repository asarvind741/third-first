import elasticsearch from 'elasticsearch';

var client = new elasticsearch.Client({
    host: 'http://localhost:9200/',
    // host: 'http://arvind:arvind@18.207.249.33:9200',
    requestTimeout: Infinity, // Tested
    keepAlive: true
})

module.exports = client;