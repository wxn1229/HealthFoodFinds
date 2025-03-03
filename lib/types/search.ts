type Applicant = {
  Id: string;
  Name: string;
};

type Certification = {
  Id: string;
  Name: string;
};

type Ingredient = {
  Id: string;
  Name: string;
};

type Benefit = {
  Id: string;
  Name: string;
};

export type SelectData = {
  applicant: Applicant[];
  certification: Certification[];
  ingredient: Ingredient[];
  benefit: Benefit[];
};

export interface HealthFoodInfo {
  Id: string;
  Name: string;
  AcessDate: string;
  ImgUrl: string | null;
  Claims: string;
  CurPoint: number;
  CurCommentNum: number;
  Applicant: {
    Name: string;
  };
  CF: {
    Id: string;
    Name: string;
  };
  HF_and_BF: Array<{
    BF: {
      Id: string;
      Name: string;
    };
  }>;
  HF_and_Ingredient: Array<{
    IG: {
      Id: string;
      Name: string;
      EnglishName: string;
    };
  }>;
}

export interface HealthFoodDetail extends HealthFoodInfo {
  CFId: string;
  Warning: string;
  Precautions: string;
  Website: string;
  ApplicantId: string;
}
