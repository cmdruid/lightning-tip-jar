/** src/model/slug.js */

const schema = {
  /** Configure the collection's schema.
   * https://docs.mongodb.com/manual/core/schema-validation/
   */
  bsonType: "object",
  required: [ "slug", "title", "description", "payRequest", "withdrawUrl" ],
  properties: {
    slug: {
      bsonType: "string",
      maxLength: 32,
      description: "Must be a string and is required."
    },
    title: {
      bsonType: "string",
      maxLength: 64,
      description: "Must be a string and is required."
    },
    description: {
      bsonType: "string",
      maxLength: 240,
      description: "Must be a string and is required."
    },
    payRequest: {
      bsonType: "string",
      maxLength: 3000,
      description: "Must be a string and is required."
    },
    withdrawUrl: {
      bsonType: "string",
      maxLength: 3000,
      description: "Must be a string and is required."
    },
    walletKey: {
      bsonType: "string",
      maxLength: 3000,
      description: "Must be a string and is required."
    },
    invoiceKey: {
      bsonType: "string",
      maxLength: 3000,
      description: "Must be a string and is required."
    },
    withdrawKey: {
      bsonType: "string",
      maxLength: 3000,
      description: "Must be a string and is required."
    },
  }
}

export const UserModel = {
  // Name of the collection.
  name: 'users', 

  indexes: [
    /** Configure the collection's indexes.
     * https://docs.mongodb.com/manual/reference/command/createIndexes
     */
    {
      name: "_slug_",
      key: { slug: 1 },
      unique: true
    }
  ]
  // options: {
  //   validator: { $jsonSchema: schema },
  //   validationLevel: "strict",
  //   validationAction: "error"
  // }
}