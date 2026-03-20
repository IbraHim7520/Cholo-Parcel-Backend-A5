import { ComphanyType } from "../../../generated/prisma/enums";

export interface ICreateMarchent {
    ComphanyName: string;
    ComphanyAddress: string;
    ComphanyPhone: string;
    ComphanyEmail: string;
    ComphanyLogo: string;
    ComphanyWebsite: string;
    ComphanyDescription: string;
    ComphanyType: ComphanyType;
    ownerId:string
}