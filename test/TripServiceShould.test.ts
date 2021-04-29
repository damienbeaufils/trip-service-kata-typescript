import "jest";
import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
import TripService from "../src/trip/TripService";
import UserSession from "../src/user/UserSession";
jest.mock("../src/user/UserSession");

describe("TripServiceShould", () => {

    beforeEach(() => {
        (UserSession as any as jest.Mock).mockClear();
    });

    it("should throw an UserNotLoggedInException if the user is not logged in", () => {
        // given
        const tripService = new TripService();
        const user = null;
        UserSession.getLoggedUser = jest.fn(() => null);

        // when
        const result = () => tripService.getTripsByUser(user);

        // then
        expect(result).toThrow(new UserNotLoggedInException());
    });
});
