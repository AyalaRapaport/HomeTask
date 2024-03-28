// const nodeExternals = require('webpack-node-externals');

// module.exports = {
//   target: 'node', // Indicates to Webpack this is a Node.js project
//   externals: [nodeExternals()], // Exclude Node.js core modules
// };

// module.exports = {
//     // קונפיגורציה אחרת שלך
//     resolve: {
//       fallback: {
//         "fs": false, // אם לא נדרש, ניתן לשים אל false
//         "path": require.resolve("path-browserify")
//       }
//     }
//   };
const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  target: 'node', // Indicates to Webpack this is a Node.js project
  externals: [nodeExternals()], // Exclude Node.js core modules
  resolve: {
    fallback: {
      "fs": false, // Set to false to avoid bundling fs
      "path": require.resolve("path-browserify") // Use path-browserify instead of the native path
    }
  }
};
