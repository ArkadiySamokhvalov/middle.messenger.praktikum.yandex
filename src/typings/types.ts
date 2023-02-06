export type T_SignupData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type T_SigninData = {
  login: string;
  password: string;
};

export type T_UserData = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export type T_UserDataWithRole = T_UserData & { role: string };

export type T_UserProfileData = Omit<T_UserData, 'id' | 'avatar'>;

export type T_UserChangePasswordData = {
  oldPassword: string;
  newPassword: string;
};

export type T_Indexed = {
  [key in string]: any;
};

export type T_ChatData = {
  id: number;
  title: string;
  avatar: string;
  created_by: number;
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

export type T_ChatFile = {
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

export type T_Validation = {
  pattern?: string | RegExp;
  message?: string;
  sameAs?: string;
};

export type T_MessageData = {
  chat_id: number;
  time: string;
  type: string;
  user_id: number;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
};

export type T_State = {
  user: {
    data: T_UserData;
    error: string;
    isLoading: boolean;
  };
  chats: {
    data: T_ChatData[];
    error: string;
    isLoading: boolean;
  };
  messages: Record<number, T_MessageData[]>;
  selectedChat?: {
    id: number;
    users: T_UserData & { role: string };
  };
  forms: Record<string, { errors: Set<string> }>;
};

export type T_PlainObject<value = any> = {
  [key in string]: value;
};

export type Props<P extends Record<string, any> = any> = {
  events?: Record<string, () => void> | Record<string, (e: Event) => void>;
} & P;
