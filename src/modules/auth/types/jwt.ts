export type JwtPayload = {
  email: string;
  sub: number;
  iat?: number;
  exp?: number;
};

export type JwtPayloadRefresh = JwtPayload & { refreshToken: string };

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};
