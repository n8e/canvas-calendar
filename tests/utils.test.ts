import { convertToHoursMinutes } from "../utils";

test("returns 00:00 for 0 minutes", () => {
  expect(convertToHoursMinutes(0)).toBe("00:00");
});
