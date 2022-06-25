const schema = {
  /** Configure the collection's schema.
   * https://docs.mongodb.com/manual/core/schema-validation/
   */
  bsonType: 'object',
  required: [ 'slug', 'info', 'payRequest', 'keys' ],
  properties: {
    slug: {
      bsonType: "string",
      minLength: 3,
      maxLength: 32,
      description: "Must be a string and is required."
    },
    isVerified: {
      bsonType: "bool",
      description: "Must be a boolean and is required."
    },
    payRequest: {
      bsonType: "string",
      maxLength: 3000,
      description: "Must be a string and is required."
    },
    info: {
      bsonType: "object",
      required: [ "title", "description" ],
      properties: {
        title: {
          bsonType: "string",
          maxLength: 32,
          description: "Must be a string and is required."
        },
        description: {
          bsonType: "string",
          maxLength: 500,
          description: "Must be a string and is required."
        },
        logo: {
          bsonType: [ "object", "null" ],
          maxLength: 3000,
          description: "Must be a string and is required."
        },
        location: {
          bsonType: "string",
          maxLength: 240,
          description: "Must be a string and is required."
        }
      }
    },
    styles: {
      bsonType: "object",
      properties: {
        fgColor: {
          bsonType: "string",
          maxLength: 9,
          description: "Must be a string and is required."
        },
        bgColor1: {
          bsonType: "string",
          maxLength: 9,
          description: "Must be a string and is required."
        },
        bgColor2: {
          bsonType: "string",
          maxLength: 9,
          description: "Must be a string and is required."
        },
        fontColor: {
          bsonType: "string",
          maxLength: 9,
          description: "Must be a string and is required."
        },
      }
    },
    contact: {
      bsonType: "object",
      required: [ "email" ],
      properties: {
        email: {
          bsonType: "string",
          maxLength: 48,
          description: "Must be a string and is required."
        }
        // phone: {
        //   bsonType: "string",
        //   maxLength: 12,
        //   description: "Must be a string and is required."
        // }
      }
    },
    keys: {
      bsonType: "object",
      required: [ "adminKey", "walletKey", "invoiceKey" ],
      properties: {
        adminKey: {
          bsonType: "string",
          minLength: 64,
          maxLength: 256,
          description: "Must be a string and is required."
        },
        walletKey: {
          bsonType: "string",
          minLength: 64,
          maxLength: 256,
          description: "Must be a string and is required."
        },
        invoiceKey: {
          bsonType: "string",
          minLength: 64,
          maxLength: 256,
          description: "Must be a string and is required."
        }
      }
    }
  }
}

export const AccountModel = {
  // Name of the collection.
  name: 'accounts', 
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