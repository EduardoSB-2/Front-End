export function decodeToken(token: string) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch {
    return null;
  }
}

export function validateToken(token: string) {
  const payload = decodeToken(token);
  return payload && payload.role === "admin";
}
