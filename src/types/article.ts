export interface Iarticle {
  author: {
    username: string;
    image: string;
  };
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: string;
}

export interface IerrorResponse {
  status: number;
  data: {
    errors: {
      username?: string;
      email?: string;
    };
  };
}

export interface IuserRegisterResponse {
  user: {
    username: string;
    email: string;
    password: string;
  };
}

export interface IuserRegisterArg {
  user: {
    username: string;
    email: string;
    password: string;
  };
}
