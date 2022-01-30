import { LintStagedConfig } from './config/config.interface';
import { isPrettierInstalled } from '../prettier/prettier.utils';
import { addHook, isHuskyInstalled } from '../husky/husky.utils';
import { CLI_NAME } from './lint-staged.const';
import { CLI_NAME as PRETTIER_CLI_NAME } from '../prettier/prettier.const';
import { isJestInstalled } from '../jest/jest.utils';
import { isEslintInstalled } from '../eslint/eslint.utils';

type ScriptFileExtension = '*.js' | '*.ts';

interface OptionMutation {
  check: (config: LintStagedConfig, key: string, value: string) => boolean;
  mutate: (config: LintStagedConfig, key: string, value: string) => void;
}

const arrayOptionMutation: OptionMutation = {
  check: (config, key) => Array.isArray(config[key]),
  mutate: (config, key, value) => {
    config[key] = Array.from(new Set([...(config[key] as unknown[]), value]));
  },
};

const stringOptionMutation: OptionMutation = {
  check: (config, key) => typeof config[key] === 'string',
  mutate: (config, key, value) => {
    const array = Array.from(new Set([config[key], value]));
    config[key] = array.length === 1 ? array[0] : array;
  },
};

const undefinedOptionMutation: OptionMutation = {
  check: (config, key) => typeof config[key] === 'undefined',
  mutate: (config, key, value) => {
    config[key] = value;
  },
};

const optionMutations: OptionMutation[] = [arrayOptionMutation, stringOptionMutation, undefinedOptionMutation];

export const addOptionToLintStagedConfig = (config: LintStagedConfig, key: string, value: string) => {
  const finded = optionMutations.find(({ check }) => check(config, key, value));

  if (!finded) {
    throw new Error('option mutator is not found!');
  }

  finded.mutate(config, key, value);
};

export const huskyIntegration = async () => {
  if (await isHuskyInstalled()) {
    await addHook('pre-commit', `npx --no-install ${CLI_NAME}`);
  }
};

export const jestMutation = (fileExtension: ScriptFileExtension) => async (config: LintStagedConfig) => {
  if (await isJestInstalled()) {
    addOptionToLintStagedConfig(config, fileExtension, 'jest --findRelatedTests');
  }
};

export const eslintMutation = (fileExtension: ScriptFileExtension) => async (config: LintStagedConfig) => {
  if (await isEslintInstalled()) {
    addOptionToLintStagedConfig(config, fileExtension, 'eslint --fix');
  }
};

export const prettierMutation = async (config: LintStagedConfig) => {
  if (await isPrettierInstalled()) {
    addOptionToLintStagedConfig(config, '*.{js,json,yml,md}', `${PRETTIER_CLI_NAME} --write`);
  }
};
