"use strict";

/* global __PATH_PREFIX__ */
// Taken from https://github.com/netlify/netlify-identity-widget
var routes = /(confirmation|invite|recovery|email_change)_token=([^&]+)/;
var errorRoute = /error=access_denied&error_description=403/;
var accessTokenRoute = /access_token=/;

exports.onInitialClientRender = function (_, _ref) {
  var _ref$enableIdentityWi = _ref.enableIdentityWidget,
      enableIdentityWidget = _ref$enableIdentityWi === void 0 ? true : _ref$enableIdentityWi,
      _ref$publicPath = _ref.publicPath,
      publicPath = _ref$publicPath === void 0 ? "admin" : _ref$publicPath;
  var hash = (document.location.hash || "").replace(/^#\/?/, "");

  if (enableIdentityWidget && (hash.match(routes) || hash.match(errorRoute) || hash.match(accessTokenRoute))) {
    import("netlify-identity-widget").then(function (_ref2) {
      var netlifyIdentityWidget = _ref2.default;
      netlifyIdentityWidget.on("init", function (user) {
        if (!user) {
          netlifyIdentityWidget.on("login", function () {
            document.location.href = __PATH_PREFIX__ + "/" + publicPath + "/";
          });
        }
      });
      netlifyIdentityWidget.init();
    });
  }
};