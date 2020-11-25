export interface ILandZone {
    geoJSON: {
        type: string;
        properties: any;
        geometry: {
            type: string;
            coordinates: number[][][]
        }
    };
    communityInfo?: {
        community: string;
        community_email: string;
        community_phone: string;
        community_link: string;
    }
}