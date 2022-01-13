import CollaboratorCallException from "../exception/CollaboratorCallException";
import User from "../user/User";
import Trip from "./Trip";

export default class TripRepository {
    public findTripsByUser(user: User): Trip[] {
        throw new CollaboratorCallException(
            "TripDAO should not be invoked on an unit test.");
    }
}
