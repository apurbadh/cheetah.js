import { Model, dbTypes, specialTypes } from "@apurbadh/cheetah/database";

class UserModel extends Model{

    setValues(){
        return {
            "id" : [dbTypes.Integer, specialTypes.primaryKey],
            "name": [dbTypes.String, specialTypes.Unique],
            "email": [dbTypes.String, specialTypes.Unique],
            "phone": [dbTypes.Integer, specialTypes.Unique]
        }
    }
}

const user = new UserModel("user")
user.migrate()
export default user;