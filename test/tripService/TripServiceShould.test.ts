import "jest";
import UserNotLoggedInException from "../../src/tripService/exception/UserNotLoggedInException";
import TripService from "../../src/tripService/trip/TripService";
import User from "../../src/tripService/user/User";

describe("TripServiceShould", () => {
    let tripService;
    beforeEach(() => {
         tripService = new TripService();
    });

    it("should throw an UserNotLoggedInException if the user is not logged in", () => {
        // given
        tripService.getLoggedUser = () => null;
        const user = null;

        // when
        const result = () => tripService.getTripsByUser(user);

        // then
        expect(result).toThrow(new UserNotLoggedInException());
    });

    it("should return no trips when user is logged in and given user has no friend", () => {
        // given
        tripService.getLoggedUser = () => new User();
        const user = new User();

        // when
        const result = tripService.getTripsByUser(user);

        // then
        expect(result).toHaveLength(0);
    });
});
