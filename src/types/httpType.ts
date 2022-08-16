export type methotType = "get" | "post" | "put" | "delete";
export type httpType = { method: methotType; url: string; data?: any };
