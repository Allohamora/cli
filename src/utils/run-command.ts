import { spawn } from 'child_process';
import { on } from 'events';

export const spawnCommand = async (command: string, args: string[]): Promise<string> => {
  return new Promise(async (res, rej) => {
    const child = spawn(command, args);
    let result = Buffer.alloc(0);

    child.on('error', (err) => rej(err));
    child.on('exit', () => res(result.toString('utf-8')));

    for await (const [chunk] of on(child.stdout, 'data')) {
      result = Buffer.concat([result, chunk]);
    }
  });
};

export const runCommand = async (command: string) => {
  const [name, ...args] = command.split(' ');

  return await spawnCommand(name, args);
};
