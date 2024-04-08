const genRandString = (length) => {
  const charset = "abcdef0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }
  return result;
};

export const get25Rand = () => genRandString(25);
export const get64Rand = () => genRandString(64);

export const randParams = () => {
  const _params = {
    online_id: get25Rand(),
    login_id: get64Rand(),
    session: get64Rand(),
  };
  return new URLSearchParams(_params).toString();
};
