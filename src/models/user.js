const schema = {
  /** Configure the collection's schema.
   * https://docs.mongodb.com/manual/core/schema-validation/
   */
  bsonType: 'object',
  required: [ 'key', 'username', 'email' ],
  properties: {
    key: {
      bsonType: 'string',
      maxLength: 32,
      description: 'Must be a string and is required.'
    },
    username: {
      bsonType: 'string',
      maxLength: 32,
      description: 'Must be a string and is required.'
    },
    email: {
      bsonType: 'string',
      maxLength: 32,
      description: 'Must be a string and is required.'
    }
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
      name: '_userKey_',
      key: { userKey: 1 },
      unique: true
    }
  ],
  options: {
    validator: { $jsonSchema: schema },
    validationLevel: 'strict',
    validationAction: 'error'
  }
}