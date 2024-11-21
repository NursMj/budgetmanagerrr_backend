/**
 * Dependence
 */
import {Router} from "express";

import userRouter from './user'
import authRouter from "./auth";
import userCategory from "./category";
import userOperation from "./operation";

/**
 * Types
 */
import type {RouteInfo} from "./types.ts";

const defaultRoutes: RouteInfo[] = [
    {
        path: '/auth',
        route: authRouter
    },
    {
        path: '/user',
        route: userRouter
    },
    {
        path: '/category',
        route: userCategory
    },
    {
        path: '/operation',
        route: userOperation
    },
]

const router = Router()

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router
