export type registerRequest = {
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  age?: number;
  user_type?: Role;
  gender?: Gender;
  password: string;
  is_profile_complete?: boolean;
};

enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  ORGANISER = "ORGANISER",
}

enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}
