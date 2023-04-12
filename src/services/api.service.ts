interface ApiRequestParams {
    endpoint: string;
    token: Promise<string>;
}

interface ApiResponse<T> {
    data: Array<T> | null;
    error: unknown;
}

async function apiCall<T>(params : ApiRequestParams) : Promise<ApiResponse<T>> {
  try {
    const token = await params.token;
    const response = await fetch(`${process.env.VUE_APP_API_SERVER_URL}/api/${params.endpoint}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then((body) => JSON.parse(body.data));
    return {
      data: response,
      error: null,
    };
  } catch (error : unknown) {
    return {
      data: null,
      error,
    };
  }
}

export default apiCall;
