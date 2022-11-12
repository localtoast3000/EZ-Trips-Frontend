// For React Native version 0.59 or later
var upstreamTransformer = require('metro-react-native-babel-transformer');
var postcssTransformer = require('react-native-postcss-transformer');
var postCSSExtensions = ['css', 'pcss']; // <-- Add other extensions if needed.

module.exports.transform = function ({ src, filename, options }) {
  if (postCSSExtensions.some((ext) => filename.endsWith('.' + ext))) {
    return postcssTransformer.transform({ src, filename, options });
  }
  return upstreamTransformer.transform({ src, filename, options });
};
