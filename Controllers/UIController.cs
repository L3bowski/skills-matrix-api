﻿using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace SkillsMatrixApi.Controllers
{
    [Route("~/", Name = "default")]
    public class UIController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            var indexFilePath = "wwwroot/index.html";
            if (System.IO.File.Exists(indexFilePath)) {
                return Content(System.IO.File.ReadAllText(indexFilePath), "text/html");
            }
            else {
                return Content("If you want to serve a webpage for this API from this URL place an Index.html file plus all your static files in the application wwwroot folder");
            }
        }
    }
}
