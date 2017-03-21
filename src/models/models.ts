export class Activity {
    Id: number;
    Name: string;
    Introduction: string;
    Impression: string;
    ImagePath: string;
    Score: number;
    Date:string;
    jions: Jion[];
}

export class Jion {
    Id: string;
    Class: number;
    Grade: string;
    Status: string;
    Name: string;
}
