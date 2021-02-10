import { Request, Response } from 'express';
import { Container } from 'typedi';

export function registerController(controllerClass: any, action: string) {
  return (req: Request, res: Response) => {
    const controller = Container.get(controllerClass);
    (controller as any)[action](req, res);
  };
}
