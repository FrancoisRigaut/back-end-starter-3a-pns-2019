module.exports = {
  extends: 'airbnb-base',
  env: {
    jest: true,
    node: true,
  },
  rules: {
    'no-underscore-dangle': ['error', { 'allow': ['_id'] }],
    "linebreak-style": 0,
    "no-param-reassign": 0,
  }
};
