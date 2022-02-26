export interface LoginData {
    email:   string;
    password: string;
}

export interface UserPartial {
	_id:        string;
	username:   string;
	email:      string;
	firstname:  string;
	company?:	string;
}

export interface LoginResponse {
	error: boolean;
	token: string;
	user:  UserPartial;
}





export interface User extends UserPartial {
	firstname:      string;
	lastname:       string;
	password:       string;
	referalcode:    string;
	amount:         number;
	startingAmount: number;
	rank:           string;
	parent:         string;
	right:          boolean;
}

