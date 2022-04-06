module.exports = {
    "scalars": [
        1,
        2,
        5,
        17
    ],
    "types": {
        "Collection": {
            "_id": [
                1
            ],
            "createdAt": [
                5
            ],
            "description": [
                2
            ],
            "image": [
                2
            ],
            "name": [
                2
            ],
            "updatedAt": [
                5
            ],
            "userID": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "ID": {},
        "String": {},
        "CollectionItem": {
            "_id": [
                1
            ],
            "collectionID": [
                2
            ],
            "condition": [
                2
            ],
            "createdAt": [
                5
            ],
            "description": [
                2
            ],
            "image": [
                2
            ],
            "name": [
                2
            ],
            "price": [
                2
            ],
            "updatedAt": [
                5
            ],
            "__typename": [
                2
            ]
        },
        "CreateUserInput": {
            "email": [
                2
            ],
            "lastname": [
                2
            ],
            "name": [
                2
            ],
            "password": [
                2
            ],
            "username": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "DateTime": {},
        "LoginResponse": {
            "accessToken": [
                2
            ],
            "user": [
                12
            ],
            "__typename": [
                2
            ]
        },
        "LoginUserInput": {
            "password": [
                2
            ],
            "username": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Mutation": {
            "createCollection": [
                0,
                {
                    "createCollectionInput": [
                        13,
                        "createCollectionInput!"
                    ]
                }
            ],
            "createCollectionItem": [
                3,
                {
                    "createCollectionItemInput": [
                        14,
                        "createCollectionItemInput!"
                    ]
                }
            ],
            "createUser": [
                12,
                {
                    "createUserInput": [
                        4,
                        "CreateUserInput!"
                    ]
                }
            ],
            "deleteCollection": [
                0,
                {
                    "_id": [
                        2,
                        "String!"
                    ]
                }
            ],
            "deleteCollectionItem": [
                3,
                {
                    "id": [
                        2,
                        "String!"
                    ]
                }
            ],
            "login": [
                6,
                {
                    "LoginUserInput": [
                        7,
                        "LoginUserInput!"
                    ]
                }
            ],
            "removeUser": [
                12,
                {
                    "_id": [
                        2,
                        "String!"
                    ]
                }
            ],
            "signup": [
                12,
                {
                    "signupUserInput": [
                        10,
                        "SignupUserInput!"
                    ]
                }
            ],
            "updateCollection": [
                0,
                {
                    "updateCollectionInput": [
                        15,
                        "updateCollectionInput!"
                    ]
                }
            ],
            "updateCollectionItem": [
                3,
                {
                    "collectionItem": [
                        16,
                        "updateCollectionItemInput!"
                    ]
                }
            ],
            "updateUser": [
                12,
                {
                    "updateUserInput": [
                        11,
                        "UpdateUserInput!"
                    ]
                }
            ],
            "uploadFile": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Query": {
            "collection": [
                0,
                {
                    "collectionID": [
                        2,
                        "String!"
                    ]
                }
            ],
            "collectionItem": [
                3
            ],
            "collectionItems": [
                3,
                {
                    "collectionID": [
                        2,
                        "String!"
                    ]
                }
            ],
            "collections": [
                0
            ],
            "getUserCollections": [
                0,
                {
                    "userID": [
                        2,
                        "String!"
                    ]
                }
            ],
            "user": [
                12,
                {
                    "_id": [
                        2,
                        "String!"
                    ]
                }
            ],
            "users": [
                12
            ],
            "__typename": [
                2
            ]
        },
        "SignupUserInput": {
            "confirmPassword": [
                2
            ],
            "email": [
                2
            ],
            "lastname": [
                2
            ],
            "name": [
                2
            ],
            "password": [
                2
            ],
            "username": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "UpdateUserInput": {
            "email": [
                2
            ],
            "id": [
                2
            ],
            "lastname": [
                2
            ],
            "name": [
                2
            ],
            "password": [
                2
            ],
            "username": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "User": {
            "_id": [
                2
            ],
            "email": [
                2
            ],
            "lastname": [
                2
            ],
            "name": [
                2
            ],
            "username": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "createCollectionInput": {
            "createdAt": [
                5
            ],
            "description": [
                2
            ],
            "image": [
                2
            ],
            "name": [
                2
            ],
            "updatedAt": [
                5
            ],
            "userID": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "createCollectionItemInput": {
            "collectionID": [
                2
            ],
            "condition": [
                2
            ],
            "createdAt": [
                5
            ],
            "description": [
                2
            ],
            "image": [
                2
            ],
            "name": [
                2
            ],
            "price": [
                2
            ],
            "updatedAt": [
                5
            ],
            "__typename": [
                2
            ]
        },
        "updateCollectionInput": {
            "_id": [
                2
            ],
            "createdAt": [
                5
            ],
            "description": [
                2
            ],
            "image": [
                2
            ],
            "name": [
                2
            ],
            "updatedAt": [
                5
            ],
            "userID": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "updateCollectionItemInput": {
            "_id": [
                2
            ],
            "collectionID": [
                2
            ],
            "condition": [
                2
            ],
            "createdAt": [
                5
            ],
            "description": [
                2
            ],
            "image": [
                2
            ],
            "name": [
                2
            ],
            "price": [
                2
            ],
            "updatedAt": [
                5
            ],
            "__typename": [
                2
            ]
        },
        "Boolean": {}
    }
}