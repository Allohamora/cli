import * as fs from 'src/utils/fs';
import path from 'path';
import { addGithubDirIfNotExists, addGithubWorkflow, addWorkflowsDirIfNotExists } from 'src/utils/github';

const GITHUB_DIR_NAME = '.github';
const GITHUB_WORKFLOWS_DIR_NAME = 'workflows';
const GITHUB_RELATIVE_WORKFLOWS_PATH = path.join(GITHUB_DIR_NAME, GITHUB_WORKFLOWS_DIR_NAME);

jest.mock('src/utils/fs');
const fsMocked = jest.mocked(fs);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('addGithubDirIfNotExists', () => {
  test('should add .github dir to root if not exists', async () => {
    await addGithubDirIfNotExists();

    expect(fsMocked.addDirToRootIfNotExists).toBeCalledWith(GITHUB_DIR_NAME);
  });
});

describe('addWorkflowsDirIfNotExists', () => {
  test('should add .github/workflows to root if not exists', async () => {
    await addWorkflowsDirIfNotExists();

    expect(fsMocked.addDirToRootIfNotExists).toBeCalledWith(GITHUB_DIR_NAME);
    expect(fsMocked.addDirToRootIfNotExists).toBeCalledWith(GITHUB_RELATIVE_WORKFLOWS_PATH);
  });
});

describe('addGithubWorkflow', () => {
  const filename = 'test.yml';
  const content = '__test__';
  const filePath = path.join(GITHUB_RELATIVE_WORKFLOWS_PATH, filename);

  test('should create .github/workflows if not exists', async () => {
    await addGithubWorkflow(filename, content);

    expect(fsMocked.addDirToRootIfNotExists).toBeCalledWith(GITHUB_DIR_NAME);
    expect(fsMocked.addDirToRootIfNotExists).toBeCalledWith(GITHUB_RELATIVE_WORKFLOWS_PATH);
  });

  test(`should add workflow to ${GITHUB_RELATIVE_WORKFLOWS_PATH}`, async () => {
    await addGithubWorkflow(filename, content);

    expect(fsMocked.addFileToRoot).toBeCalledWith(filePath, content);
  });
});
