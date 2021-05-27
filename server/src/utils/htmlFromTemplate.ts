import path from "path";
import { readFile } from ".";
import ejs from "ejs";

type TemplatePath = `password-reset` | `register-confirmation`;

export const htmlFromTemplate = async (
  templatePath: TemplatePath,
): Promise<string> => {
  try {
    const filePath = path.join(
      __dirname,
      `../../templates/${templatePath}.ejs`,
    );

    console.log(filePath);

    const templateFile = await readFile(filePath, {
      encoding: `utf-8`,
    });

    const template = ejs.render(templateFile);

    console.log({ template });

    return template;
  } catch (err) {
    return err;
  }
};
