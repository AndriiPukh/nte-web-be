const options = {
  info: {
    version: '1.0.0',
    title: 'NTE development',
    license: {
      name: 'MIT',
    },
    contact: {
      name: 'Andrii Pukh',
      url: 'http://example.com',
      email: 'test@test.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:{port}/{basePath}',
      description: 'The production API server',
      variables: {
        username: {
          default: 'Andrii Pukh',
          description: 'Test SWAGGER',
        },
        port: {
          enum: ['9000'],
          default: '9000',
        },
        basePath: {
          default: 'api',
        },
      },
    },
  ],
  security: {
    BearerAuth: {
      type: 'http',
      scheme: 'bearer',
    },
  },
  // Base directory which we use to locate your JSDOC files
  baseDir: __dirname,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: '../../**/*.js',
  // URL where SwaggerUI will be rendered
  swaggerUIPath: '/api-docs',
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Expose Open API JSON Docs documentation in `apiDocsPath` path.
  exposeApiDocs: false,
  // Open API JSON Docs endpoint.
  apiDocsPath: '/api-docs',
  // Set non-required fields as nullable by default
  notRequiredAsNullable: false,
  swaggerUiOptions: {},
  multiple: true,
};

module.exports = options;
