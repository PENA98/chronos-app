
var Collection_possibleTypes = ['Collection']
module.exports.isCollection = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isCollection"')
  return Collection_possibleTypes.includes(obj.__typename)
}



var CollectionItem_possibleTypes = ['CollectionItem']
module.exports.isCollectionItem = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isCollectionItem"')
  return CollectionItem_possibleTypes.includes(obj.__typename)
}



var LoginResponse_possibleTypes = ['LoginResponse']
module.exports.isLoginResponse = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isLoginResponse"')
  return LoginResponse_possibleTypes.includes(obj.__typename)
}



var Mutation_possibleTypes = ['Mutation']
module.exports.isMutation = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



var Query_possibleTypes = ['Query']
module.exports.isQuery = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}



var User_possibleTypes = ['User']
module.exports.isUser = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isUser"')
  return User_possibleTypes.includes(obj.__typename)
}
