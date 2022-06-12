/** src/model/slug.js */

const schema = {
  /** Configure the collection's schema.
   * https://docs.mongodb.com/manual/core/schema-validation/
   */
  bsonType: "object",
  required: [ 
    "slug", "title", "description", "payRequest", "sessionKey", 
    "walletKey", "invoiceKey" 
  ],
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
    logo: {
      bsonType: "string",
      maxLength: 3000,
      description: "Must be a string and is required."
    },
    email: {
      bsonType: "string",
      maxLength: 48,
      description: "Must be a string and is required."
    },
    phone: {
      bsonType: "string",
      maxLength: 12,
      description: "Must be a string and is required."
    },
    fgcolor: {
      bsonType: "string",
      maxLength: 6,
      description: "Must be a string and is required."
    },
    bgcolor: {
      bsonType: "string",
      maxLength: 6,
      description: "Must be a string and is required."
    },
    txtcolor: {
      bsonType: "string",
      maxLength: 6,
      description: "Must be a string and is required."
    },
    payRequest: {
      bsonType: "string",
      maxLength: 3000,
      description: "Must be a string and is required."
    },
    sessionKey: {
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
  ],
  options: {
    validator: { $jsonSchema: schema },
    validationLevel: "strict",
    validationAction: "error"
  }
}