import { isPrettierInstalled } from '../prettier/prettier.utils';
import { Config } from './config/config.interface';

export const PACKAGE_NAME = 'eslint';
export const CONFIG_FILE_NAME = '.eslintrc.json';

export const prettierIntegrationHandler = async (config: Config) => {
  if (await isPrettierInstalled()) {
    addPrettierToConfig(config);
  }
};

export const addPrettierToConfig = (config: Config) => {
  const dependenciesSet = new Set([...config.dependencies, 'eslint-plugin-prettier', 'eslint-config-prettier']);
  const dependencies = Array.from(dependenciesSet);

  const eslintExtendsSet = new Set([...(config.eslintConfig.extends || []), 'plugin:prettier/recommended']);
  const eslintExtends = Array.from(eslintExtendsSet);

  config.dependencies = dependencies;
  config.eslintConfig.extends = eslintExtends;
};