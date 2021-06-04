using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SeekingClarity.DataAccess;
using SeekingClarity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SeekingClarity.Controllers
{
    [Route("api/Reviews")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        ReviewRepository _repo;
        public ReviewsController(ReviewRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]

        public IActionResult GetAll()
        {
            return Ok(_repo.GetAll());
        }

    }
}
