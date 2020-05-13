module.exports = {
  purge: ["./src/**/*.js"],
  theme: {
    extend: {},
  },
  variants: {
    backgroundColor: ["group-hover", "hover"],
    borderColor: ["first", "last", "hover", "focus"],
    borderWidth: ["first", "hover", "focus", "last"],
    display: ["group-hover"],
    maxWidth: ["responsive"],
    padding: ["first", "last"],
  },
  plugins: [],
};
