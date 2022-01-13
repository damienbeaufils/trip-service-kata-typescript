import CollaboratorCallException from "../exception/CollaboratorCallException";
import User from "./User";

export default class UserSession {
    public getLoggedUser(): User {
        throw new CollaboratorCallException(
            "UserSession.getLoggedUser() should not be called in an unit test",
        );
    }
}
