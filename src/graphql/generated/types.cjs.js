module.exports = {
    "scalars": [
        1,
        2,
        4,
        6,
        16
    ],
    "types": {
        "Collection": {
            "_id": [
                1
            ],
            "createdAt": [
                6
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
                6
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
            "CollectionID": [
                2
            ],
            "_id": [
                1
            ],
            "condition": [
                2
            ],
            "createdAt": [
                6
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
                4
            ],
            "updatedAt": [
                6
            ],
            "__typename": [
                2
            ]
        },
        "Float": {},
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
                13
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
                        14,
                        "createCollectionInput!"
                    ]
                }
            ],
            "createCollectionItem": [
                3
            ],
            "createUser": [
                13,
                {
                    "createUserInput": [
                        5,
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
                3
            ],
            "login": [
                7,
                {
                    "LoginUserInput": [
                        8,
                        "LoginUserInput!"
                    ]
                }
            ],
            "removeUser": [
                13,
                {
                    "_id": [
                        2,
                        "String!"
                    ]
                }
            ],
            "signup": [
                13,
                {
                    "signupUserInput": [
                        11,
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
                3
            ],
            "updateUser": [
                13,
                {
                    "updateUserInput": [
                        12,
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
                0
            ],
            "collectionItem": [
                3
            ],
            "collectionItems": [
                3
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
                13,
                {
                    "_id": [
                        2,
                        "String!"
                    ]
                }
            ],
            "users": [
                13
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
                6
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
                6
            ],
            "userID": [
                2
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
                6
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
                6
            ],
            "userID": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Boolean": {}
    }
}