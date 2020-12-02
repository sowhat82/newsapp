
export interface apiForm{
    apiKey: string;
}

export interface country{
    shortName: string;
    longName: string;
    flagImageUrl: string;
}

export interface article{
    country: string
    articleDetails: {}
    timeStamp: Date
    saved: boolean
}
    