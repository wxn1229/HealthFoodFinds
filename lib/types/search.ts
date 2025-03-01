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
