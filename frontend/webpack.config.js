import path from "path";
module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/i,
        type: "asset",
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
        use: ["@svgr/webpack"],
      },
    ],
    resolve: {
      alias: {
        "@product": path.resolve(__dirname, "backEnd/uploads/product"),
        "@user": path.resolve(__dirname, "../flowenBasic/uploads/product"),
        "@ui": path.resolve(__dirname, "./src/ui"),
      },
    },
  },
};
