require.config({
  paths: {
    "jquery": "../node_modules/jquery/dist/jquery.min",
    "text": "../node_modules/requirejs-text/text",
    "markdown": "../node_modules/markdown/lib/markdown",
    "underscore": "../node_modules/underscore/underscore"
  },
  shim: {
    "underscore": {
      exports: "_"
    },
    "jquery": {
      exports: "$"
    },
    "markdown": {
      exports: "markdown"
    }
  }
})