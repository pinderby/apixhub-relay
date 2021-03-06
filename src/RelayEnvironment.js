import { Environment, Network, RecordSource, Store } from 'relay-runtime'

const DEV_ENDPOINT = 'http://localhost:4567/graphql'
const PROD_ENDPOINT = 'https://apix.rocks'

const API_ENDPOINT = DEV_ENDPOINT

async function fetchQuery(operation, variables) {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  });
  return await response.json();
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
})

export default environment