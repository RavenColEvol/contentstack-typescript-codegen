import { generateTypes } from "../src/main";

const content_types = [
  {
    uid: "blog_post",
    schema: [
      {
        data_type: "text",
        display_name: "Title",
        field_metadata: {
          _default: true,
          version: 3,
        },
        mandatory: true,
        uid: "title",
        unique: true,
        multiple: false,
        non_localizable: false,
      },
      {
        data_type: "text",
        display_name: "URL",
        uid: "url",
        field_metadata: {
          _default: true,
          version: 3,
        },
        multiple: false,
        unique: false,
        mandatory: true,
        non_localizable: false,
      },
      {
        data_type: "text",
        display_name: "Multi Line Textbox",
        uid: "multi_line",
        field_metadata: {
          description: "",
          default_value: "",
          multiline: true,
          version: 3,
        },
        format: "",
        error_messages: {
          format: "",
        },
        mandatory: false,
        multiple: false,
        non_localizable: false,
        unique: false,
      },
      {
        data_type: "text",
        display_name: "Rich Text Editor",
        uid: "rich_text_editor",
        field_metadata: {
          allow_rich_text: true,
          description: "",
          multiline: false,
          rich_text_type: "advanced",
          options: [],
          version: 3,
        },
        mandatory: false,
        multiple: false,
        non_localizable: false,
        unique: false,
      },
      {
        data_type: "json",
        display_name: "JSON Rich Text Editor",
        uid: "json_rte",
        field_metadata: {
          allow_json_rte: true,
          embed_entry: false,
          description: "",
          default_value: "",
          multiline: false,
          rich_text_type: "advanced",
          options: [],
        },
        format: "",
        error_messages: {
          format: "",
        },
        reference_to: ["sys_assets"],
        multiple: false,
        non_localizable: false,
        unique: false,
        mandatory: false,
      },
      {
        data_type: "text",
        display_name: "Markdown",
        uid: "markdown",
        field_metadata: {
          description: "",
          markdown: true,
          version: 3,
        },
        mandatory: false,
        multiple: false,
        non_localizable: false,
        unique: false,
      },
      {
        data_type: "text",
        display_name: "Select",
        display_type: "dropdown",
        enum: {
          advanced: false,
          choices: [
            {
              value: "temp",
            },
          ],
        },
        multiple: false,
        uid: "select",
        field_metadata: {
          description: "",
          default_value: "",
          version: 3,
        },
        mandatory: false,
        non_localizable: false,
        unique: false,
      },
      {
        data_type: "number",
        display_name: "Number",
        uid: "number",
        field_metadata: {
          description: "",
          default_value: "",
        },
        mandatory: false,
        multiple: false,
        non_localizable: false,
        unique: false,
      },
      {
        data_type: "boolean",
        display_name: "Boolean",
        uid: "boolean",
        field_metadata: {
          description: "",
          default_value: false,
        },
        mandatory: false,
        multiple: false,
        non_localizable: false,
        unique: false,
      },
      {
        data_type: "isodate",
        display_name: "Date",
        uid: "date",
        startDate: null,
        endDate: null,
        field_metadata: {
          description: "",
          default_value: {},
        },
        mandatory: false,
        multiple: false,
        non_localizable: false,
        unique: false,
      },
      {
        data_type: "file",
        display_name: "File",
        uid: "file",
        extensions: [],
        field_metadata: {
          description: "",
          rich_text_type: "standard",
        },
        mandatory: false,
        multiple: false,
        non_localizable: false,
        unique: false,
      },
      {
        data_type: "link",
        display_name: "Link",
        uid: "link",
        field_metadata: {
          description: "",
          default_value: {
            title: "",
            url: "",
          },
        },
        mandatory: false,
        multiple: false,
        non_localizable: false,
        unique: false,
      },
      {
        display_name: "Custom",
        extension_uid: "blt0454904992f5f991",
        field_metadata: {
          extension: true,
        },
        uid: "custom",
        mandatory: false,
        non_localizable: false,
        unique: false,
        config: {},
        data_type: "json",
        multiple: false,
      },
      {
        data_type: "blocks",
        display_name: "Modular Blocks",
        blocks: [
          {
            title: "temp",
            uid: "temp",
            schema: [
              {
                data_type: "text",
                display_name: "Single Line Textbox",
                uid: "single_line",
                field_metadata: {
                  description: "",
                  default_value: "",
                  version: 3,
                },
                format: "",
                error_messages: {
                  format: "",
                },
                mandatory: false,
                multiple: false,
                non_localizable: false,
                unique: false,
              },
            ],
          },
        ],
        multiple: true,
        uid: "modular_blocks",
        field_metadata: {
          instruction: "",
          description: "",
        },
        mandatory: false,
        non_localizable: false,
        unique: false,
      },
      {
        data_type: "reference",
        display_name: "Reference",
        reference_to: ["blog_post", "rtessss", "test", "test2"],
        field_metadata: {
          ref_multiple: false,
          ref_multiple_content_types: true,
        },
        uid: "reference",
        mandatory: false,
        multiple: false,
        non_localizable: false,
        unique: false,
      },
      {
        data_type: "group",
        display_name: "Group",
        field_metadata: {
          description: "",
          instruction: "",
        },
        schema: [
          {
            data_type: "text",
            display_name: "Single Line Textbox",
            uid: "single_line",
            field_metadata: {
              description: "",
              default_value: "",
              version: 3,
            },
            format: "",
            error_messages: {
              format: "",
            },
            mandatory: false,
            multiple: false,
            non_localizable: false,
            unique: false,
          },
        ],
        uid: "group",
        mandatory: false,
        multiple: false,
        non_localizable: false,
        unique: false,
      },
    ],
  },
];

describe("TypesGenerator", () => {
  it("should be able to add content types", async () => {
    const typeFiles = await generateTypes(content_types);
    for(const file of typeFiles) {
      const { name, content } = file;
      console.log(content);
    }
  });
});
