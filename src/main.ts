import { getFieldsName, getTypeFileName } from "./utils";

export function generateTypes(content_types) {
  const files = [];
  for (const content_type of content_types) {
    const { uid } = content_type;

    files.push({
      name: `${getTypeFileName(uid)}.ts`,
      content: generateType(content_type),
    });
  }
  return files;
}

const renderImports = (imports: Record<string, string[]>) => {
  const fileImports = Object.entries(imports);
  return fileImports
    .map(
      ([name, imports]) => `import { ${imports.join(", ")} } from './${name}'`
    )
    .join("\n");
};

const renderFields = ({ fields }) => {
  return `{\n${fields.join("\t\n")}\n}`;
};

const renderFieldType = ({ field, type }) => {
  const { uid, mandatory, multiple } = field;
  return [
    uid,
    mandatory ? '' : '?',
    ':',
    type,
    multiple ? '[]': '',
    ';'
  ].join('');
}

const renderInterface = ({ name, fields }) => {
  return [
    `export interface ${name} extends Entry `,
    renderFields({ fields }),
  ].join("");
};

function generateType(content_type) {
  const { uid, schema } = content_type;

  const imports: Record<string, string[]> = {
    baseTypes: ["Entry"],
  };

  const visitors = {
    text: () => "string",
    isodate: () => "string",
    number: () => "number",
    boolean: () => "boolean",
    file: () => {
      const type = "File";
      if (!imports["baseTypes"].includes(type)) {
        imports["baseTypes"].push(type);
      }
      return type;
    },
    link: () => {
      const type = "Link";
      if (!imports["baseTypes"].includes(type)) {
        imports["baseTypes"].push(type);
      }
      return type;
    },
    json: (field) => {
      const isJsonRTE = field.field_metadata?.allow_json_rte;
      if (!isJsonRTE) return "object";

      const type = "RTE";
      if (!imports["baseTypes"].includes(type)) {
        imports["baseTypes"].push(type);
      }
      return type;
    },
  };

  const traveller = (schema) => {
    if (!Array.isArray(schema)) return;

    const types = [];

    schema.forEach((field) => {
      const { data_type } = field;
      if (data_type in visitors) {
        const type = visitors[data_type](field);
        types.push(renderFieldType({
          field, type
        }));
      }
    });

    return types;
  };

  const fields = traveller(schema);

  return [
    renderImports(imports),
    renderInterface({ name: getFieldsName(uid), fields }),
  ].join("\n\n");
}
