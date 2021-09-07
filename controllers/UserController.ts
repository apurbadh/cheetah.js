import {Controller, Request, Response, sendJSON} from "../cheetah-api"

export default class UserController extends Controller{

	get(req : Request, res : Response){
		let json = {
			"name" : "apurba"
		}
		sendJSON(res, json)
	}

	post(req : Request, res : Response){
		let myjson = {
			name : "apurba"
		}
		let datas = this.requestData
		console.log(datas)
	}


	put(req : Request, res : Response){

	}

	delete(req : Request, res : Response){

	}

	patch(req : Request, res : Response){

	}
}