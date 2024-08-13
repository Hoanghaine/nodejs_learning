const Handlebars = require("handlebars");

module.exports = {
  sum(a, b) {
    return a + b;
  },
  sortable(field, sort) {
    const sortType = field === sort.column ? sort.type : "default";

    const icons = {
      default: "fa-solid fa-sort",
      desc: "fa-solid fa-arrow-down-z-a",
      asc: "fa-solid fa-arrow-up-z-a",
    };
    const types = {
      default: "asc",
      desc: "asc",
      asc: "desc",
    };
    const type = types[sortType];
    const icon = icons[sortType];

    const href = Handlebars.escapeExpression(
      `?_sort&column=${field}&type=${type}`
    );
    const output = `<a href="${href}">
      <i class="fas ${icon}"></i>`;

    return new Handlebars.SafeString(output);
  },
};
