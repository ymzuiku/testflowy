import { createRouters, setNavigationAnimation } from "solid-router-stack";
import { pages } from "./_pages";

setNavigationAnimation("scale");

export const routers = createRouters(pages);
