import { url, extendedURL } from "./cheetah-api";
import HomeController from "./controllers/HomeController"
import UserController from "./controllers/UserController"
import TestController from "./controllers/TestController"
import AmirController from "./controllers/AmirController"
import MyController from "./controllers/MyController"

url("/", HomeController)
url("/user", UserController)
url('/test', TestController)
url("/amir", AmirController)
extendedURL("/user/{id}/i/{a}/p/{b}/q/{c}",MyController )

