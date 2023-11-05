export const renderImports = (imports: Record<string, string[]>) => {
  const fileImports = Object.entries(imports);
  return fileImports
    .map(
      ([name, imports]) => `import { ${imports.join(", ")} } from './${name}'`
    )
    .join("\n");
};

export const renderFields = ({ fields }) => {
  return `{\n${fields.join("\t\n")}\n}`;
};

export const renderFieldType = ({ field, type }) => {
  const { uid, mandatory, multiple, field_metadata } = field;
  const { description } = field_metadata
  return [
    description ? `/* ${description} */\n` : '',
    uid,
    mandatory ? '' : '?',
    ':',
    type,
    multiple ? '[]': '',
    ';'
  ].join('');
}

export const renderInterface = ({ name, fields }) => {
  return [
    `export interface ${name} extends Entry `,
    renderFields({ fields }),
  ].join("");
};

export const renderUnion = (union) => {
  return `(${union.join('|')})`;
}