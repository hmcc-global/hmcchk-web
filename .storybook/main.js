

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-a11y"
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  staticDirs: ["../ui/public"],
  webpackFinal: async (config) => {
    const path = await import('path');
    const { fileURLToPath } = await import('url');
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    
    // Add module resolution for ui directory
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve(__dirname, '../ui/node_modules'),
      path.resolve(__dirname, '../node_modules'),
      'node_modules'
    ];

    // Add alias for easier imports and force single React instance
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../ui/src'),
      'react': path.resolve(__dirname, '../node_modules/react'),
      'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
    };

    // Add Babel loader for JSX files
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-transform-runtime']
        }
      }
    });

    return config;
  },
};

export default config;