export default class Color {
  static readonly colorsHexList = [
    "#9032D1", // Dark Orchid
    "#1299E2", // Rich Electric Blue
    "#97D151", // Kiwi
    "#FFEB48", // Lemon Yellow
    "#FF9230", // Deep Saffron
    "#F93644", // Red Salsa
  ];

  constructor(private readonly _colorHex = Color.getRandomHexColor()) {}

  static getRandomHexColor(): typeof Color.colorsHexList[number] {
    return Color.colorsHexList[
      Math.floor(Math.random() * Color.colorsHexList.length)
    ];
  }

  public get colorHex(): typeof Color.colorsHexList[number] {
    return this._colorHex;
  }
}
