module.exports = {
  swagger: '2.0',
  info: {
    version: '1',
    title: 'WEconnect',
    description: 'WeConnect provides a platform that brings businesses and individuals together. This platform creates awareness for businesses and gives the Users the ability to write reviews about the businesses they have interacted with. This application makes use of token based authentication and Some API Endpoints are protected, you will need to sign up and sign in to access them'
  },
  host: 'weconnect-com.herokuapp.com',
  basePath: '/api/v1/',
  tags: [
    {
      name: 'Businesses',
      description: 'API for Businesses in the system'
    }
  ],
  schemes: [
    'https','http'
  ],
  consumes: [
    'application/json'
  ],
  produces: [
    'application/json'
  ],
  paths: {
    '/auth/signup': {
      post: {
        tags: ['User'],
        summary: 'Creates an account for a new user',
        parameters:
        [
          {
            name: 'User',
            in: 'body',
            description: 'The details of the user',
            schema: {
              $ref: '#/definitions/user'
            }
          }
        ],
        responses: {
          201: {
            description: 'New user is created',
            schema: {
              $ref: '#/definitions/user'
            }
          },
          400: {
            description: 'Error -Missing required fields'
          }
        }
      }
    },
    '/auth/login': {
      post: {
        tags: ['User'],
        summary: 'Logs a new user in',
        consumes: ['application/x-www-form-urlencoded'],
        parameters:
        [
          {
            name: 'email',
            in: 'formData',
            required: true,
            description: 'The email of the user',
            type: 'string'
          },
          {
            name: 'password',
            in: 'formData',
            required: true,
            description: 'The password of the user',
            type: 'string'
          }
        ],
        responses: {
          201: {
            description: 'User is logged in',
            schema: {
              $ref: '#/definitions/user'
            }
          },
          401: {
            description: 'Access denied'
          }
        }
      }
    },
    '/businesses': {
      post: {
        tags: [
          'Businesses'
        ],
        summary: 'Create new business in system',
        parameters: [
          {
            name: 'Business',
            in: 'body',
            description: 'The new business to be added',
            schema: {
              $ref: '#/definitions/business'
            }
          }
        ],
        responses: {
          200: {
            description: 'New business is created',
            schema: {
              $ref: '#/definitions/businesses'
            }
          },
          400: {
            description: 'Did not create business'
          }
        }
      },
      get: {
        tags: [
          'Businesses'
        ],
        summary: 'Get all businesses in system',
        parameters: [
          {
            name: 'location',
            in: 'query',
            description: 'Filter businesses by location',
            type: 'string'
          },
          {
            name: 'category',
            in: 'query',
            description: 'Filter businesses by category of businesses',
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'Returns all the businesses in the system',
            schema: {
              $ref: '#/definitions/businesses'
            }
          }
        }
      }
    },
    '/businesses/{businessId}': {
      parameters: [
        {
          name: 'businessId',
          in: 'path',
          required: true,
          description: 'ID of the business to get',
          type: 'integer'
        }
      ],
      get: {
        tags: [
          'Businesses'
        ],
        summary: 'Get business with given ID',
        responses: {
          200: {
            description: 'Returns the specified Business',
            schema: {
              $ref: '#/definitions/business'
            }
          },
          404: {
            description: 'Could not get business'
          }
        }
      },
      delete: {
        summary: 'Deletes the business with the given ID',
        tags: [
          'Businesses'
        ],
        responses: {
          204: {
            description: 'Business is deleted and returns no data'
          },
          404: {
            description: 'Could not delete business'
          }
        }
      },
      put: {
        summary: 'Updates the business with the given ID',
        tags: [
          'Businesses'
        ],
        parameters: [
          {
            name: 'Business',
            in: 'body',
            description: 'The new details of Business',
            schema: {
              $ref: '#/definitions/business'
            }
          }
        ],
        responses: {
          200: {
            description: 'Updated Business'
          },
          404: {
            description: ' Could not update Business'
          }
        }
      }
    },
    '/businesses/{businessId}/reviews': {
      post: {
        tags: [
          'Businesses'
        ],
        summary: 'Create new review for a business in system',
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'businessId',
            in: 'path',
            required: true,
            description: 'ID of the business to be reviewed',
            type: 'integer'
          },
          {
            name: 'review',
            in: 'formData',
            description: 'The review',
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'The reviewed business',
            schema: {
              $ref: '#/definitions/business'
            }
          },
          404: {
            description: 'Could not post review for business'
          }
        }
      },
      get: {
        tags: [
          'Businesses'
        ],
        summary: 'Get the reviews of a business in system',
        parameters: [
          {
            name: 'businessId',
            in: 'path',
            required: true,
            description: 'ID of a particular business',
            type: 'integer'
          }
        ],
        responses: {
          200: {
            description: 'The reviewed business',
            schema: {
              $ref: '#/definitions/business'
            }
          },
          404: {
            description: 'Could not get reviews'
          }
        }
      }
    }
  },
  definitions: {
    business: {
      required: [
        'name','description'
      ],
      properties: {
        name: {
          type: 'string',
          uniqueItems: true
        },
        description: {
          type: 'string'
        },
        email: {
          type: 'string'
        },
        phone: {
          type: 'string'
        },
        address: {
          type: 'string'
        },
        category: {
          type: 'string'
        },
        location: {
          type: 'string'
        },
        image: {
          type: 'string'
        }
      }
    },
    businesses: {
      type: 'array',
      items: {
        $ref: '#/definitions/business'
      }
    },
    user: {
      required: [
        'email',
        'password',
        'firstName',
        'lastName'

      ],
      properties: {
        firstName: {
          type: 'string',
          uniqueItems: false
        },
        lastName: {
          type: 'string',
          uniqueItems: false
        },
        email: {
          type: 'string',
          uniqueItems: true
        },
        password: {
          type: 'string',
          uniqueItems: false
        },
        notify: {
          type: 'boolean',
          default: false,
          uniqueItems: false
        }
      }
    }
  }
};
