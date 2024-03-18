export const getEnvKey = (key, fallback) => {
  return process.env[key] || (window._env_ || {})[key] || fallback;
};
