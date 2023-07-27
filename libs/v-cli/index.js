#!/usr/bin/env node
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const tsImport = require('ts-import');
const globParent = require('glob-parent');
const argv = require('minimist')(process.argv.slice(2), { string: ['_'] });

const cli = async () => {
    const { _, ...restArgs } = argv;
    const [subject, ...commands] = _;
    const cwd = process.cwd();

    switch (subject) {
        case 'typeorm':
            const ormConfig = tsImport.loadSync(
                path.join(cwd, 'ormconfig.ts')
            ).default;

            if (!ormConfig) {
                throw new Error('Typeorm config not found');
            }

            const migrationDir = globParent(ormConfig.migrations[0]);

            if (commands[0] === 'migration:generate') {
                const { n, ...otherCommandArgs } = restArgs;
                if (!n) {
                    throw new Error('-n (name) is require');
                }
                const migrationFilePath = path.join(migrationDir, n);

                let createMigrationCommand = `node -r tsconfig-paths/register -r ts-node/register ./node_modules/typeorm/cli.js migration:generate ${migrationFilePath}`;
                for (const key in otherCommandArgs) {
                    if (Object.hasOwnProperty.call(otherCommandArgs, key)) {
                        const argValue = otherCommandArgs[key];
                        createMigrationCommand += ` -${key} ${argValue}`;
                    }
                }

                await exec(createMigrationCommand, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                    }

                    if (stdout) {
                        console.log(`stdout: ${stdout}`);
                    }

                    if (stderr) {
                        console.error(`stderr: ${stderr}`);
                    }
                });
            } else if (commands[0] === 'migration:run') {
                let createMigrationCommand = `node -r tsconfig-paths/register -r ts-node/register ./node_modules/typeorm/cli.js migration:run`;
                for (const key in restArgs) {
                    if (Object.hasOwnProperty.call(restArgs, key)) {
                        const argValue = restArgs[key];
                        createMigrationCommand += ` -${key} ${argValue}`;
                    }
                }

                await exec(createMigrationCommand, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                    }

                    if (stdout) {
                        console.log(`stdout: ${stdout}`);
                    }

                    if (stderr) {
                        console.error(`stderr: ${stderr}`);
                    }
                });
            }

            break;

        default:
            break;
    }
};

cli().catch(error => {
    console.error(error);
});
