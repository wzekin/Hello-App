export class Activity {
  Id: number;
  Name: string;
  Introduction: string;
  Impression: string;
  ImagePath: string[] = [];
  Score: number;
  Date: string;
  jions: Jion[];
}

export class Jion {
  Id: string;
  Class: number;
  Grade: string;
  Status: string;
  Name: string;
  WhoBuild:string;
  Date:string
}

export class Score {
  Name: string;
  Grade: string;
  Class: string;
  Score: string;
  Num: string;
}

export class Student {
  Id: string
  Name: string
  Gender: string
  Grade: string
  Class: string

}
