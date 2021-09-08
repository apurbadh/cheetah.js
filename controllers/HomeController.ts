import {Controller, Request, Response, render} from "@apurbadh/cheetah"

export default class HomeController extends Controller{


    get(req : Request, res : Response){
        render(res, "index.ejs")
    }

    post(req : Request, res : Response){
        
    }

    put(req : Request, res : Response){

    }

    delete(req : Request, res : Response){

    }

    patch(req : Request, res : Response){

    }

}
