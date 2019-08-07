export class ShippingDetails {
    name: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    imageUrl: string;

    public constructor(init?: Partial<ShippingDetails>) {
        Object.assign(this, init);
    }
}
