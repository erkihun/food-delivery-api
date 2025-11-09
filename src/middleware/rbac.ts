import { Request, Response, NextFunction } from 'express';

export function requireRole(...roles: Array<'ADMIN'|'CUSTOMER'>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role;
    if (!role || !roles.includes(role)) return res.status(403).json({ message: 'Forbidden' });
    next();
  };
}

export function allowSelfOrAdmin(getUserId: (req: Request)=>number) {
  return (req: Request, res: Response, next: NextFunction) => {
    const me = req.user;
    const targetId = getUserId(req);
    if (me?.role === 'ADMIN' || me?.id === targetId) return next();
    return res.status(403).json({ message: 'Forbidden' });
  };
}
