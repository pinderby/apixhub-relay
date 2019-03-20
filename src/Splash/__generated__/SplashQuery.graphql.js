/**
 * @flow
 * @relayHash f371d84f5dd0004d9a3ee0b60478fce2
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type TestChild_repo$ref = any;
export type SplashQueryVariables = {||};
export type SplashQueryResponse = {|
  +repo: ?{|
    +id: string,
    +$fragmentRefs: TestChild_repo$ref,
  |}
|};
export type SplashQuery = {|
  variables: SplashQueryVariables,
  response: SplashQueryResponse,
|};
*/


/*
query SplashQuery {
  repo(username: "gweeks", reponame: "IMDB") {
    id
    ...TestChild_repo
  }
}

fragment TestChild_repo on Repo {
  name
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "reponame",
    "value": "IMDB",
    "type": "String!"
  },
  {
    "kind": "Literal",
    "name": "username",
    "value": "gweeks",
    "type": "String!"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "SplashQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "repo",
        "storageKey": "repo(reponame:\"IMDB\",username:\"gweeks\")",
        "args": (v0/*: any*/),
        "concreteType": "Repo",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "kind": "FragmentSpread",
            "name": "TestChild_repo",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "SplashQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "repo",
        "storageKey": "repo(reponame:\"IMDB\",username:\"gweeks\")",
        "args": (v0/*: any*/),
        "concreteType": "Repo",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "name",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "SplashQuery",
    "id": null,
    "text": "query SplashQuery {\n  repo(username: \"gweeks\", reponame: \"IMDB\") {\n    id\n    ...TestChild_repo\n  }\n}\n\nfragment TestChild_repo on Repo {\n  name\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'dc4b44cf91d25f907fc0a1cc8b3423b2';
module.exports = node;
