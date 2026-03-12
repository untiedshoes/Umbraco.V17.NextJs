module.exports = {
    // --------------------------
    // Standard Umbraco Delivery API
    // --------------------------
    'umbraco-delivery': {
        output: {
            mode: 'tags-split',                   // split clients by tags in Swagger
            target: './src/lib/api/client.ts',                 // client files here
            baseUrl: 'http://localhost:5100/',
            schemas: './src/lib/api/model',          // models for standard endpoints
            client: 'fetch',
            override: {
                mutator: {
                    path: './src/custom-fetch.ts',
                    name: 'customFetch',
                },
            },
            clean: true,                           // remove old files before generating
        },
        input: {
            target: 'http://localhost:5100/umbraco/swagger/delivery/swagger.json',
        },
    },

    // --------------------------
    // Clean Starter Kit specific endpoints
    // --------------------------
    'clean-starter-kit': {
        output: {
            mode: 'tags-split',                   // split clients by tags
            target: './src/lib/api-clean/client.ts', // separate folder
            baseUrl: 'http://localhost:5100/',
            schemas: './src/lib/api-clean/model',    // models for Clean Starter Kit endpoints
            client: 'fetch',
            override: {
                mutator: {
                    path: './src/custom-fetch.ts',
                    name: 'customFetch',
                },
            },
            clean: true,
        },
        input: {
            target:
                'http://localhost:5100/umbraco/swagger/delivery/swagger.json?urls.primaryName=Clean%20starter%20kit',
        },
    },
};