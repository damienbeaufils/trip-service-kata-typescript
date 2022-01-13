import "jest";
import TripRepository from "../../src/tripService/trip/TripRepository";
import TripService from "../../src/tripService/trip/TripService";
import User from "../../src/tripService/user/User";
import UserSession from "../../src/tripService/user/UserSession";

describe("TripService", () => {
    let tripService: TripService;
    let userSession: UserSession;
    let tripRepository: TripRepository;
    beforeEach(() => {
        userSession = {getLoggedUser: () => null} as UserSession;
        tripRepository = {findTripsByUser: () => []};
        tripService = new TripService(userSession, tripRepository);
    });

    it("should throw an error", () => {
        // when
        const result = () => tripService.getTripsByUser(null);

        // then
        expect(result).toThrow();
    });

    it("should return trips", () => {
        // given
        const user = new User();
        userSession.getLoggedUser = () => user;
        user.addFriend(user);

        // when
        const result = tripService.getTripsByUser(user);

        // then
        expect(result).not.toBeNull();
    });
});
