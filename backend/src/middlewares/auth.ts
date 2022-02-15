import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const isAuth = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.get("Authorization");
	if (!authHeader) {
		req.isAuth = false;
		return next();
	}

	const token = authHeader;
	if (!token || token === "") {
		req.isAuth = false;
		return next();
	}

	let decodedToken;
	try {
		decodedToken = jwt.verify(token, process.env.SECRET_KEY);
	} catch (error) {
		req.isAuth = false;
		return next();
	}

	if (!decodedToken) {
		req.isAuth = false;
		return next();
	}

	//Success
	req.isAuth = true;
	req.userId = decodedToken.userId;
	next();
};

export default isAuth;
