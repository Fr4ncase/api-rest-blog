import type { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodRawShape } from 'zod';

type ValidationSource = 'body' | 'cookies' | 'params' | 'query';

const validationError =
  (schema: ZodObject<ZodRawShape>, source: ValidationSource = 'body') =>
  async (req: Request, res: Response, next: NextFunction) => {
    const dataToValidate = req[source];
    const result = await schema.safeParseAsync(dataToValidate);

    if (!result.success) {
      const fieldOrder = Object.keys(schema.shape);

      const sortedIssues = result.error.issues.sort((a, b) => {
        const fieldA = a.path[0] as string;
        const fieldB = b.path[0] as string;
        return fieldOrder.indexOf(fieldA) - fieldOrder.indexOf(fieldB);
      });

      const formattedErrors = sortedIssues.reduce(
        (acc, issue) => {
          const fieldName = issue.path[0] as string;
          acc[fieldName] = {
            value: dataToValidate?.[fieldName] || '',
            msg: issue.message,
            path: fieldName,
            location: source,
          };
          return acc;
        },
        {} as Record<string, any>,
      );

      res.status(400).json({
        code: 'ValidationError',
        errors: formattedErrors,
      });
      return;
    }
    next();
  };

export default validationError;
