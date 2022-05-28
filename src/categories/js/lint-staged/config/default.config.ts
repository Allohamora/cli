import { eslintMutation, jestMutation, prettierMutation, stylelintMutation } from '../lint-staged.utils';
import { Config } from './config.interface';

export const defaultConfig: Config = {
  config: {},
  mutations: [prettierMutation, stylelintMutation, eslintMutation('*.js'), jestMutation('*.js')],
};
