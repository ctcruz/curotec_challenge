const faker = require("faker");

module.exports = {
  posts: {
    output: {
      mode: "split",
      target: "src/api/posts.ts",
      schemas: "src/model",
      client: "react-query",
      mock: true,
      //  override: {
      //    operations: {
      //      listPets: {
      //        mutator: 'src/response-type.js',
      //        mock: {
      //          properties: () => {
      //            return {
      //              id: () => faker.random.number({ min: 1, max: 99999 }),
      //            };
      //          },
      //        },
      //      },
      //      showPetById: {
      //        mock: {
      //          data: () => ({
      //            id: faker.random.number({ min: 1, max: 99 }),
      //            name: faker.name.firstName(),
      //            tag: faker.helpers.randomize([faker.random.word(), undefined]),
      //          }),
      //        },
      //      },
      //    },
      //    mock: {
      //      properties: {
      //        '/tag|name/': () => faker.name.lastName(),
      //      },
      //    },
      //  },
    },
    input: {
      target: "http://127.0.1:3000/open-api.json",
      //  override: {
      //    transformer: 'src/add-version.js',
      //  },
    },
  },
};
