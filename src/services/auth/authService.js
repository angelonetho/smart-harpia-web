import { HttpClient } from "../../infra/HttpClient/HttpClient";
import { tokenService } from "./tokenService";

export const authService = {
  async login({ email, password }) {
    return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sessions`, {
      method: "POST",
      body: { email, password },
    }).then(async (respostaDoServidor) => {
      if (respostaDoServidor.status !== 201)
        throw new Error("Usuário ou senha inválidos!");
      const body = respostaDoServidor.body;

      tokenService.save(body.token.token);
    });
  },

  async logout() {
    return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sessions`, {
      method: "DELETE",
    }).then(async (respostaDoServidor) => {
      if (!respostaDoServidor.ok)
        throw new Error("Usuário ou senha inválidos!");

      tokenService.delete();
    });
  },

  async handleCallback(token) {
    return HttpClient(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/sessions/google`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then(async (respostaDoServidor) => {
      if (respostaDoServidor.status !== 201) throw new Error("Token inválido!");
      const body = respostaDoServidor.body;

      tokenService.save(body.token.token);
    });
  },

  async getSession(ctx) {
    const token = tokenService.get(ctx);

    return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sessions`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (!response.ok) throw new Error("Não autorizado");
      return response.body;
    });
  },
};
