export class ProductObject {
    constructor(name, price, availableQuantity, width, height, isInFrame, isBestSeller, origin, colourString, mainType, subType, url) {
        this.name = name;
        this.price = price;
        this.availableQuantity = availableQuantity;
        this.width = width;
        this.height = height;
        this.isInFrame = isInFrame;
        this.isBestSeller = isBestSeller;
        this.origin = origin;
        this.colourString = colourString;
        this.mainType = mainType;
        this.subType = subType;
        this.url = url;
    }
}
