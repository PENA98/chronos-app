import {FieldsSelection,Observable} from '@genql/runtime'

export type Scalars = {
    ID: string,
    String: string,
    Float: number,
    DateTime: any,
    Boolean: boolean,
}

export interface Collection {
    _id: Scalars['ID']
    createdAt: Scalars['DateTime']
    description: Scalars['String']
    image: Scalars['String']
    name: Scalars['String']
    updatedAt: Scalars['DateTime']
    userID: Scalars['String']
    __typename: 'Collection'
}

export interface CollectionItem {
    CollectionID: Scalars['String']
    _id: Scalars['ID']
    condition: Scalars['String']
    createdAt: Scalars['DateTime']
    description: Scalars['String']
    image: Scalars['String']
    name: Scalars['String']
    price: Scalars['Float']
    updatedAt: Scalars['DateTime']
    __typename: 'CollectionItem'
}

export interface LoginResponse {
    accessToken: Scalars['String']
    user: User
    __typename: 'LoginResponse'
}

export interface Mutation {
    createCollection: Collection
    createCollectionItem: CollectionItem
    createUser: User
    deleteCollection: Collection
    deleteCollectionItem: CollectionItem
    login: LoginResponse
    removeUser: User
    signup: User
    updateCollection: Collection
    updateCollectionItem: CollectionItem
    updateUser: User
    uploadFile: Scalars['String']
    __typename: 'Mutation'
}

export interface Query {
    collection: Collection
    collectionItem: CollectionItem
    collectionItems: CollectionItem[]
    collections: Collection[]
    getUserCollections: Collection[]
    user: User
    users: User[]
    __typename: 'Query'
}

export interface User {
    _id: Scalars['String']
    email: Scalars['String']
    lastname: Scalars['String']
    name: Scalars['String']
    username: Scalars['String']
    __typename: 'User'
}

export interface CollectionRequest{
    _id?: boolean | number
    createdAt?: boolean | number
    description?: boolean | number
    image?: boolean | number
    name?: boolean | number
    updatedAt?: boolean | number
    userID?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CollectionItemRequest{
    CollectionID?: boolean | number
    _id?: boolean | number
    condition?: boolean | number
    createdAt?: boolean | number
    description?: boolean | number
    image?: boolean | number
    name?: boolean | number
    price?: boolean | number
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CreateUserInput {email: Scalars['String'],lastname: Scalars['String'],name: Scalars['String'],password: Scalars['String'],username: Scalars['String']}

export interface LoginResponseRequest{
    accessToken?: boolean | number
    user?: UserRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface LoginUserInput {password: Scalars['String'],username: Scalars['String']}

export interface MutationRequest{
    createCollection?: [{createCollectionInput: createCollectionInput},CollectionRequest]
    createCollectionItem?: CollectionItemRequest
    createUser?: [{createUserInput: CreateUserInput},UserRequest]
    deleteCollection?: CollectionRequest
    deleteCollectionItem?: CollectionItemRequest
    login?: [{LoginUserInput: LoginUserInput},LoginResponseRequest]
    removeUser?: [{_id: Scalars['String']},UserRequest]
    signup?: [{signupUserInput: SignupUserInput},UserRequest]
    updateCollection?: CollectionRequest
    updateCollectionItem?: CollectionItemRequest
    updateUser?: [{updateUserInput: UpdateUserInput},UserRequest]
    uploadFile?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryRequest{
    collection?: CollectionRequest
    collectionItem?: CollectionItemRequest
    collectionItems?: CollectionItemRequest
    collections?: CollectionRequest
    getUserCollections?: [{userID: Scalars['String']},CollectionRequest]
    user?: [{_id: Scalars['String']},UserRequest]
    users?: UserRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SignupUserInput {confirmPassword: Scalars['String'],email: Scalars['String'],lastname: Scalars['String'],name: Scalars['String'],password: Scalars['String'],username: Scalars['String']}

export interface UpdateUserInput {email: Scalars['String'],id: Scalars['String'],lastname: Scalars['String'],name: Scalars['String'],password: Scalars['String'],username: Scalars['String']}

export interface UserRequest{
    _id?: boolean | number
    email?: boolean | number
    lastname?: boolean | number
    name?: boolean | number
    username?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface createCollectionInput {createdAt: Scalars['DateTime'],description: Scalars['String'],image: Scalars['String'],name: Scalars['String'],updatedAt: Scalars['DateTime'],userID: Scalars['String']}


const Collection_possibleTypes = ['Collection']
export const isCollection = (obj?: { __typename?: any } | null): obj is Collection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCollection"')
  return Collection_possibleTypes.includes(obj.__typename)
}



const CollectionItem_possibleTypes = ['CollectionItem']
export const isCollectionItem = (obj?: { __typename?: any } | null): obj is CollectionItem => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCollectionItem"')
  return CollectionItem_possibleTypes.includes(obj.__typename)
}



const LoginResponse_possibleTypes = ['LoginResponse']
export const isLoginResponse = (obj?: { __typename?: any } | null): obj is LoginResponse => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isLoginResponse"')
  return LoginResponse_possibleTypes.includes(obj.__typename)
}



const Mutation_possibleTypes = ['Mutation']
export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



const Query_possibleTypes = ['Query']
export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}



const User_possibleTypes = ['User']
export const isUser = (obj?: { __typename?: any } | null): obj is User => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isUser"')
  return User_possibleTypes.includes(obj.__typename)
}


export interface CollectionPromiseChain{
    _id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>}),
    description: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    image: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>}),
    userID: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface CollectionObservableChain{
    _id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>}),
    description: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    image: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>}),
    userID: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface CollectionItemPromiseChain{
    CollectionID: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    _id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    condition: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>}),
    description: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    image: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    price: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>})
}

export interface CollectionItemObservableChain{
    CollectionID: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    _id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    condition: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>}),
    description: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    image: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    price: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>})
}

export interface LoginResponsePromiseChain{
    accessToken: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    user: (UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>})
}

export interface LoginResponseObservableChain{
    accessToken: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    user: (UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>})
}

export interface MutationPromiseChain{
    createCollection: ((args: {createCollectionInput: createCollectionInput}) => CollectionPromiseChain & {get: <R extends CollectionRequest>(request: R, defaultValue?: FieldsSelection<Collection, R>) => Promise<FieldsSelection<Collection, R>>}),
    createCollectionItem: (CollectionItemPromiseChain & {get: <R extends CollectionItemRequest>(request: R, defaultValue?: FieldsSelection<CollectionItem, R>) => Promise<FieldsSelection<CollectionItem, R>>}),
    createUser: ((args: {createUserInput: CreateUserInput}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>}),
    deleteCollection: (CollectionPromiseChain & {get: <R extends CollectionRequest>(request: R, defaultValue?: FieldsSelection<Collection, R>) => Promise<FieldsSelection<Collection, R>>}),
    deleteCollectionItem: (CollectionItemPromiseChain & {get: <R extends CollectionItemRequest>(request: R, defaultValue?: FieldsSelection<CollectionItem, R>) => Promise<FieldsSelection<CollectionItem, R>>}),
    login: ((args: {LoginUserInput: LoginUserInput}) => LoginResponsePromiseChain & {get: <R extends LoginResponseRequest>(request: R, defaultValue?: FieldsSelection<LoginResponse, R>) => Promise<FieldsSelection<LoginResponse, R>>}),
    removeUser: ((args: {_id: Scalars['String']}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>}),
    signup: ((args: {signupUserInput: SignupUserInput}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>}),
    updateCollection: (CollectionPromiseChain & {get: <R extends CollectionRequest>(request: R, defaultValue?: FieldsSelection<Collection, R>) => Promise<FieldsSelection<Collection, R>>}),
    updateCollectionItem: (CollectionItemPromiseChain & {get: <R extends CollectionItemRequest>(request: R, defaultValue?: FieldsSelection<CollectionItem, R>) => Promise<FieldsSelection<CollectionItem, R>>}),
    updateUser: ((args: {updateUserInput: UpdateUserInput}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>}),
    uploadFile: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface MutationObservableChain{
    createCollection: ((args: {createCollectionInput: createCollectionInput}) => CollectionObservableChain & {get: <R extends CollectionRequest>(request: R, defaultValue?: FieldsSelection<Collection, R>) => Observable<FieldsSelection<Collection, R>>}),
    createCollectionItem: (CollectionItemObservableChain & {get: <R extends CollectionItemRequest>(request: R, defaultValue?: FieldsSelection<CollectionItem, R>) => Observable<FieldsSelection<CollectionItem, R>>}),
    createUser: ((args: {createUserInput: CreateUserInput}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>}),
    deleteCollection: (CollectionObservableChain & {get: <R extends CollectionRequest>(request: R, defaultValue?: FieldsSelection<Collection, R>) => Observable<FieldsSelection<Collection, R>>}),
    deleteCollectionItem: (CollectionItemObservableChain & {get: <R extends CollectionItemRequest>(request: R, defaultValue?: FieldsSelection<CollectionItem, R>) => Observable<FieldsSelection<CollectionItem, R>>}),
    login: ((args: {LoginUserInput: LoginUserInput}) => LoginResponseObservableChain & {get: <R extends LoginResponseRequest>(request: R, defaultValue?: FieldsSelection<LoginResponse, R>) => Observable<FieldsSelection<LoginResponse, R>>}),
    removeUser: ((args: {_id: Scalars['String']}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>}),
    signup: ((args: {signupUserInput: SignupUserInput}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>}),
    updateCollection: (CollectionObservableChain & {get: <R extends CollectionRequest>(request: R, defaultValue?: FieldsSelection<Collection, R>) => Observable<FieldsSelection<Collection, R>>}),
    updateCollectionItem: (CollectionItemObservableChain & {get: <R extends CollectionItemRequest>(request: R, defaultValue?: FieldsSelection<CollectionItem, R>) => Observable<FieldsSelection<CollectionItem, R>>}),
    updateUser: ((args: {updateUserInput: UpdateUserInput}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>}),
    uploadFile: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface QueryPromiseChain{
    collection: (CollectionPromiseChain & {get: <R extends CollectionRequest>(request: R, defaultValue?: FieldsSelection<Collection, R>) => Promise<FieldsSelection<Collection, R>>}),
    collectionItem: (CollectionItemPromiseChain & {get: <R extends CollectionItemRequest>(request: R, defaultValue?: FieldsSelection<CollectionItem, R>) => Promise<FieldsSelection<CollectionItem, R>>}),
    collectionItems: ({get: <R extends CollectionItemRequest>(request: R, defaultValue?: FieldsSelection<CollectionItem, R>[]) => Promise<FieldsSelection<CollectionItem, R>[]>}),
    collections: ({get: <R extends CollectionRequest>(request: R, defaultValue?: FieldsSelection<Collection, R>[]) => Promise<FieldsSelection<Collection, R>[]>}),
    getUserCollections: ((args: {userID: Scalars['String']}) => {get: <R extends CollectionRequest>(request: R, defaultValue?: FieldsSelection<Collection, R>[]) => Promise<FieldsSelection<Collection, R>[]>}),
    user: ((args: {_id: Scalars['String']}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>}),
    users: ({get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>[]) => Promise<FieldsSelection<User, R>[]>})
}

export interface QueryObservableChain{
    collection: (CollectionObservableChain & {get: <R extends CollectionRequest>(request: R, defaultValue?: FieldsSelection<Collection, R>) => Observable<FieldsSelection<Collection, R>>}),
    collectionItem: (CollectionItemObservableChain & {get: <R extends CollectionItemRequest>(request: R, defaultValue?: FieldsSelection<CollectionItem, R>) => Observable<FieldsSelection<CollectionItem, R>>}),
    collectionItems: ({get: <R extends CollectionItemRequest>(request: R, defaultValue?: FieldsSelection<CollectionItem, R>[]) => Observable<FieldsSelection<CollectionItem, R>[]>}),
    collections: ({get: <R extends CollectionRequest>(request: R, defaultValue?: FieldsSelection<Collection, R>[]) => Observable<FieldsSelection<Collection, R>[]>}),
    getUserCollections: ((args: {userID: Scalars['String']}) => {get: <R extends CollectionRequest>(request: R, defaultValue?: FieldsSelection<Collection, R>[]) => Observable<FieldsSelection<Collection, R>[]>}),
    user: ((args: {_id: Scalars['String']}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>}),
    users: ({get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>[]) => Observable<FieldsSelection<User, R>[]>})
}

export interface UserPromiseChain{
    _id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    email: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    lastname: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    username: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface UserObservableChain{
    _id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    email: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    lastname: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    username: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}