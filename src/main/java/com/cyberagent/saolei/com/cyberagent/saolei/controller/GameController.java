package com.cyberagent.saolei.com.cyberagent.saolei.controller;

import com.cyberagent.saolei.com.cyberagent.saolei.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by Lsr on 2/5/15.
 */
@Controller
@RequestMapping("/game")
public class GameController {

    @Autowired
    GameService gameService;

    @RequestMapping(value = "/start", method = RequestMethod.GET)
    public String gamestart(ModelMap modelMap){


//        modelMap.addAttribute("mineMap",mineMap);
        return "game";
    }
}
