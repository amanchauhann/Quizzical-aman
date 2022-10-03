export function setSessionStorage(key, data) {
  const oldData = getSessionStorage(key);

  const newData = {
    ...oldData,
    ...data,
  };

  sessionStorage.setItem(key, JSON.stringify(newData));
}

export function getSessionStorage(key) {
  const data = JSON.parse(sessionStorage.getItem(key)) || {};
  return data;
}

export function removeSessionStorage(key) {
  sessionStorage.removeItem(key);
}
