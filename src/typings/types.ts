export type SignupData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type SigninData = {
  login: string;
  password: string;
};

export type UserData = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
  status: string;
};

export type UserProfileData = Omit<UserData, 'id' | 'avatar'>;

export type UserChangePasswordData = {
  oldPassword: string;
  newPassword: string;
};

export type Indexed = {
  [key in string]: any;
};

export type ChatData = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      login: string;
      email: string;
      phone: string;
      avatar: string;
    };
    time: string;
    content: string;
  };
};

export type ChatFile = {
  id: number;
  user_id: number;
  chat_id: number;
  time: string;
  type: string;
  content: number;
  file: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
};
