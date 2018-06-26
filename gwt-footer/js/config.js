require.config({
  paths: {
    "jquery": "../vendor/jquery/dist/jquery.min",
    "underscore": "../vendor/underscore/underscore",
    "text": "../vendor/requirejs-text/text",
    "markdown": "../vendor/markdown/lib/markdown",
    "iframeResizer": "iframeResizer.min.js"
  },
  shim: {
    "jquery": {
      exports: "$"
    },
    "underscore": {
      exports: "_"
    },
    "markdown": {
      exports: "markdown"
    }
  }
})