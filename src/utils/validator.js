export const CONSTRAINTS = {
  SIGN_IN: {
    email: {
      email: true,
    },
    password: {
      length: {minimum: 6},
    },
  },
  SIGN_UP: {
    username: {
      length: {minimum: 6},
    },
    email: {
      email: true,
    },
    password: {
      length: {minimum: 6},
    },
    confirmationPassword: {
      equality: 'password',
    },
  },
};
