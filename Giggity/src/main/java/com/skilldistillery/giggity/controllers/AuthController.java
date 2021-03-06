package com.skilldistillery.giggity.controllers;

import java.security.Principal;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.giggity.entities.User;
import com.skilldistillery.giggity.services.AuthService;
import com.skilldistillery.giggity.services.UserService;

@RestController
@CrossOrigin({ "*", "http://localhost:4350" })
public class AuthController {

	@Autowired
	private AuthService authService;
	
	@Autowired
	private UserService svc;

	@PostMapping("/register")
	public User register(@RequestBody User user, HttpServletResponse res) {

		if (!authService.isUserUnique(user.getUsername(), user.getEmail())) {
			user = null;

		}
		System.err.println(user);

		if (user == null) {
			res.setStatus(400);
			return null;
		}

		user = authService.register(user);
		return user;
	}

	@GetMapping("/authenticate")
	public Principal authenticate(Principal principal) {
		
		User loggedInUser = svc.getUserByUsername(principal.getName());
		if(!loggedInUser.getEnabled()) {
			principal = null;
		}
		
		return principal;
	}

}
