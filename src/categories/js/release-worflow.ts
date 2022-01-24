import { jsCategoryState } from 'src/libs/categories';
import { addGithubWorkflow } from 'src/libs/github';
import { prettyMultilineFormat } from 'src/libs/string';

const WORKFLOW_FILENAME = 'release.yml';

const content = prettyMultilineFormat`
  name: release

  on:
    push:
      tags:
        - "*.*.*"

  jobs:
    release:
      runs-on: ubuntu-latest
      steps:
        - name: Checkout code
          uses: actions/checkout@v2
        - name: Get release notes from CHANGELOG.md
          uses: yashanand1910/standard-release-notes@v1.2.1
          id: get_release_notes
          with:
            version: \${{ github.ref }}
        - name: Release to github
          uses: softprops/action-gh-release@v1
          with:
            body: \${{ steps.get_release_notes.outputs.release_notes }}

`;

const defaultConfig = {
  content,
};

const [getConfig] = jsCategoryState.useConfigState({
  default: defaultConfig,
});

export const releaseWorkflow = async () => {
  const { content } = getConfig();

  await addGithubWorkflow(WORKFLOW_FILENAME, content);
};
