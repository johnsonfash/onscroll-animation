const scrolAnimation = require("./animate");

describe("Check restructured parameters", () => {
  test("It should restructure object to valid animate object", () => {

    const animation = new scrolAnimation({
      ".test": {
        parameters: [
          "animation-duration: 2s"
        ],
        from: [
          "transform: translateX(-200px)"
        ],
        to: [
          "transform: translateX(0px)"
        ]
      }
    });

    expect(animation.handleStyles({
      parameters: [
        "animation-duration: 2s"
      ],
      from: [
        "transform: translateX(-200px)"
      ],
      to: [
        "transform: translateX(0px)"
      ]
    })).toStrictEqual([{ transform: "translateX(-200px)" },{ transform: "translateX(0px)" }]);

  });
});