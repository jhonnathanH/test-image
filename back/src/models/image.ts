import { prop, getModelForClass } from "@typegoose/typegoose";

export class Image {
    @prop({ default: 1 })
    public active?: number;

    @prop({ default: Date.now })
    public createdAt?: Date;

    @prop()
    public url?: string;

    @prop()
    public data?: any;
}

export const ImageModel = getModelForClass(Image);