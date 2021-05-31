import path from "path";
import { readFile } from ".";
import ejs from "ejs";

export type Template = `password-reset` | `register-confirmation`;

export const htmlFromTemplate = async (template: Template, data: any) => {
  const fileName = `${template}.ejs`;

  try {
    const filePath = path.join(__dirname, `../../templates/${fileName}`);

    const templateFile = await readFile(filePath, {
      encoding: `utf-8`,
    });

    const template = ejs.render(templateFile, data);

    return template;
  } catch (err) {
    console.log({ error: err });

    return new Error(
      `=== TEMPLATE ERROR: Unable to find template specified, "${fileName}" ===`,
    );
  }
};
