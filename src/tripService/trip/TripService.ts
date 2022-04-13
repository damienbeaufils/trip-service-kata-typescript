import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import User from "../user/User";
import UserSession from "../user/UserSession";
import Trip from "./Trip";
import TripRepository from "./TripRepository";

export default class TripService {

    constructor(private readonly userSession: UserSession, private readonly tripRepository: TripRepository) {
    }

    /**
     * find trips of given user
     * @param u the user
     * @return trips found
     * @throws UserNotLoggedInException
     */
    public getTripsByUser(u: User): Trip[] {
        let trips = [];
        const logged: any = this.userSession.getLoggedUser();
        let f: boolean = false;

        if (logged != null) {
            for (const u1 of u.getFriends()) {
                if (u1 === logged) {
                    f = true;
                    break;
                }
            }

            if (f) {
                // trips = this.tripRepository.findTripsByUser(u);
            }

            return trips;
        } else {
            throw new GeolocationPositionError();
        }
    }
}
