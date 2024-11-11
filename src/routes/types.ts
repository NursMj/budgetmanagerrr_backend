/**
 * Dependence
 */
import type {Router} from "express";

/**
 * Other
 */
export interface RouteInfo {
    path: string;
    route: Router
}