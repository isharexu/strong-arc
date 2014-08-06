'use strict';

var urlBase = "http://0.0.0.0:4001/api";
var wsUrlBase = urlBase;

/**
 * @ngdoc overview
 * @name lbServices
 * @module
 * @description
 *
 * The `lbServices` module provides services for interacting with
 * the models exposed by the LoopBack server via the REST API.
 *
 */
var module = angular.module("slServices", ['ngResource']);

/**
 * @ngdoc object
 * @name lbServices.ComponentDefinition
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `ComponentDefinition` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "ComponentDefinition",
  ['LoopBackResource', 'LoopBackAuth', function(Resource, LoopBackAuth) {
    return Resource(
      wsUrlBase + "/ComponentDefinitions/:id",
      { 'id': '@id' },
      {
        /**
         * @ngdoc method
         * @name lbServices.ComponentDefinition#create
         * @methodOf lbServices.ComponentDefinition
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ComponentDefinition` object.)
         * </em>
         */
        "create": {
          url: wsUrlBase + "/ComponentDefinitions",
          method: "POST",
        },
        /**
         * @ngdoc method
         * @name lbServices.ComponentDefinition#updateOrCreate
         * @methodOf lbServices.ComponentDefinition
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ComponentDefinition` object.)
         * </em>
         */
        "updateOrCreate": {
          url: wsUrlBase + "/ComponentDefinitions",
          method: "PUT",
        },
        /**
         * @ngdoc method
         * @name lbServices.ComponentDefinition#exists
         * @methodOf lbServices.ComponentDefinition
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{*=}` -
         */
        "exists": {
          url: wsUrlBase + "/ComponentDefinitions/:id/exists",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.ComponentDefinition#findById
         * @methodOf lbServices.ComponentDefinition
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ComponentDefinition` object.)
         * </em>
         */
        "findById": {
          url: wsUrlBase + "/ComponentDefinitions/:id",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.ComponentDefinition#find
         * @methodOf lbServices.ComponentDefinition
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ComponentDefinition` object.)
         * </em>
         */
        "find": {
          url: wsUrlBase + "/ComponentDefinitions",
          method: "GET",
          isArray: true,
        },
        /**
         * @ngdoc method
         * @name lbServices.ComponentDefinition#findOne
         * @methodOf lbServices.ComponentDefinition
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ComponentDefinition` object.)
         * </em>
         */
        "findOne": {
          url: wsUrlBase + "/ComponentDefinitions/findOne",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.ComponentDefinition#destroyById
         * @methodOf lbServices.ComponentDefinition
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "destroyById": {
          url: wsUrlBase + "/ComponentDefinitions/:id",
          method: "DELETE",
        },
        /**
         * @ngdoc method
         * @name lbServices.ComponentDefinition#count
         * @methodOf lbServices.ComponentDefinition
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        "count": {
          url: wsUrlBase + "/ComponentDefinitions/count",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.ComponentDefinition#prototype$updateAttributes
         * @methodOf lbServices.ComponentDefinition
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ComponentDefinition` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: wsUrlBase + "/ComponentDefinitions/:id",
          method: "PUT",
        },
        /**
         * @ngdoc method
         * @name lbServices.ComponentDefinition#prototype$__get__models
         * @methodOf lbServices.ComponentDefinition
         *
         * @description
         *
         * Queries models of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` -
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ComponentDefinition` object.)
         * </em>
         */
        "prototype$__get__models": {
          url: wsUrlBase + "/ComponentDefinitions/:id/models",
          method: "GET",
          isArray: true,
        },
        /**
         * @ngdoc method
         * @name lbServices.ComponentDefinition#prototype$__create__models
         * @methodOf lbServices.ComponentDefinition
         *
         * @description
         *
         * Creates a new instance in models of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ComponentDefinition` object.)
         * </em>
         */
        "prototype$__create__models": {
          url: wsUrlBase + "/ComponentDefinitions/:id/models",
          method: "POST",
        },
        /**
         * @ngdoc method
         * @name lbServices.ComponentDefinition#prototype$__delete__models
         * @methodOf lbServices.ComponentDefinition
         *
         * @description
         *
         * Deletes all models of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ComponentDefinition` object.)
         * </em>
         */
        "prototype$__delete__models": {
          url: wsUrlBase + "/ComponentDefinitions/:id/models",
          method: "DELETE",
        },
        /**
         * @ngdoc method
         * @name lbServices.ComponentDefinition#prototype$__get__datasources
         * @methodOf lbServices.ComponentDefinition
         *
         * @description
         *
         * Queries datasources of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` -
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ComponentDefinition` object.)
         * </em>
         */
        "prototype$__get__datasources": {
          url: wsUrlBase + "/ComponentDefinitions/:id/datasources",
          method: "GET",
          isArray: true,
        },
        /**
         * @ngdoc method
         * @name lbServices.ComponentDefinition#prototype$__create__datasources
         * @methodOf lbServices.ComponentDefinition
         *
         * @description
         *
         * Creates a new instance in datasources of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ComponentDefinition` object.)
         * </em>
         */
        "prototype$__create__datasources": {
          url: wsUrlBase + "/ComponentDefinitions/:id/datasources",
          method: "POST",
        },
        /**
         * @ngdoc method
         * @name lbServices.ComponentDefinition#prototype$__delete__datasources
         * @methodOf lbServices.ComponentDefinition
         *
         * @description
         *
         * Deletes all datasources of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ComponentDefinition` object.)
         * </em>
         */
        "prototype$__delete__datasources": {
          url: wsUrlBase + "/ComponentDefinitions/:id/datasources",
          method: "DELETE",
        },
      }
    );
  }]);

/**
 * @ngdoc object
 * @name lbServices.ModelDefinition
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `ModelDefinition` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "ModelDefinition",
  ['LoopBackResource', 'LoopBackAuth', function(Resource, LoopBackAuth) {
    return Resource(
      wsUrlBase + "/ModelDefinitions/:id",
      { 'id': '@id' },
      {
        /**
         * @ngdoc method
         * @name lbServices.ModelDefinition#create
         * @methodOf lbServices.ModelDefinition
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelDefinition` object.)
         * </em>
         */
        "create": {
          url: wsUrlBase + "/ModelDefinitions",
          method: "POST",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelDefinition#updateOrCreate
         * @methodOf lbServices.ModelDefinition
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelDefinition` object.)
         * </em>
         */
        "updateOrCreate": {
          url: wsUrlBase + "/ModelDefinitions",
          method: "PUT",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelDefinition#exists
         * @methodOf lbServices.ModelDefinition
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{*=}` -
         */
        "exists": {
          url: wsUrlBase + "/ModelDefinitions/:id/exists",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelDefinition#findById
         * @methodOf lbServices.ModelDefinition
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelDefinition` object.)
         * </em>
         */
        "findById": {
          url: wsUrlBase + "/ModelDefinitions/:id",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelDefinition#find
         * @methodOf lbServices.ModelDefinition
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelDefinition` object.)
         * </em>
         */
        "find": {
          url: wsUrlBase + "/ModelDefinitions",
          method: "GET",
          isArray: true,
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelDefinition#findOne
         * @methodOf lbServices.ModelDefinition
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelDefinition` object.)
         * </em>
         */
        "findOne": {
          url: wsUrlBase + "/ModelDefinitions/findOne",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelDefinition#destroyById
         * @methodOf lbServices.ModelDefinition
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "destroyById": {
          url: wsUrlBase + "/ModelDefinitions/:id",
          method: "DELETE",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelDefinition#count
         * @methodOf lbServices.ModelDefinition
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        "count": {
          url: wsUrlBase + "/ModelDefinitions/count",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelDefinition#prototype$updateAttributes
         * @methodOf lbServices.ModelDefinition
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelDefinition` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: wsUrlBase + "/ModelDefinitions/:id",
          method: "PUT",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelDefinition#prototype$__get__methods
         * @methodOf lbServices.ModelDefinition
         *
         * @description
         *
         * Queries methods of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` -
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelDefinition` object.)
         * </em>
         */
        "prototype$__get__methods": {
          url: wsUrlBase + "/ModelDefinitions/:id/methods",
          method: "GET",
          isArray: true,
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelDefinition#prototype$__create__methods
         * @methodOf lbServices.ModelDefinition
         *
         * @description
         *
         * Creates a new instance in methods of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelDefinition` object.)
         * </em>
         */
        "prototype$__create__methods": {
          url: wsUrlBase + "/ModelDefinitions/:id/methods",
          method: "POST",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelDefinition#prototype$__delete__methods
         * @methodOf lbServices.ModelDefinition
         *
         * @description
         *
         * Deletes all methods of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelDefinition` object.)
         * </em>
         */
        "prototype$__delete__methods": {
          url: wsUrlBase + "/ModelDefinitions/:id/methods",
          method: "DELETE",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelDefinition#prototype$__get__relations
         * @methodOf lbServices.ModelDefinition
         *
         * @description
         *
         * Queries relations of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` -
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelDefinition` object.)
         * </em>
         */
        "prototype$__get__relations": {
          url: wsUrlBase + "/ModelDefinitions/:id/relations",
          method: "GET",
          isArray: true,
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelDefinition#prototype$__create__relations
         * @methodOf lbServices.ModelDefinition
         *
         * @description
         *
         * Creates a new instance in relations of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelDefinition` object.)
         * </em>
         */
        "prototype$__create__relations": {
          url: wsUrlBase + "/ModelDefinitions/:id/relations",
          method: "POST",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelDefinition#prototype$__delete__relations
         * @methodOf lbServices.ModelDefinition
         *
         * @description
         *
         * Deletes all relations of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelDefinition` object.)
         * </em>
         */
        "prototype$__delete__relations": {
          url: wsUrlBase + "/ModelDefinitions/:id/relations",
          method: "DELETE",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelDefinition#prototype$__get__accessControls
         * @methodOf lbServices.ModelDefinition
         *
         * @description
         *
         * Queries accessControls of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` -
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelDefinition` object.)
         * </em>
         */
        "prototype$__get__accessControls": {
          url: wsUrlBase + "/ModelDefinitions/:id/accessControls",
          method: "GET",
          isArray: true,
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelDefinition#prototype$__create__accessControls
         * @methodOf lbServices.ModelDefinition
         *
         * @description
         *
         * Creates a new instance in accessControls of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelDefinition` object.)
         * </em>
         */
        "prototype$__create__accessControls": {
          url: wsUrlBase + "/ModelDefinitions/:id/accessControls",
          method: "POST",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelDefinition#prototype$__delete__accessControls
         * @methodOf lbServices.ModelDefinition
         *
         * @description
         *
         * Deletes all accessControls of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelDefinition` object.)
         * </em>
         */
        "prototype$__delete__accessControls": {
          url: wsUrlBase + "/ModelDefinitions/:id/accessControls",
          method: "DELETE",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelDefinition#prototype$__get__properties
         * @methodOf lbServices.ModelDefinition
         *
         * @description
         *
         * Queries properties of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` -
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelDefinition` object.)
         * </em>
         */
        "prototype$__get__properties": {
          url: wsUrlBase + "/ModelDefinitions/:id/properties",
          method: "GET",
          isArray: true,
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelDefinition#prototype$__create__properties
         * @methodOf lbServices.ModelDefinition
         *
         * @description
         *
         * Creates a new instance in properties of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelDefinition` object.)
         * </em>
         */
        "prototype$__create__properties": {
          url: wsUrlBase + "/ModelDefinitions/:id/properties",
          method: "POST",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelDefinition#prototype$__delete__properties
         * @methodOf lbServices.ModelDefinition
         *
         * @description
         *
         * Deletes all properties of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelDefinition` object.)
         * </em>
         */
        "prototype$__delete__properties": {
          url: wsUrlBase + "/ModelDefinitions/:id/properties",
          method: "DELETE",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelDefinition#prototype$__get__validations
         * @methodOf lbServices.ModelDefinition
         *
         * @description
         *
         * Queries validations of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` -
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelDefinition` object.)
         * </em>
         */
        "prototype$__get__validations": {
          url: wsUrlBase + "/ModelDefinitions/:id/validations",
          method: "GET",
          isArray: true,
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelDefinition#prototype$__create__validations
         * @methodOf lbServices.ModelDefinition
         *
         * @description
         *
         * Creates a new instance in validations of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelDefinition` object.)
         * </em>
         */
        "prototype$__create__validations": {
          url: wsUrlBase + "/ModelDefinitions/:id/validations",
          method: "POST",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelDefinition#prototype$__delete__validations
         * @methodOf lbServices.ModelDefinition
         *
         * @description
         *
         * Deletes all validations of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelDefinition` object.)
         * </em>
         */
        "prototype$__delete__validations": {
          url: wsUrlBase + "/ModelDefinitions/:id/validations",
          method: "DELETE",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelDefinition#prototype$__get__views
         * @methodOf lbServices.ModelDefinition
         *
         * @description
         *
         * Queries views of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` -
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelDefinition` object.)
         * </em>
         */
        "prototype$__get__views": {
          url: wsUrlBase + "/ModelDefinitions/:id/views",
          method: "GET",
          isArray: true,
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelDefinition#prototype$__create__views
         * @methodOf lbServices.ModelDefinition
         *
         * @description
         *
         * Creates a new instance in views of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelDefinition` object.)
         * </em>
         */
        "prototype$__create__views": {
          url: wsUrlBase + "/ModelDefinitions/:id/views",
          method: "POST",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelDefinition#prototype$__delete__views
         * @methodOf lbServices.ModelDefinition
         *
         * @description
         *
         * Deletes all views of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelDefinition` object.)
         * </em>
         */
        "prototype$__delete__views": {
          url: wsUrlBase + "/ModelDefinitions/:id/views",
          method: "DELETE",
        },
      }
    );
  }]);

/**
 * @ngdoc object
 * @name lbServices.ModelMethod
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `ModelMethod` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "ModelMethod",
  ['LoopBackResource', 'LoopBackAuth', function(Resource, LoopBackAuth) {
    return Resource(
      wsUrlBase + "/ModelMethods/:id",
      { 'id': '@id' },
      {
        /**
         * @ngdoc method
         * @name lbServices.ModelMethod#create
         * @methodOf lbServices.ModelMethod
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelMethod` object.)
         * </em>
         */
        "create": {
          url: wsUrlBase + "/ModelMethods",
          method: "POST",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelMethod#updateOrCreate
         * @methodOf lbServices.ModelMethod
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelMethod` object.)
         * </em>
         */
        "updateOrCreate": {
          url: wsUrlBase + "/ModelMethods",
          method: "PUT",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelMethod#exists
         * @methodOf lbServices.ModelMethod
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{*=}` -
         */
        "exists": {
          url: wsUrlBase + "/ModelMethods/:id/exists",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelMethod#findById
         * @methodOf lbServices.ModelMethod
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelMethod` object.)
         * </em>
         */
        "findById": {
          url: wsUrlBase + "/ModelMethods/:id",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelMethod#find
         * @methodOf lbServices.ModelMethod
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelMethod` object.)
         * </em>
         */
        "find": {
          url: wsUrlBase + "/ModelMethods",
          method: "GET",
          isArray: true,
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelMethod#findOne
         * @methodOf lbServices.ModelMethod
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelMethod` object.)
         * </em>
         */
        "findOne": {
          url: wsUrlBase + "/ModelMethods/findOne",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelMethod#destroyById
         * @methodOf lbServices.ModelMethod
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "destroyById": {
          url: wsUrlBase + "/ModelMethods/:id",
          method: "DELETE",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelMethod#count
         * @methodOf lbServices.ModelMethod
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        "count": {
          url: wsUrlBase + "/ModelMethods/count",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelMethod#prototype$updateAttributes
         * @methodOf lbServices.ModelMethod
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelMethod` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: wsUrlBase + "/ModelMethods/:id",
          method: "PUT",
        },
      }
    );
  }]);

/**
 * @ngdoc object
 * @name lbServices.ModelRelation
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `ModelRelation` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "ModelRelation",
  ['LoopBackResource', 'LoopBackAuth', function(Resource, LoopBackAuth) {
    return Resource(
      wsUrlBase + "/ModelRelations/:id",
      { 'id': '@id' },
      {
        /**
         * @ngdoc method
         * @name lbServices.ModelRelation#create
         * @methodOf lbServices.ModelRelation
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelRelation` object.)
         * </em>
         */
        "create": {
          url: wsUrlBase + "/ModelRelations",
          method: "POST",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelRelation#updateOrCreate
         * @methodOf lbServices.ModelRelation
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelRelation` object.)
         * </em>
         */
        "updateOrCreate": {
          url: wsUrlBase + "/ModelRelations",
          method: "PUT",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelRelation#exists
         * @methodOf lbServices.ModelRelation
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{*=}` -
         */
        "exists": {
          url: wsUrlBase + "/ModelRelations/:id/exists",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelRelation#findById
         * @methodOf lbServices.ModelRelation
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelRelation` object.)
         * </em>
         */
        "findById": {
          url: wsUrlBase + "/ModelRelations/:id",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelRelation#find
         * @methodOf lbServices.ModelRelation
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelRelation` object.)
         * </em>
         */
        "find": {
          url: wsUrlBase + "/ModelRelations",
          method: "GET",
          isArray: true,
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelRelation#findOne
         * @methodOf lbServices.ModelRelation
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelRelation` object.)
         * </em>
         */
        "findOne": {
          url: wsUrlBase + "/ModelRelations/findOne",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelRelation#destroyById
         * @methodOf lbServices.ModelRelation
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "destroyById": {
          url: wsUrlBase + "/ModelRelations/:id",
          method: "DELETE",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelRelation#count
         * @methodOf lbServices.ModelRelation
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        "count": {
          url: wsUrlBase + "/ModelRelations/count",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelRelation#prototype$updateAttributes
         * @methodOf lbServices.ModelRelation
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelRelation` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: wsUrlBase + "/ModelRelations/:id",
          method: "PUT",
        },
      }
    );
  }]);

/**
 * @ngdoc object
 * @name lbServices.ModelAccessControl
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `ModelAccessControl` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "ModelAccessControl",
  ['LoopBackResource', 'LoopBackAuth', function(Resource, LoopBackAuth) {
    return Resource(
      wsUrlBase + "/ModelAccessControls/:id",
      { 'id': '@id' },
      {
        /**
         * @ngdoc method
         * @name lbServices.ModelAccessControl#create
         * @methodOf lbServices.ModelAccessControl
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelAccessControl` object.)
         * </em>
         */
        "create": {
          url: wsUrlBase + "/ModelAccessControls",
          method: "POST",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelAccessControl#updateOrCreate
         * @methodOf lbServices.ModelAccessControl
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelAccessControl` object.)
         * </em>
         */
        "updateOrCreate": {
          url: wsUrlBase + "/ModelAccessControls",
          method: "PUT",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelAccessControl#exists
         * @methodOf lbServices.ModelAccessControl
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{*=}` -
         */
        "exists": {
          url: wsUrlBase + "/ModelAccessControls/:id/exists",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelAccessControl#findById
         * @methodOf lbServices.ModelAccessControl
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelAccessControl` object.)
         * </em>
         */
        "findById": {
          url: wsUrlBase + "/ModelAccessControls/:id",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelAccessControl#find
         * @methodOf lbServices.ModelAccessControl
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelAccessControl` object.)
         * </em>
         */
        "find": {
          url: wsUrlBase + "/ModelAccessControls",
          method: "GET",
          isArray: true,
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelAccessControl#findOne
         * @methodOf lbServices.ModelAccessControl
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelAccessControl` object.)
         * </em>
         */
        "findOne": {
          url: wsUrlBase + "/ModelAccessControls/findOne",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelAccessControl#destroyById
         * @methodOf lbServices.ModelAccessControl
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "destroyById": {
          url: wsUrlBase + "/ModelAccessControls/:id",
          method: "DELETE",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelAccessControl#count
         * @methodOf lbServices.ModelAccessControl
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        "count": {
          url: wsUrlBase + "/ModelAccessControls/count",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelAccessControl#prototype$updateAttributes
         * @methodOf lbServices.ModelAccessControl
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelAccessControl` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: wsUrlBase + "/ModelAccessControls/:id",
          method: "PUT",
        },
      }
    );
  }]);

/**
 * @ngdoc object
 * @name lbServices.ModelProperty
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `ModelProperty` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "ModelProperty",
  ['LoopBackResource', 'LoopBackAuth', function(Resource, LoopBackAuth) {
    return Resource(
      wsUrlBase + "/ModelProperties/:id",
      { 'id': '@id' },
      {
        /**
         * @ngdoc method
         * @name lbServices.ModelProperty#create
         * @methodOf lbServices.ModelProperty
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelProperty` object.)
         * </em>
         */
        "create": {
          url: wsUrlBase + "/ModelProperties",
          method: "POST",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelProperty#updateOrCreate
         * @methodOf lbServices.ModelProperty
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelProperty` object.)
         * </em>
         */
        "updateOrCreate": {
          url: wsUrlBase + "/ModelProperties",
          method: "PUT",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelProperty#exists
         * @methodOf lbServices.ModelProperty
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{*=}` -
         */
        "exists": {
          url: wsUrlBase + "/ModelProperties/:id/exists",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelProperty#findById
         * @methodOf lbServices.ModelProperty
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelProperty` object.)
         * </em>
         */
        "findById": {
          url: wsUrlBase + "/ModelProperties/:id",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelProperty#find
         * @methodOf lbServices.ModelProperty
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelProperty` object.)
         * </em>
         */
        "find": {
          url: wsUrlBase + "/ModelProperties",
          method: "GET",
          isArray: true,
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelProperty#findOne
         * @methodOf lbServices.ModelProperty
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelProperty` object.)
         * </em>
         */
        "findOne": {
          url: wsUrlBase + "/ModelProperties/findOne",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelProperty#destroyById
         * @methodOf lbServices.ModelProperty
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "destroyById": {
          url: wsUrlBase + "/ModelProperties/:id",
          method: "DELETE",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelProperty#count
         * @methodOf lbServices.ModelProperty
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        "count": {
          url: wsUrlBase + "/ModelProperties/count",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.ModelProperty#prototype$updateAttributes
         * @methodOf lbServices.ModelProperty
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ModelProperty` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: wsUrlBase + "/ModelProperties/:id",
          method: "PUT",
        },
      }
    );
  }]);

/**
 * @ngdoc object
 * @name lbServices.DatabaseColumn
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `DatabaseColumn` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "DatabaseColumn",
  ['LoopBackResource', 'LoopBackAuth', function(Resource, LoopBackAuth) {
    return Resource(
      wsUrlBase + "/DatabaseColumns/:id",
      { 'id': '@id' },
      {
        /**
         * @ngdoc method
         * @name lbServices.DatabaseColumn#create
         * @methodOf lbServices.DatabaseColumn
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `DatabaseColumn` object.)
         * </em>
         */
        "create": {
          url: wsUrlBase + "/DatabaseColumns",
          method: "POST",
        },
        /**
         * @ngdoc method
         * @name lbServices.DatabaseColumn#updateOrCreate
         * @methodOf lbServices.DatabaseColumn
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `DatabaseColumn` object.)
         * </em>
         */
        "updateOrCreate": {
          url: wsUrlBase + "/DatabaseColumns",
          method: "PUT",
        },
        /**
         * @ngdoc method
         * @name lbServices.DatabaseColumn#exists
         * @methodOf lbServices.DatabaseColumn
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{*=}` -
         */
        "exists": {
          url: wsUrlBase + "/DatabaseColumns/:id/exists",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.DatabaseColumn#findById
         * @methodOf lbServices.DatabaseColumn
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `DatabaseColumn` object.)
         * </em>
         */
        "findById": {
          url: wsUrlBase + "/DatabaseColumns/:id",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.DatabaseColumn#find
         * @methodOf lbServices.DatabaseColumn
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `DatabaseColumn` object.)
         * </em>
         */
        "find": {
          url: wsUrlBase + "/DatabaseColumns",
          method: "GET",
          isArray: true,
        },
        /**
         * @ngdoc method
         * @name lbServices.DatabaseColumn#findOne
         * @methodOf lbServices.DatabaseColumn
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `DatabaseColumn` object.)
         * </em>
         */
        "findOne": {
          url: wsUrlBase + "/DatabaseColumns/findOne",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.DatabaseColumn#destroyById
         * @methodOf lbServices.DatabaseColumn
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "destroyById": {
          url: wsUrlBase + "/DatabaseColumns/:id",
          method: "DELETE",
        },
        /**
         * @ngdoc method
         * @name lbServices.DatabaseColumn#count
         * @methodOf lbServices.DatabaseColumn
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        "count": {
          url: wsUrlBase + "/DatabaseColumns/count",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.DatabaseColumn#prototype$updateAttributes
         * @methodOf lbServices.DatabaseColumn
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `DatabaseColumn` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: wsUrlBase + "/DatabaseColumns/:id",
          method: "PUT",
        },
      }
    );
  }]);

/**
 * @ngdoc object
 * @name lbServices.PropertyValidation
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `PropertyValidation` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "PropertyValidation",
  ['LoopBackResource', 'LoopBackAuth', function(Resource, LoopBackAuth) {
    return Resource(
      wsUrlBase + "/PropertyValidations/:id",
      { 'id': '@id' },
      {
        /**
         * @ngdoc method
         * @name lbServices.PropertyValidation#create
         * @methodOf lbServices.PropertyValidation
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PropertyValidation` object.)
         * </em>
         */
        "create": {
          url: wsUrlBase + "/PropertyValidations",
          method: "POST",
        },
        /**
         * @ngdoc method
         * @name lbServices.PropertyValidation#updateOrCreate
         * @methodOf lbServices.PropertyValidation
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PropertyValidation` object.)
         * </em>
         */
        "updateOrCreate": {
          url: wsUrlBase + "/PropertyValidations",
          method: "PUT",
        },
        /**
         * @ngdoc method
         * @name lbServices.PropertyValidation#exists
         * @methodOf lbServices.PropertyValidation
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{*=}` -
         */
        "exists": {
          url: wsUrlBase + "/PropertyValidations/:id/exists",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.PropertyValidation#findById
         * @methodOf lbServices.PropertyValidation
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PropertyValidation` object.)
         * </em>
         */
        "findById": {
          url: wsUrlBase + "/PropertyValidations/:id",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.PropertyValidation#find
         * @methodOf lbServices.PropertyValidation
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PropertyValidation` object.)
         * </em>
         */
        "find": {
          url: wsUrlBase + "/PropertyValidations",
          method: "GET",
          isArray: true,
        },
        /**
         * @ngdoc method
         * @name lbServices.PropertyValidation#findOne
         * @methodOf lbServices.PropertyValidation
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PropertyValidation` object.)
         * </em>
         */
        "findOne": {
          url: wsUrlBase + "/PropertyValidations/findOne",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.PropertyValidation#destroyById
         * @methodOf lbServices.PropertyValidation
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "destroyById": {
          url: wsUrlBase + "/PropertyValidations/:id",
          method: "DELETE",
        },
        /**
         * @ngdoc method
         * @name lbServices.PropertyValidation#count
         * @methodOf lbServices.PropertyValidation
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        "count": {
          url: wsUrlBase + "/PropertyValidations/count",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.PropertyValidation#prototype$updateAttributes
         * @methodOf lbServices.PropertyValidation
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PropertyValidation` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: wsUrlBase + "/PropertyValidations/:id",
          method: "PUT",
        },
      }
    );
  }]);

/**
 * @ngdoc object
 * @name lbServices.ViewDefinition
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `ViewDefinition` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "ViewDefinition",
  ['LoopBackResource', 'LoopBackAuth', function(Resource, LoopBackAuth) {
    return Resource(
      wsUrlBase + "/ViewDefinitions/:id",
      { 'id': '@id' },
      {
        /**
         * @ngdoc method
         * @name lbServices.ViewDefinition#create
         * @methodOf lbServices.ViewDefinition
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ViewDefinition` object.)
         * </em>
         */
        "create": {
          url: wsUrlBase + "/ViewDefinitions",
          method: "POST",
        },
        /**
         * @ngdoc method
         * @name lbServices.ViewDefinition#updateOrCreate
         * @methodOf lbServices.ViewDefinition
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ViewDefinition` object.)
         * </em>
         */
        "updateOrCreate": {
          url: wsUrlBase + "/ViewDefinitions",
          method: "PUT",
        },
        /**
         * @ngdoc method
         * @name lbServices.ViewDefinition#exists
         * @methodOf lbServices.ViewDefinition
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{*=}` -
         */
        "exists": {
          url: wsUrlBase + "/ViewDefinitions/:id/exists",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.ViewDefinition#findById
         * @methodOf lbServices.ViewDefinition
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ViewDefinition` object.)
         * </em>
         */
        "findById": {
          url: wsUrlBase + "/ViewDefinitions/:id",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.ViewDefinition#find
         * @methodOf lbServices.ViewDefinition
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ViewDefinition` object.)
         * </em>
         */
        "find": {
          url: wsUrlBase + "/ViewDefinitions",
          method: "GET",
          isArray: true,
        },
        /**
         * @ngdoc method
         * @name lbServices.ViewDefinition#findOne
         * @methodOf lbServices.ViewDefinition
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ViewDefinition` object.)
         * </em>
         */
        "findOne": {
          url: wsUrlBase + "/ViewDefinitions/findOne",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.ViewDefinition#destroyById
         * @methodOf lbServices.ViewDefinition
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "destroyById": {
          url: wsUrlBase + "/ViewDefinitions/:id",
          method: "DELETE",
        },
        /**
         * @ngdoc method
         * @name lbServices.ViewDefinition#count
         * @methodOf lbServices.ViewDefinition
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        "count": {
          url: wsUrlBase + "/ViewDefinitions/count",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.ViewDefinition#prototype$updateAttributes
         * @methodOf lbServices.ViewDefinition
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ViewDefinition` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: wsUrlBase + "/ViewDefinitions/:id",
          method: "PUT",
        },
        /**
         * @ngdoc method
         * @name lbServices.ViewDefinition#prototype$__get__children
         * @methodOf lbServices.ViewDefinition
         *
         * @description
         *
         * Queries children of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` -
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ViewDefinition` object.)
         * </em>
         */
        "prototype$__get__children": {
          url: wsUrlBase + "/ViewDefinitions/:id/children",
          method: "GET",
          isArray: true,
        },
        /**
         * @ngdoc method
         * @name lbServices.ViewDefinition#prototype$__create__children
         * @methodOf lbServices.ViewDefinition
         *
         * @description
         *
         * Creates a new instance in children of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ViewDefinition` object.)
         * </em>
         */
        "prototype$__create__children": {
          url: wsUrlBase + "/ViewDefinitions/:id/children",
          method: "POST",
        },
        /**
         * @ngdoc method
         * @name lbServices.ViewDefinition#prototype$__delete__children
         * @methodOf lbServices.ViewDefinition
         *
         * @description
         *
         * Deletes all children of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ViewDefinition` object.)
         * </em>
         */
        "prototype$__delete__children": {
          url: wsUrlBase + "/ViewDefinitions/:id/children",
          method: "DELETE",
        },
      }
    );
  }]);

/**
 * @ngdoc object
 * @name lbServices.DataSourceDefinition
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `DataSourceDefinition` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "DataSourceDefinition",
  ['LoopBackResource', 'LoopBackAuth', function(Resource, LoopBackAuth) {
    return Resource(
      wsUrlBase + "/DataSourceDefinitions/:id",
      { 'id': '@id' },
      {
        /**
         * @ngdoc method
         * @name lbServices.DataSourceDefinition#create
         * @methodOf lbServices.DataSourceDefinition
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `DataSourceDefinition` object.)
         * </em>
         */
        "create": {
          url: wsUrlBase + "/DataSourceDefinitions",
          method: "POST",
        },
        /**
         * @ngdoc method
         * @name lbServices.DataSourceDefinition#updateOrCreate
         * @methodOf lbServices.DataSourceDefinition
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `DataSourceDefinition` object.)
         * </em>
         */
        "updateOrCreate": {
          url: wsUrlBase + "/DataSourceDefinitions",
          method: "PUT",
        },
        /**
         * @ngdoc method
         * @name lbServices.DataSourceDefinition#exists
         * @methodOf lbServices.DataSourceDefinition
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{*=}` -
         */
        "exists": {
          url: wsUrlBase + "/DataSourceDefinitions/:id/exists",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.DataSourceDefinition#findById
         * @methodOf lbServices.DataSourceDefinition
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `DataSourceDefinition` object.)
         * </em>
         */
        "findById": {
          url: wsUrlBase + "/DataSourceDefinitions/:id",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.DataSourceDefinition#find
         * @methodOf lbServices.DataSourceDefinition
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `DataSourceDefinition` object.)
         * </em>
         */
        "find": {
          url: wsUrlBase + "/DataSourceDefinitions",
          method: "GET",
          isArray: true,
        },
        /**
         * @ngdoc method
         * @name lbServices.DataSourceDefinition#findOne
         * @methodOf lbServices.DataSourceDefinition
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `DataSourceDefinition` object.)
         * </em>
         */
        "findOne": {
          url: wsUrlBase + "/DataSourceDefinitions/findOne",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.DataSourceDefinition#destroyById
         * @methodOf lbServices.DataSourceDefinition
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "destroyById": {
          url: wsUrlBase + "/DataSourceDefinitions/:id",
          method: "DELETE",
        },
        /**
         * @ngdoc method
         * @name lbServices.DataSourceDefinition#count
         * @methodOf lbServices.DataSourceDefinition
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        "count": {
          url: wsUrlBase + "/DataSourceDefinitions/count",
          method: "GET",
        },
        /**
         * @ngdoc method
         * @name lbServices.DataSourceDefinition#prototype$updateAttributes
         * @methodOf lbServices.DataSourceDefinition
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `DataSourceDefinition` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: wsUrlBase + "/DataSourceDefinitions/:id",
          method: "PUT",
        },
        /**
         * @ngdoc method
         * @name lbServices.DataSourceDefinition#prototype$__get__models
         * @methodOf lbServices.DataSourceDefinition
         *
         * @description
         *
         * Queries models of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` -
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `DataSourceDefinition` object.)
         * </em>
         */
        "prototype$__get__models": {
          url: wsUrlBase + "/DataSourceDefinitions/:id/models",
          method: "GET",
          isArray: true,
        },
        /**
         * @ngdoc method
         * @name lbServices.DataSourceDefinition#prototype$__create__models
         * @methodOf lbServices.DataSourceDefinition
         *
         * @description
         *
         * Creates a new instance in models of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `DataSourceDefinition` object.)
         * </em>
         */
        "prototype$__create__models": {
          url: wsUrlBase + "/DataSourceDefinitions/:id/models",
          method: "POST",
        },
        /**
         * @ngdoc method
         * @name lbServices.DataSourceDefinition#prototype$__delete__models
         * @methodOf lbServices.DataSourceDefinition
         *
         * @description
         *
         * Deletes all models of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `DataSourceDefinition` object.)
         * </em>
         */
        "prototype$__delete__models": {
          url: wsUrlBase + "/DataSourceDefinitions/:id/models",
          method: "DELETE",
        },
        /**
         * @ngdoc method
         * @name lbServices.DataSourceDefinition#prototype$__get__component
         * @methodOf lbServices.DataSourceDefinition
         *
         * @description
         *
         * Fetches belongsTo relation component
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `refresh` – `{boolean=}` -
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `DataSourceDefinition` object.)
         * </em>
         */
        "prototype$__get__component": {
          url: wsUrlBase + "/DataSourceDefinitions/:id/component",
          method: "GET",
        },
      }
    );
  }]);


module
  .factory('LoopBackAuth', function() {
    var props = ['accessTokenId', 'currentUserId'];

    function LoopBackAuth() {
      var self = this;
      props.forEach(function(name) {
        self[name] = load(name);
      });
      this.rememberMe = undefined;
    }

    LoopBackAuth.prototype.save = function() {
      var self = this;
      var storage = this.rememberMe ? localStorage : sessionStorage;
      props.forEach(function(name) {
        save(storage, name, self[name]);
      });
    };

    return new LoopBackAuth();

    // Note: LocalStorage converts the value to string
    // We are using empty string as a marker for null/undefined values.
    function save(storage, name, value) {
      var key = '$LoopBack$' + name;
      if (value == null) value = '';
      storage[key] = value;
    }

    function load(name) {
      var key = '$LoopBack$' + name;
      return localStorage[key] || sessionStorage[key] || null;
    }
  })
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('LoopBackAuthRequestInterceptor');
  })
  .factory('LoopBackAuthRequestInterceptor', [ '$q', 'LoopBackAuth',
    function($q, LoopBackAuth) {
      return {
        'request': function(config) {
          if (LoopBackAuth.accessTokenId) {
            config.headers.authorization = LoopBackAuth.accessTokenId;
          } else if (config.__isGetCurrentUser__) {
            // Return a stub 401 error for User.getCurrent() when
            // there is no user logged in
            var res = {
              body: { error: { status: 401 } },
              status: 401,
              config: config,
              headers: function() { return undefined; }
            };
            return $q.reject(res);
          }
          return config || $q.when(config);
        }
      }
    }])
  .factory('LoopBackResource', [ '$resource', function($resource) {
    return function(url, params, actions) {
      var resource = $resource(url, params, actions);

      // Angular always calls POST on $save()
      // This hack is based on
      // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
      resource.prototype.$save = function(success, error) {
        // Fortunately, LoopBack provides a convenient `upsert` method
        // that exactly fits our needs.
        var result = resource.upsert.call(this, {}, this, success, error);
        return result.$promise || result;
      }

      return resource;
    };
  }]);