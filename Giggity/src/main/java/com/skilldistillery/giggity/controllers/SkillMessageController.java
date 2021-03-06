package com.skilldistillery.giggity.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.skilldistillery.giggity.services.SkillMessageService;

@RestController
@RequestMapping(path = "api")
@CrossOrigin({ "*", "http://localhost:4350" })
public class SkillMessageController {
	@Autowired
	private SkillMessageService svc;
}
