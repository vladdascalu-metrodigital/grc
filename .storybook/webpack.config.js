const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
    // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push(
        {
            test: /\.scss$/,
            loaders: ['style-loader', 'css-loader', 'sass-loader'],
            include: [path.resolve(__dirname, '../')],
        },
        {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            loaders: ['file-loader'],
            include: path.resolve(__dirname, '../src/asstes/fonts'),
        },
        {
            test: /\.modernizrrc.js$/,
            loader: ['modernizr-loader'],
        },
        {
            test: /\.modernizrrc(\.json)?$/,
            loader: ['modernizr-loader', 'json-loader'],
        }
    );

    config.resolve.alias = {
        modernizr$: path.resolve(__dirname, '../.modernizrrc'),
    };

    // config.module.rules.push({
    //     test: /\.(png|woff|woff2|eot|ttf|svg)$/,
    //     use: [
    //       {
    //         loader: 'file-loader',
    //         query: {
    //           name: '[name].[ext]'
    //         }
    //       }
    //     ],
    //     include: path.resolve(__dirname, '../')
    //   });

    // Return the altered config

    return config;
};
