export const isUsername = (username: string) => {
  if (username.length > 2 && username.length < 21) return true;
  return false;
};

export const isPassword = (password: string) => {
  if (password.length > 5 && password.length < 41) return true;
  return false;
};

export const isEmail = (email: string) => {
  if (
    email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  )
    return true;
  return false;
};

export const isUrl = (url: string) => {
  if (
    url
      .toLowerCase()
      .match(
        /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
      )
  )
    return true;
  return false;
};
