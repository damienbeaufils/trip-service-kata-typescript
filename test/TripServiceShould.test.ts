import "jest";
import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
import TripService from "../src/trip/TripService";

describe("TripServiceShould", () => {

    it("should throw an UserNotLoggedInException if the user is not logged in", () => {
        // given
        const tripService = new TripService();
        tripService.getLoggedUser = () => null;
        const user = null;

        // when
        const result = () => tripService.getTripsByUser(user);

        // then
        expect(result).toThrow(new UserNotLoggedInException());
    });
});
