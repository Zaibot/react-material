import Spring from './spring';

// tslint:disable

export default {
  Spring100: Spring.generic(0, 0, 0, 1, 100),
  Spring150: Spring.generic(0, 0, 0, 1, 150),
  Spring200: Spring.generic(0, 0, 0, 1, 200),
  Spring300: Spring.generic(0, 0, 0, 1, 300),
  Spring500: Spring.generic(0, 0, 0, 1, 500),
  Spring1000: Spring.flex(0, 0, 0, 1, 600, 2),
};
