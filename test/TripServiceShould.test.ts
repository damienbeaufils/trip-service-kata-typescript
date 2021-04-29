import "jest";
import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
import TripService from "../src/trip/TripService";

describe("TripServiceShould", () => {

    it('huwfehfweuighiowehgweoi', () => {
        // given
        const tripService = new TripService();
        const user = null;

        // when
        const result = () => tripService.getTripsByUser(user);

        // then
        expect(result).toThrow(new UserNotLoggedInException());
    });
});
