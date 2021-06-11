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
    [Route("api/Users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        UserRepository _repo;
        public UsersController(UserRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]

        public IActionResult GetAllUsers()
        {
            return Ok(_repo.GetAll());
        }

        [HttpGet("{firebaseid}")]
        public IActionResult GetById(string firebaseid)
        {
            var user = _repo.Get(firebaseid);

            if (user == null)
            {
                return NotFound("This user id does not exist");
            }

            return Ok(user);
        }

        [HttpPost]
        public IActionResult AddUser(User User)
        {
            _repo.Add(User);

            return Created($"api/Users/{User.Id}", User);
        }
        
    }
}
