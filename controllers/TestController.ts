import {Controller, sendFile, Request, Response} from "../cheetah-api"

export default class TestController extends Controller{

	get(req : Request, res : Response){
		sendFile(res, "test.json")
	}

	post(req : Request, res : Response){
        
	}

}