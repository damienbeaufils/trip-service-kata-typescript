import "jest";
import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
jest.mock("../src/user/UserSession")
import UserSession from "../src/user/UserSession";
import TripService from "../src/trip/TripService";

const UserSession: UserSession = jest.createMockFromModule("../src/user/UserSession");

describe("TripServiceShould", () => {

    it('should throw an UserNotLoggedInException if the user is not logged in', () => {
        // given
        const tripService = new TripService();
        const user = null;
        UserSession.getLoggedUser = jest.fn(() => null)

        // when
        const result = () => tripService.getTripsByUser(user);

        // then
        expect(result).toThrow(new UserNotLoggedInException());
    });
});
