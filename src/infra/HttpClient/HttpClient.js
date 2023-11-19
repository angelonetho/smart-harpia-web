//Arquitetura Hexagonal
//Ports & Adapters

export async function HttpClient(fetchUrl, fetchOptions) {
  const options = {
    ...fetchOptions,
    headers: {
      ...fetchOptions.headers,
      "Content-Type": "application/json",
    },
    body: fetchOptions.body ? JSON.stringify(fetchOptions.body) : null,
  };

  return fetch(fetchUrl, options).then(async (respostaDoServidor) => {
    const responseWithoutBody = {
      ok: respostaDoServidor.ok,
      status: respostaDoServidor.status,
      statusText: respostaDoServidor.statusText,
    };

    if (respostaDoServidor.status !== 204) {
      responseWithoutBody.body = await respostaDoServidor.json();
    }

    return responseWithoutBody;
  });
}
