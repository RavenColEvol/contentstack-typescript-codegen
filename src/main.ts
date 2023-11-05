import * as prettier from "prettier";
import { renderFieldType, renderFields, renderImports, renderInterface, renderUnion } from "./renderUtils";
import { getFieldsName, getTypeFileName } from "./utils";

export async function generateTypes(content_types) {
  const files = [];
  for (const content_type of content_types) {
    const { uid } = content_type;

    files.push({
      name: `${getTypeFileName(uid)}.ts`,
      content: await prettier.format(generateType(content_type), {
        parser: 'typescript'
      }),
    });
  }
  return files;
}

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
    reference: (field) => {
      const { reference_to } = field;
      const union = [];
      reference_to.forEach(ref => {
        const file = getTypeFileName(ref);
        const typeName = getFieldsName(ref);

        union.push(typeName);
        if(!imports[file] && uid !== ref) {
          imports[file] = [typeName];
        }
      });
      return renderUnion(union);
    },
    group: (field) => {
      const { schema } = field;
      const fieldTypes = traveller(schema);
      return renderFields({ fields: fieldTypes });
    },
    blocks: (field) => {
      const { blocks } = field;
      const union = [];
      blocks.forEach(block => {
        const { uid, schema } = block;
        const fieldTypes = traveller(schema);
        const type = renderFields({fields: fieldTypes})
        union.push(`{${uid}:${type}}`);
      })
      return renderUnion(union);
    }
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
