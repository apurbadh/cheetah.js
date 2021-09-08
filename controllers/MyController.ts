import {Controller, Request, Response} from "../cheetah-api"
import {user} from "../models/UserModel"
import { dbOperators } from "../cheetah-api/database"

export default class MyController extends Controller{

    async get(req : Request, res : Response){
        user.update({name:dbOperators.EQUAL + "apurba"}, {name : "aashutosh"})
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
