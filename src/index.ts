import { program } from "commander";
import { Region, Stack } from "contentstack";
import { generateTypes } from "./main";
import path from 'path';
import { writeFileSync, readFileSync } from 'fs';
const chalk = require('chalk');

// takes api_key
program
  .name('cs-ts-generator')
  .description('CLI tool to generate types for contentstack entries.')
  .option('-a, --apiKey <api_key>', 'Stack API Key')
  .option('-t, --token <delivery_token>', 'Delivery Token')
  .option('-e, --environment <environment>', 'Environment')
  .option('-r, --region <region>', 'Region (na, eu)')
  .option('-o, --output <output_dir>', 'Output Directory')
  .parse(process.argv);

const options = program.opts();

const required = { apiKey: 'api key', token: 'delivery token', environment: 'environment'};
Object.entries(required).forEach(([key, name]) => {
  if (!options[key]) {
    console.log(
      chalk.red(`Please enter a valid ${name}.`)
    );
    process.exit(0);
  }
})

// should fetch content types details and should emit types
const { apiKey, token, environment, region = 'na', output = path.join(__dirname, 'types') } = options;
const regionMap = {
  'na': Region.US,
  'eu': Region.EU
};
const stack = new Stack({
  api_key: apiKey,
  environment,
  region: regionMap[region],
  delivery_token: token
});

const baseTypePath = path.join(__dirname, 'contentstack', 'type.ts');
(async () => {
  const { content_types } = await stack.getContentTypes({
    include_global_field_schema: true
  });
  const files = await generateTypes(content_types);
  files.push({
    name: 'baseTypes.ts',
    content: readFileSync(baseTypePath, 'utf-8')
  });
  files.forEach(file => {
    writeFileSync(path.join(output, file.name), file.content, 'utf-8');
  });
})();
// should have a TypesGenerator which takes content types as input and create whole file system for types